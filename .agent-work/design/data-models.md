# データモデル設計

DD Navigator のデータベーススキーマ設計を定義します。Supabase PostgreSQL を使用し、チーム単位のマルチテナント構造と Row Level Security (RLS) による厳格なアクセス制御を実装します。

## 基本方針

### 正規化レベル

- 第3正規形を基本とする
- パフォーマンスが必要な箇所（ダッシュボード集計等）は計算済みカラムを許容
- JSON型は複雑な階層構造を持つメタデータにのみ使用（`document.metadata`, `qa_item.answer_data`）

### 命名規則

- テーブル名: 複数形、スネークケース（例: `deals`, `qa_items`）
- カラム名: スネークケース（例: `created_at`, `team_id`）
- 外部キー: `<参照先テーブル単数形>_id`（例: `deal_id`, `team_id`）
- Boolean: `is_`, `has_`, `can_` プレフィックス（例: `is_deleted`, `has_duplicate`）

### タイムスタンプ

全テーブルに以下を含める:

- `created_at TIMESTAMPTZ NOT NULL DEFAULT now()`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`

`updated_at` は trigger で自動更新:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルに適用:
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 論理削除

物理削除は行わず、`deleted_at TIMESTAMPTZ` で論理削除を実装:

- `deleted_at IS NULL` で有効なレコードのみ表示
- RLS ポリシーで論理削除されたレコードを除外

## ER 図（テキスト表現）

```
teams
  ├─ 1:N → team_members (チームメンバー)
  ├─ 1:N → deals (M&A案件)
  ├─ 1:N → longlist_companies (ロングリスト企業)
  └─ 1:N → checklist_templates (チェックリストテンプレート)

deals
  ├─ N:1 → teams
  ├─ 1:N → deal_phases (フェーズ履歴)
  ├─ 1:N → qa_items (Q&A項目)
  ├─ 1:N → documents (資料)
  ├─ 1:N → findings (発見事項)
  └─ 1:N → deal_checklists (案件別チェックリスト)

qa_items
  ├─ N:1 → deals
  └─ N:1 → team_members (作成者)

documents
  ├─ N:1 → deals
  ├─ N:1 → document_categories
  └─ N:1 → team_members (アップロード者)

checklist_templates
  ├─ N:1 → teams
  └─ 1:N → checklist_items (テンプレート項目)

deal_checklists
  ├─ N:1 → deals
  ├─ N:1 → checklist_templates
  └─ N:1 → team_members (完了者)
```

## テーブル定義

### teams（チーム）

M&A チームの組織単位。全データはこのテーブルに紐づく。

```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'standard', 'premium')),
  storage_used_bytes BIGINT NOT NULL DEFAULT 0,
  storage_limit_bytes BIGINT NOT NULL DEFAULT 5368709120, -- 5GB
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_teams_deleted_at ON teams (deleted_at) WHERE deleted_at IS NULL;
```

### team_members（チームメンバー）

ユーザーとチームの中間テーブル。ロールベースのアクセス制御。

```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  UNIQUE (team_id, user_id)
);

CREATE INDEX idx_team_members_team_id ON team_members (team_id);
CREATE INDEX idx_team_members_user_id ON team_members (user_id);
CREATE INDEX idx_team_members_deleted_at ON team_members (deleted_at) WHERE deleted_at IS NULL;
```

**ロール定義:**

- `owner`: チーム削除、メンバー管理、全権限
- `admin`: メンバー招待、案件作成・削除、設定変更
- `member`: 案件作成、Q&A作成、資料アップロード
- `viewer`: 閲覧のみ（編集不可）

### longlist_companies（ロングリスト企業）

M&A ターゲット候補企業のマスタデータ。

```sql
CREATE TABLE longlist_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  industry TEXT,
  region TEXT,
  revenue_jpy BIGINT,
  employee_count INTEGER,
  website_url TEXT,
  fit_score INTEGER CHECK (fit_score >= 1 AND fit_score <= 5),
  notes TEXT,
  source TEXT, -- 'manual', 'import', 'api'
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_longlist_companies_team_id ON longlist_companies (team_id);
CREATE INDEX idx_longlist_companies_industry ON longlist_companies (industry);
CREATE INDEX idx_longlist_companies_region ON longlist_companies (region);
CREATE INDEX idx_longlist_companies_fit_score ON longlist_companies (fit_score);
CREATE INDEX idx_longlist_companies_deleted_at ON longlist_companies (deleted_at) WHERE deleted_at IS NULL;
```

### deals（M&A案件）

進行中のデューデリジェンス案件。

```sql
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_company TEXT NOT NULL,
  longlist_company_id UUID REFERENCES longlist_companies(id) ON DELETE SET NULL,
  current_phase TEXT NOT NULL DEFAULT 'sourcing' CHECK (current_phase IN (
    'sourcing', 'nda', 'im_review', 'loi', 'dd', 'negotiation', 'closing', 'completed', 'abandoned'
  )),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'abandoned')),
  expected_closing_date DATE,
  actual_closing_date DATE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_deals_team_id ON deals (team_id);
