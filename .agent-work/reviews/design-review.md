# Design Review

**Status**: APPROVED

**Reviewed at**: 2026-03-30

**Reviewer**: Claude Code (Reviewer Agent)

## Good Points

### 全体的な設計品質

- **ドメイン理解の正確性**: M&A DD業務の9フェーズ、6つのDD領域（BDD/FDD/LDD/TDD/HRDD/ITDD）を正しく反映した設計
- **技術選定の妥当性**: Next.js 16 App Router + Supabase + Vercel の組み合わせは、要件（短期開発、スケーラビリティ、セキュリティ）に適合
- **型安全性の担保**: Zod スキーマによるランタイムバリデーションを全APIに実装する設計方針
- **セキュリティ設計**: RLS（Row Level Security）によるチーム単位のデータ分離が確実に実装されている

### Architecture

- **レイヤー設計の明確性**: UI / Business Logic / Data Access の3層分離が適切に定義されている
- **Server Components優先の方針**: Next.js App Router の特性を活かし、初回ロード高速化とSEO最適化を実現する設計
- **認証フローの詳細**: Magic Link認証のフロー、セッション管理、Middlewareによる認証チェックが具体的に記述されている
- **パフォーマンス最適化**: Dynamic Import、画像最適化、キャッシング戦略が明示されている
- **スケーラビリティ考慮**: 初期想定（50ユーザー、100案件/チーム）に対する水平・垂直スケーリング戦略が記載されている

### API Design

- **RESTful原則の遵守**: リソース指向URL、適切なHTTPメソッド・ステータスコードの使用
- **Zodスキーマの網羅性**: 全エンドポイントにリクエスト・レスポンススキーマが定義されている
- **エラーハンドリングの統一**: 標準エラーレスポンス形式（error.code, error.message, error.details）が一貫している
- **Server Actionsの活用**: フォーム送信・状態更新にServer Actionsを使用し、型安全性と開発効率を両立

### Data Model

- **正規化の適切性**: 第3正規形を基本とし、パフォーマンスが必要な箇所のみ非正規化を許容する方針
- **論理削除の実装**: `deleted_at`カラムによる論理削除で、監査証跡を保持しつつ物理削除を回避
- **インデックス戦略**: 外部キー、検索条件、ソート、全文検索（pg_trgm）の各用途に適切なインデックスを設計
- **RLSポリシーの詳細**: ヘルパー関数（`user_is_member_of_team`, `user_can_edit_in_team`）による再利用可能なポリシー設計
- **フェーズ履歴の監査証跡**: `deal_phases`テーブルでフェーズ遷移履歴を保持し、監査要件に対応

### File Structure

- **Feature-basedコロケーション**: 機能単位でディレクトリを切り、関連コンポーネントを近くに配置する設計
- **公開APIの明示**: `index.ts`で公開するコンポーネントを定義し、内部実装を隠蔽する設計
- **責務の分離**: `/actions`, `/api`, `/schemas`, `/services`の明確な役割分担
- **命名規則の一貫性**: PascalCase（コンポーネント）、camelCase（関数）、kebab-case（API）の使い分けが明確

## Issues

### 軽微な指摘のみ

以下は設計の品質を向上させるための軽微な指摘です。いずれも致命的な欠陥ではなく、実装時の注意点として扱えます。

### 1. API Contracts の一部不整合

#### 1.1 `nonname`表記の不統一

- **場所**: `api-contracts.md` L179 `listDealsQuerySchema`
- **問題**: `phase`のenum値に`"nonname"`があるが、正しくは`"sourcing"`または`"nonname"`のどちらかに統一すべき（requirements.mdでは「ノンネーム」が最初のフェーズ、data-models.mdでは`"sourcing"`）
- **修正案**: requirements.mdの9フェーズ定義と整合させ、`"sourcing"`を削除して`"nonname"`を使用するか、フェーズ名を明確に定義する

#### 1.2 DD領域のenum不一致