CREATE INDEX idx_deals_current_phase ON deals (current_phase);
CREATE INDEX idx_deals_status ON deals (status);
CREATE INDEX idx_deals_expected_closing_date ON deals (expected_closing_date);
CREATE INDEX idx_deals_deleted_at ON deals (deleted_at) WHERE deleted_at IS NULL;
```

**フェーズ定義:**

- `sourcing`: ソーシング（案件探索）
- `nda`: NDA締結
- `im_review`: IM（Information Memorandum）レビュー
- `loi`: LOI（Letter of Intent）提出
- `dd`: デューデリジェンス実施中
- `negotiation`: 最終交渉
- `closing`: クロージング準備
- `completed`: 完了
- `abandoned`: 中止

### deal_phases（フェーズ履歴）

案件のフェーズ遷移履歴。監査証跡として保持。

```sql
CREATE TABLE deal_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  phase TEXT NOT NULL CHECK (phase IN (
    'sourcing', 'nda', 'im_review', 'loi', 'dd', 'negotiation', 'closing', 'completed', 'abandoned'
  )),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  notes TEXT,
  changed_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_deal_phases_deal_id ON deal_phases (deal_id);
CREATE INDEX idx_deal_phases_started_at ON deal_phases (started_at DESC);
```

### qa_items（Q&A項目）

デューデリジェンスの質問・回答管理。

```sql
CREATE TABLE qa_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'finance', 'legal', 'hr', 'it', 'business', 'other'
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'received', 'clarification_needed')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  due_date DATE,
  has_duplicate BOOLEAN NOT NULL DEFAULT false,
  duplicate_of UUID REFERENCES qa_items(id) ON DELETE SET NULL,
  answer_data JSONB, -- 構造化された回答データ（添付ファイル、コメント等）
  created_by UUID NOT NULL REFERENCES auth.users(id),
  answered_by UUID REFERENCES auth.users(id),
  answered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_qa_items_deal_id ON qa_items (deal_id);
CREATE INDEX idx_qa_items_category ON qa_items (category);
CREATE INDEX idx_qa_items_status ON qa_items (status);
CREATE INDEX idx_qa_items_priority ON qa_items (priority);
CREATE INDEX idx_qa_items_due_date ON qa_items (due_date);
CREATE INDEX idx_qa_items_deleted_at ON qa_items (deleted_at) WHERE deleted_at IS NULL;

-- 全文検索用の GIN インデックス（PostgreSQL の pg_trgm 拡張を使用）
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_qa_items_question_trgm ON qa_items USING gin (question gin_trgm_ops);
```

**重複検出クエリ例（トライグラム類似度）:**

```sql
SELECT
  id,
  question,
  similarity(question, '検索対象の質問文') AS similarity_score
FROM qa_items
WHERE
  deal_id = :deal_id
  AND deleted_at IS NULL
  AND similarity(question, '検索対象の質問文') > 0.3
ORDER BY similarity_score DESC
LIMIT 10;
```

### documents（資料管理）

アップロードされた PDF・Excel 等のファイルメタデータ。実ファイルは Supabase Storage に保存。

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  category_id UUID REFERENCES document_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_extension TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE, -- Supabase Storage のパス
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  metadata JSONB, -- ページ数、作成日時、タグ等
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_documents_deal_id ON documents (deal_id);
CREATE INDEX idx_documents_category_id ON documents (category_id);
CREATE INDEX idx_documents_uploaded_by ON documents (uploaded_by);
CREATE INDEX idx_documents_created_at ON documents (created_at DESC);
CREATE INDEX idx_documents_deleted_at ON documents (deleted_at) WHERE deleted_at IS NULL;
```

### document_categories（資料カテゴリ）

資料の分類マスタ。

```sql
CREATE TABLE document_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ,
  UNIQUE (team_id, name)
);

CREATE INDEX idx_document_categories_team_id ON document_categories (team_id);
CREATE INDEX idx_document_categories_deleted_at ON document_categories (deleted_at) WHERE deleted_at IS NULL;
```

**デフォルトカテゴリ例:**

- 財務諸表
- 契約書
- 登記簿謄本
- 組織図
- 稟議書
- その他

### findings（発見事項）

デューデリジェンス中に発見したリスク・機会・課題。

```sql
CREATE TABLE findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- 'risk', 'opportunity', 'issue', 'information'
  severity TEXT CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'accepted')),
  related_qa_id UUID REFERENCES qa_items(id) ON DELETE SET NULL,
  related_document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_findings_deal_id ON findings (deal_id);
CREATE INDEX idx_findings_category ON findings (category);
CREATE INDEX idx_findings_severity ON findings (severity);
CREATE INDEX idx_findings_status ON findings (status);
CREATE INDEX idx_findings_deleted_at ON findings (deleted_at) WHERE deleted_at IS NULL;
```

### checklist_templates（チェックリストテンプレート）

チームごとのデューデリジェンスチェックリストテンプレート。

```sql
CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'bdd', 'fdd', 'ldd', 'itdd', 'hrdd', 'general'
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_checklist_templates_team_id ON checklist_templates (team_id);
CREATE INDEX idx_checklist_templates_category ON checklist_templates (category);
CREATE INDEX idx_checklist_templates_is_default ON checklist_templates (is_default) WHERE is_default = true;
CREATE INDEX idx_checklist_templates_deleted_at ON checklist_templates (deleted_at) WHERE deleted_at IS NULL;
```

### checklist_items（チェックリスト項目）

テンプレートの個別チェック項目。

```sql
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES checklist_templates(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_checklist_items_template_id ON checklist_items (template_id);
CREATE INDEX idx_checklist_items_sort_order ON checklist_items (sort_order);
```

### deal_checklists（案件別チェックリスト）

案件に適用されたチェックリストの進捗管理。

```sql
CREATE TABLE deal_checklists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES checklist_templates(id) ON DELETE RESTRICT,
  checklist_item_id UUID NOT NULL REFERENCES checklist_items(id) ON DELETE RESTRICT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_by UUID REFERENCES auth.users(id),
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (deal_id, checklist_item_id)
);

CREATE INDEX idx_deal_checklists_deal_id ON deal_checklists (deal_id);
CREATE INDEX idx_deal_checklists_is_completed ON deal_checklists (is_completed);
```

## Row Level Security (RLS) ポリシー

Supabase の RLS を使用してチーム単位のデータ分離を実現します。

### 基本方針

- 全テーブルで RLS を有効化（`ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;`）
- 認証済みユーザー（`auth.uid()`）のみがアクセス可能
- ユーザーが所属するチーム（`team_members` 経由）のデータのみ閲覧・編集可能
- `deleted_at IS NULL` のレコードのみ表示

### ヘルパー関数

```sql
-- ユーザーが指定チームに所属しているか確認
CREATE OR REPLACE FUNCTION user_is_member_of_team(target_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM team_members
    WHERE team_id = target_team_id
      AND user_id = auth.uid()
      AND deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ユーザーのロールを取得
CREATE OR REPLACE FUNCTION user_role_in_team(target_team_id UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT role FROM team_members
    WHERE team_id = target_team_id
      AND user_id = auth.uid()
      AND deleted_at IS NULL
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ユーザーが編集権限を持つか（owner, admin, member）
CREATE OR REPLACE FUNCTION user_can_edit_in_team(target_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN user_role_in_team(target_team_id) IN ('owner', 'admin', 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### ポリシー例（teams テーブル）

```sql
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- 自分が所属するチームのみ閲覧可能
CREATE POLICY select_own_teams ON teams
  FOR SELECT
  USING (
    user_is_member_of_team(id)
    AND deleted_at IS NULL
  );

-- owner のみチーム情報を更新可能
CREATE POLICY update_own_teams ON teams
  FOR UPDATE
  USING (
    user_role_in_team(id) = 'owner'
    AND deleted_at IS NULL
  );
```

### ポリシー例（deals テーブル）

```sql
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- 自分のチームの案件のみ閲覧可能
CREATE POLICY select_team_deals ON deals
  FOR SELECT
  USING (
    user_is_member_of_team(team_id)
    AND deleted_at IS NULL
  );

-- member 以上が案件を作成可能
CREATE POLICY insert_team_deals ON deals
  FOR INSERT
  WITH CHECK (
    user_can_edit_in_team(team_id)
  );

-- member 以上が案件を更新可能
CREATE POLICY update_team_deals ON deals
  FOR UPDATE
  USING (
    user_can_edit_in_team(team_id)
    AND deleted_at IS NULL
  );

-- admin 以上が論理削除可能（物理削除は不可）
CREATE POLICY delete_team_deals ON deals
  FOR UPDATE
  USING (
    user_role_in_team(team_id) IN ('owner', 'admin')
    AND deleted_at IS NULL
  );