- **場所**: `api-contracts.md` L322 `listQAItemsQuerySchema`
- **問題**: `dd_area`に`"bdd", "fdd", "ldd", "tdd", "hrdd", "itdd"`の6つがあるが、data-models.mdのqa_itemsテーブルでは`category`が`"finance", "legal", "hr", "it", "business", "other"`
- **影響**: Q&A管理機能の実装時にカラム名とenum値の不一致が発生する
- **修正案**: data-models.mdの`qa_items.category`を`dd_area`にリネームし、enum値を統一する

### 2. Data Model の補完事項

#### 2.1 `longlist_companies`テーブルの外部キー制約

- **場所**: `data-models.md` L152 `created_by UUID NOT NULL REFERENCES auth.users(id)`
- **問題**: `created_by`が削除されたユーザーを参照する場合の挙動が不明確（`ON DELETE CASCADE`がない）
- **修正案**: `ON DELETE SET NULL`を追加し、ユーザー削除時に`created_by`をNULLにする

#### 2.2 RLSポリシーの`deleted_at`チェック

- **場所**: `data-models.md` L550-586 `qa_items`のポリシー例
- **問題**: `SELECT`ポリシーでは`deleted_at IS NULL`をチェックしているが、`UPDATE`ポリシーでも同様のチェックが必要
- **修正案**: 全ポリシーで`deleted_at IS NULL`を明示的にチェックする

### 3. Architecture の補完事項

#### 3.1 Q&A重複検出のPostgreSQLファンクション

- **場所**: `architecture.md` では言及されているが、data-models.mdに具体的なSQL定義がない
- **問題**: `supabase.rpc("find_similar_questions")`を呼び出すコード例があるが、このファンクションの実装が未定義
- **修正案**: data-models.mdに以下のファンクション定義を追加する必要がある

```sql
CREATE OR REPLACE FUNCTION find_similar_questions(
  p_deal_id UUID,
  p_question TEXT,
  p_threshold FLOAT
)
RETURNS TABLE (
  id UUID,
  question TEXT,
  similarity_score FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qa_items.id,
    qa_items.question,
    similarity(qa_items.question, p_question) AS similarity_score
  FROM qa_items
  WHERE qa_items.deal_id = p_deal_id
    AND qa_items.deleted_at IS NULL
    AND similarity(qa_items.question, p_question) > p_threshold
  ORDER BY similarity_score DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql;
```

#### 3.2 ストレージ容量更新のPostgreSQLファンクション

- **場所**: `file-structure.md` L906 `supabase.rpc("update_storage_usage")`
- **問題**: このファンクションの実装がdata-models.mdに未定義
- **修正案**: 以下のファンクション定義を追加

```sql
CREATE OR REPLACE FUNCTION update_storage_usage(
  p_team_id UUID,
  p_delta BIGINT
)
RETURNS VOID AS $$
BEGIN
  UPDATE teams
  SET storage_used_bytes = storage_used_bytes + p_delta
  WHERE id = p_team_id;
END;
$$ LANGUAGE plpgsql;
```

### 4. File Structure の実装補足

#### 4.1 `createServerClient` vs `createClient` の命名

- **場所**: `file-structure.md` L917-948
- **問題**: `/supabase/server.ts`で`createServerClient`、`/supabase/client.ts`で`createClient`と命名されているが、前者は`createServerClient as createClient`とインポートしている
- **影響**: 関数名の一貫性が欠けるため、他のファイルでimport時に混乱する可能性
- **修正案**: サーバー側は`createServerClient`、クライアント側は`createBrowserClient`と明確に区別する（現状のコード例では正しく実装されているため、説明文の誤記と推定）

## Suggestions

### 1. Phase管理の明確化

要件定義書では9フェーズ（ノンネーム→NDA→IM分析→LOI→MOU→DD実行→DD統合→SPA→クロージング）と定義されているが、データモデルでは異なる命名（`sourcing`, `nda`, `im_review`, `loi`, `dd`, `negotiation`, `closing`, `completed`, `abandoned`）が使われています。

**提案**: 要件定義書のフェーズ名とデータモデルのenum値を完全に一致させるか、マッピングテーブルを明示する

### 2. Q&A管理の`category` vs `dd_area`の統一

Q&Aのカテゴリは、API ContractsでDD領域（BDD/FDD等）、Data ModelではGeneral（finance/legal等）と2つの分類軸が混在しています。

**提案**: 以下のいずれかの設計に統一する

**案A**: DD領域のみを使用（要件定義書の意図に沿う）
```sql
category TEXT NOT NULL CHECK (category IN ('bdd', 'fdd', 'ldd', 'tdd', 'hrdd', 'itdd'))
```

**案B**: 2つの分類軸を独立して持つ
```sql
dd_area TEXT NOT NULL CHECK (dd_area IN ('bdd', 'fdd', 'ldd', 'tdd', 'hrdd', 'itdd')),
category TEXT NOT NULL CHECK (category IN ('finance', 'legal', 'hr', 'it', 'business', 'other'))
```

### 3. ダッシュボードAPIの集計パフォーマンス

`architecture.md` L856-873でMaterialized Viewを「将来的な最適化」として扱っていますが、初期想定が「同時接続50名」「100案件/チーム」であれば、ダッシュボード集計がボトルネックになる可能性があります。

**提案**: v1の初期段階から集計用のMaterialized ViewまたはCron Jobによる集計テーブル更新を検討する

### 4. 資料管理の全文検索

要件定義書のF9（Could Have）で「PDF/Excelのテキスト抽出」が挙げられていますが、設計書では具体的な実装方針が未定義です。

**提案**: v1でスコープ外とする場合、明示的に「Out of Scope」としてarchitecture.mdに記載する

### 5. チェックリストテンプレートの初期データ

`data-models.md` L771-781でデフォルトの資料カテゴリは定義されていますが、チェックリストテンプレートのサンプルデータは未定義です。

**提案**: DD領域ごとの標準的なチェックリスト項目（BDD: 過去3年の財務諸表確認、FDD: 事業計画の前提条件確認等）をシードデータとして定義する

## Detailed Comments

### Architecture

#### Strengths（強み）

1. **明確なレイヤー設計**: UI、Business Logic、Data Accessの3層が明確に分離され、各層の責務が具体的に定義されている
2. **認証フローの完全性**: Magic Link認証のエンドツーエンドフロー（メール送信→リンククリック→コールバック→セッション確立→リダイレクト）が詳細に記述されている
3. **状態管理の戦略**: Server State（DB由来）、URL State（searchParams）、Client State（useState）の使い分けが明確
4. **パフォーマンス最適化**: Server Components優先、Dynamic Import、画像最適化、キャッシング戦略が具体的
5. **セキュリティアーキテクチャ**: RLS、アクセス制御レイヤー、ファイルストレージポリシーが多層防御として設計されている
6. **スケーラビリティ考慮**: 初期想定に対する水平・垂直スケーリング戦略、ボトルネック対策が記載されている
7. **将来の拡張性**: Phase 2（LLM/AI統合）、Phase 3（VDR統合）の方向性が明示されている

#### Observations（観察点）

1. **Middleware認証チェックの例外パス**: `/api/auth`と`/login`を認証チェックから除外しているが、`/api/auth/callback`も除外する必要がある点が明示されている（良い点）
2. **セッション有効期限**: アクセストークン1時間、リフレッシュトークン30日という設定が、M&A DD業務の特性（長時間作業）に適合しているか要検証

### API Design

#### Strengths（強み）

1. **RESTful原則の遵守**: リソース指向URL、複数形リソース名、適切なHTTPメソッド・ステータスコードの使用
2. **Zodスキーマの完全性**: 全エンドポイントにリクエスト・レスポンススキーマが定義され、ランタイムバリデーションを担保
3. **エラーハンドリングの統一**: 標準エラーレスポンス形式（error.code, error.message, error.details）が一貫
4. **Server Actionsの活用**: フォーム送信・状態更新にServer Actionsを使用し、`revalidatePath`でキャッシュ制御
5. **ページング対応**: `page`, `limit`, `has_next`を含むレスポンス設計で、大量データの表示を最適化
6. **重複チェックAPI**: `/api/deals/[dealId]/qa/check-duplicate`で、Q&A作成前に重複を検出する設計

#### Observations（観察点）