```

### ポリシー例（qa_items テーブル）

```sql
ALTER TABLE qa_items ENABLE ROW LEVEL SECURITY;

-- 自分のチームの案件のQ&Aのみ閲覧可能
CREATE POLICY select_team_qa_items ON qa_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = qa_items.deal_id
        AND user_is_member_of_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
    AND qa_items.deleted_at IS NULL
  );

-- member 以上がQ&Aを作成可能
CREATE POLICY insert_team_qa_items ON qa_items
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = qa_items.deal_id
        AND user_can_edit_in_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
  );

-- member 以上がQ&Aを更新可能
CREATE POLICY update_team_qa_items ON qa_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = qa_items.deal_id
        AND user_can_edit_in_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
    AND qa_items.deleted_at IS NULL
  );
```

### ポリシー例（documents テーブル）

```sql
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- 自分のチームの案件の資料のみ閲覧可能
CREATE POLICY select_team_documents ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = documents.deal_id
        AND user_is_member_of_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
    AND documents.deleted_at IS NULL
  );

-- member 以上が資料をアップロード可能
CREATE POLICY insert_team_documents ON documents
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = documents.deal_id
        AND user_can_edit_in_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
  );
```

## インデックス戦略

### パフォーマンス重視のインデックス

**1. 外部キー（JOIN 高速化）:**

全ての外部キーカラムにインデックスを作成済み（上記 DDL に含まれる）。

**2. 検索条件（WHERE 句）:**

- `deals.current_phase`, `deals.status` — 案件一覧フィルタ
- `qa_items.status`, `qa_items.priority`, `qa_items.category` — Q&A 絞り込み
- `documents.category_id` — 資料カテゴリフィルタ
- `findings.severity`, `findings.status` — 発見事項の緊急度フィルタ

**3. ソート（ORDER BY）:**

- `deals.expected_closing_date` — クロージング予定日順
- `qa_items.due_date` — Q&A 期限順
- `documents.created_at DESC` — 最新資料順
- `deal_phases.started_at DESC` — フェーズ履歴の時系列

**4. 全文検索（Q&A 重複検出）:**

- `qa_items.question` に GIN インデックス（`pg_trgm` 拡張）
- トライグラム類似度 0.3 以上で重複候補を検出

**5. 論理削除フィルタ:**

全テーブルの `deleted_at` に partial index:

```sql
CREATE INDEX idx_<table>_deleted_at ON <table> (deleted_at) WHERE deleted_at IS NULL;
```

これにより `WHERE deleted_at IS NULL` のクエリが高速化される。

### 複合インデックス（必要に応じて追加）

```sql
-- 案件のフェーズ別集計（ダッシュボード）
CREATE INDEX idx_deals_team_phase_status ON deals (team_id, current_phase, status)
  WHERE deleted_at IS NULL;

-- Q&A のステータス別集計
CREATE INDEX idx_qa_items_deal_status ON qa_items (deal_id, status)
  WHERE deleted_at IS NULL;

-- 資料のカテゴリ別集計
CREATE INDEX idx_documents_deal_category ON documents (deal_id, category_id)
  WHERE deleted_at IS NULL;
```

## サンプルクエリ

### ダッシュボード: 案件フェーズ別集計

```sql
SELECT
  current_phase,
  COUNT(*) AS deal_count
FROM deals
WHERE
  team_id = :team_id
  AND status = 'active'
  AND deleted_at IS NULL
GROUP BY current_phase
ORDER BY
  CASE current_phase
    WHEN 'sourcing' THEN 1
    WHEN 'nda' THEN 2
    WHEN 'im_review' THEN 3
    WHEN 'loi' THEN 4
    WHEN 'dd' THEN 5
    WHEN 'negotiation' THEN 6
    WHEN 'closing' THEN 7
  END;
```

### Q&A 重複検出（トライグラム類似度）

```sql
SELECT
  id,
  question,
  status,
  similarity(question, :new_question) AS similarity_score
FROM qa_items
WHERE
  deal_id = :deal_id
  AND deleted_at IS NULL
  AND similarity(question, :new_question) > 0.3
ORDER BY similarity_score DESC
LIMIT 10;
```

### 資料アップロード時のストレージ容量チェック

```sql
SELECT
  storage_used_bytes,
  storage_limit_bytes,
  (storage_limit_bytes - storage_used_bytes) AS available_bytes
FROM teams
WHERE
  id = :team_id
  AND deleted_at IS NULL;
```

### フェーズ滞在日数の算出

```sql
SELECT
  d.id,
  d.name,
  d.current_phase,
  dp.started_at AS phase_started_at,
  EXTRACT(DAY FROM now() - dp.started_at) AS days_in_phase