1. **`sendUpdates`パラメータ**: イベント作成・更新時の通知制御（'all', 'externalOnly', 'none'）が定義されているが、M&A DDツールではメール通知が過剰になる可能性がある。デフォルト値を'none'にすることを検討すべき
2. **エクスポート形式**: Q&Aエクスポートで`"text", "csv", "xlsx"`の3形式に対応しているが、実装優先度は要件定義書のF3.4と整合する必要がある

### Data Model

#### Strengths（強み）

1. **正規化の適切性**: 第3正規形を基本とし、パフォーマンスが必要な箇所のみ非正規化を許容する方針が明確
2. **論理削除の実装**: `deleted_at`カラムによる論理削除で、監査証跡を保持しつつ物理削除を回避
3. **タイムスタンプの自動更新**: `updated_at`をTriggerで自動更新する実装例が記載されている
4. **インデックス戦略**: 外部キー、検索条件、ソート、全文検索（pg_trgm）の各用途に適切なインデックスを設計
5. **RLSポリシーの再利用**: ヘルパー関数（`user_is_member_of_team`, `user_can_edit_in_team`）で共通ロジックを抽出
6. **フェーズ履歴の監査証跡**: `deal_phases`テーブルでフェーズ遷移履歴を保持し、監査要件に対応
7. **Q&A重複検出**: pg_trgm拡張によるトライグラム類似度検索で、キーワード完全一致以外の類似質問も検出
8. **ストレージ容量管理**: `teams`テーブルに`storage_used_bytes`と`storage_limit_bytes`を持ち、ファイルアップロード時にチェック

#### Observations（観察点）

1. **`deals.current_phase`のenum値**: `"sourcing"`が含まれているが、要件定義書では「ノンネーム」が最初のフェーズ。`"sourcing"`と`"nonname"`のどちらを使用するか統一が必要
2. **`qa_items.category`のenum値**: `"finance", "legal", "hr", "it", "business", "other"`だが、API ContractsやArchitectureでは`"bdd", "fdd", "ldd", "tdd", "hrdd", "itdd"`が使われている。統一が必要
3. **RLSポリシーの`deleted_at`チェック**: SELECTポリシーでは`deleted_at IS NULL`をチェックしているが、UPDATEポリシーでも同様のチェックが必要（論理削除済みレコードの更新を防ぐため）

### File Structure

#### Strengths（強み）

1. **Feature-basedコロケーション**: 機能単位でディレクトリを切り、関連コンポーネントを近くに配置する設計
2. **公開APIの明示**: `index.ts`で公開するコンポーネントを定義し、内部実装を隠蔽する設計
3. **責務の分離**: `/actions`（Server Actions）、`/api`（APIクライアント）、`/schemas`（Zod）、`/services`（ビジネスロジック）の明確な役割分担
4. **命名規則の一貫性**: PascalCase（コンポーネント）、camelCase（関数）、kebab-case（API）の使い分けが明確
5. **環境変数テンプレート**: `.env.example`を提供し、開発者のオンボーディングを容易にする
6. **Supabaseマイグレーション**: `/supabase/migrations/`で各テーブル・インデックス・RLS・Triggerを分離して管理

#### Observations（観察点）

1. **`/services`ディレクトリの役割**: `duplicate-detection.ts`、`phase-calculator.ts`、`storage-quota.ts`が配置されているが、これらは「ビジネスロジック」というよりも「ドメインサービス」に近い。命名を`/services`から`/domain`に変更することで役割がより明確になる
2. **`/constants`ディレクトリ**: フェーズ名・カテゴリ名のラベルマッピングが定義されているが、これらは多言語対応（i18n）の際に`/locales`に移動する可能性がある。将来の拡張を考慮して構造を決定すべき

## Quality Gate Checklist

### architecture.md

- [x] システム構成図がある（テキスト形式で明示）
- [x] 技術スタック一覧がある（Next.js 16, Supabase, Vercel, TypeScript, Tailwind CSS, Zod）
- [x] レイヤー設計が明確（UI / Business Logic / Data Access）
- [x] 認証・認可の方式が定義されている（Magic Link, RLS, Cookie-based Session）
- [x] デプロイ戦略が記述されている（Vercel + GitHub連携、環境変数管理）

### api-contracts.md

- [x] すべてのAPIエンドポイントが列挙されている（Longlist, Deal, Q&A, Document, Checklist, Dashboard, Team）
- [x] 各エンドポイントにZod schemaがある
- [x] エラーレスポンス仕様が定義されている（標準エラーフォーマット、Error Codes表）

### data-models.md

- [x] DDL（CREATE TABLE）が記述されている（全12テーブル）
- [x] リレーション図がある（テキスト形式のER図）
- [x] インデックス設計がある（外部キー、検索条件、ソート、全文検索、論理削除フィルタ）
- [x] RLSポリシーが定義されている（ヘルパー関数、teams/deals/qa_items/documentsのポリシー例）

### file-structure.md

- [x] ディレクトリツリーが記述されている（全体構造、1298行）
- [x] 各ディレクトリの責務が明確（詳細な説明付き）
- [x] Feature-basedコロケーションが適用されている（`/components/features/`配下）

## Action Required

以下の軽微な修正を実装時に反映してください（設計書の再提出は不要）：

### 1. Phase定義の統一

**対象ファイル**: `data-models.md` L176-205、`api-contracts.md` L179-183

**修正内容**: 要件定義書の9フェーズ定義と整合させる

```sql
-- 現状（data-models.md）
current_phase TEXT NOT NULL DEFAULT 'sourcing' CHECK (current_phase IN (
  'sourcing', 'nda', 'im_review', 'loi', 'dd', 'negotiation', 'closing', 'completed', 'abandoned'
))

-- 修正後（要件定義書F2.2に基づく）
current_phase TEXT NOT NULL DEFAULT 'nonname' CHECK (current_phase IN (
  'nonname', 'nda', 'im', 'loi', 'mou', 'dd', 'dd_consolidation', 'spa', 'closing', 'completed', 'abandoned'
))
```

### 2. Q&A管理のカテゴリ統一

**対象ファイル**: `data-models.md` L236、`api-contracts.md` L322

**修正内容**: `qa_items.category`を`dd_area`にリネームし、enum値を統一

```sql
-- 現状
category TEXT NOT NULL,

-- 修正後
dd_area TEXT NOT NULL CHECK (dd_area IN ('bdd', 'fdd', 'ldd', 'tdd', 'hrdd', 'itdd')),
```

### 3. PostgreSQLファンクションの追加

**対象ファイル**: `data-models.md`（新規追加）

**修正内容**: `find_similar_questions`と`update_storage_usage`のファンクション定義をマイグレーションファイルとして追加

### 4. RLSポリシーの`deleted_at`チェック強化

**対象ファイル**: `data-models.md` L575-585

**修正内容**: UPDATEポリシーにも`deleted_at IS NULL`条件を追加

```sql
-- 現状
CREATE POLICY update_team_qa_items ON qa_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = qa_items.deal_id
        AND user_can_edit_in_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
  );

-- 修正後
CREATE POLICY update_team_qa_items ON qa_items
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM deals
      WHERE deals.id = qa_items.deal_id
        AND user_can_edit_in_team(deals.team_id)
        AND deals.deleted_at IS NULL
    )
    AND qa_items.deleted_at IS NULL  -- 追加
  );
```

## Summary

DD Navigatorの設計書は、要件定義書（requirements.md）のMust Have機能（F1〜F5）を完全にカバーし、技術選定・アーキテクチャ・データモデル・API・ファイル構造のすべてにおいて高品質な設計がなされています。

**主要な強み:**
- M&A DDドメインの深い理解に基づく適切な設計
- 型安全性・セキュリティ・パフォーマンスの多層的な考慮
- Next.js 16 App Router / Supabase / Vercel の特性を最大限に活かした設計
- Feature-basedコロケーションによる保守性の高いファイル構造

**軽微な改善点:**
- Phase定義の統一（要件定義書との整合）
- Q&Aカテゴリのenum値統一（`category` vs `dd_area`）
- PostgreSQLファンクションの明示的な定義
- RLSポリシーの`deleted_at`チェック強化

これらの改善点はいずれも実装時に容易に対応可能であり、設計の根幹を変更するものではありません。

**最終判定: APPROVED**

実装フェーズに進むことを推奨します。