FROM deals d
LEFT JOIN LATERAL (
  SELECT started_at
  FROM deal_phases
  WHERE deal_id = d.id
    AND phase = d.current_phase
    AND ended_at IS NULL
  ORDER BY started_at DESC
  LIMIT 1
) dp ON true
WHERE
  d.team_id = :team_id
  AND d.status = 'active'
  AND d.deleted_at IS NULL
ORDER BY days_in_phase DESC;
```

## マイグレーション戦略

### 初期セットアップ

1. Supabase プロジェクト作成
2. 拡張機能を有効化:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;  -- 全文検索用
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- UUID 生成（オプション）
```

3. テーブル作成（上記 DDL を実行）
4. RLS ポリシー作成
5. Trigger 作成（`updated_at` 自動更新）
6. インデックス作成
7. デフォルトデータ投入:

```sql
-- デフォルトの資料カテゴリ（各チームに対して）
INSERT INTO document_categories (team_id, name, sort_order) VALUES
  (:team_id, '財務諸表', 1),
  (:team_id, '契約書', 2),
  (:team_id, '登記簿謄本', 3),
  (:team_id, '組織図', 4),
  (:team_id, '稟議書', 5),
  (:team_id, 'その他', 99);
```

### バージョン管理

- Supabase の Migration 機能を使用
- ファイル命名: `YYYYMMDDHHMMSS_<description>.sql`
- 例: `20260101000000_create_teams_table.sql`

### ロールバック

- `down.sql` でロールバック用 SQL を定義
- テーブル削除は `DROP TABLE IF EXISTS <table> CASCADE;`
- 本番環境では物理削除を避け、論理削除で対応

### データ移行（既存システムからの移行）

1. CSV エクスポート → `COPY` コマンドで一括投入
2. 外部キー制約は最後に追加（投入中はエラーを回避）
3. 投入後に `ANALYZE` で統計情報を更新

```sql
-- CSV から一括投入
COPY deals (id, team_id, name, target_company, current_phase, created_at)
FROM '/path/to/deals.csv'
WITH (FORMAT csv, HEADER true);

-- 統計情報更新
ANALYZE deals;
```

## スケーラビリティ考慮事項

### 想定データ量（チームあたり）

- 案件数: 最大 100 件
- Q&A 項目: 1,000 件/案件 → 合計 100,000 件
- 資料: 500 件/案件 → 合計 50,000 件
- ストレージ: 5GB/チーム

### パフォーマンス目標

- 案件一覧表示: <500ms
- Q&A 重複検出: <1s（全文検索）
- 資料アップロード: <3s（5MB ファイル）

### 最適化手法

**1. Connection Pooling:**

Supabase は Supavisor（PgBouncer ベース）で自動管理。Next.js は Serverless 環境で動作するため接続プールを意識する必要なし。

**2. Prepared Statements:**

Drizzle ORM または `@supabase/supabase-js` が自動的に Prepared Statements を使用。

**3. N+1 問題の回避:**

```typescript
// NG: N+1 クエリ
const deals = await supabase.from("deals").select("*");
for (const deal of deals.data) {
  const phases = await supabase.from("deal_phases").select("*").eq("deal_id", deal.id);
}

// OK: JOIN で一括取得
const deals = await supabase
  .from("deals")
  .select(`
    *,
    deal_phases (*)
  `);
```

**4. Materialized View（将来的な最適化）:**

ダッシュボードの集計が遅い場合、Materialized View を作成:

```sql
CREATE MATERIALIZED VIEW dashboard_stats AS
SELECT
  team_id,
  current_phase,
  COUNT(*) AS deal_count,
  SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_count
FROM deals
WHERE deleted_at IS NULL
GROUP BY team_id, current_phase;

CREATE INDEX idx_dashboard_stats_team_id ON dashboard_stats (team_id);

-- 定期的に更新（cron job）
REFRESH MATERIALIZED VIEW dashboard_stats;
```

## セキュリティチェックリスト

- [x] 全テーブルで RLS を有効化
- [x] 認証済みユーザーのみアクセス可能
- [x] チーム単位のデータ分離（`team_id` 経由）
- [x] ロールベースのアクセス制御（owner/admin/member/viewer）
- [x] 論理削除の実装（`deleted_at`）
- [x] 外部キーの CASCADE 設定（データ整合性）
- [x] Supabase Storage の RLS ポリシー（別途設定）
- [x] SQL インジェクション対策（Prepared Statements）
- [x] センシティブデータの暗号化（Supabase が自動で at-rest 暗号化）
