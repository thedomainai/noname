# research-workbench プロダクトドキュメント

## プロダクトコンセプト

### ターゲットユーザー

**プライマリ**: Equity Analyst（アナリスト）
- 役割: 個別銘柄の深掘り分析・投資 Thesis 構築
- 主要タスク: 決算分析・IR面談・ニュース追跡・レポート執筆
- ゴール: カバレッジ銘柄数を増やしながら分析品質を維持

### 解決する課題

1. **カバレッジ限界**: 深掘り分析できる銘柄数が3〜5銘柄に限定される
2. **情報過多**: 決算・IR・ニュースを全てフォローしきれない
3. **MNPI リスク**: メモに MNPI（重要未公表情報）が混入すると AI 処理できず、分離が煩雑
4. **決算対応の遅延**: 決算発表後、要約作成に時間がかかり次の銘柄に移れない
5. **属人的なメモ**: IR面談メモが構造化されておらず、後から検索・活用しづらい

### 提供する価値

1. **AIカバレッジ拡張**: 20銘柄を包括的にモニタリング（従来の3〜5銘柄から拡大）
2. **AI Digest 自動生成**: 決算・IR・ニュースをAIが要約し、アナリストは承認するだけ
3. **MNPI 自動除外**: MNPI フラグ付きメモは AI 処理から除外し、コンプライアンス違反を防止
4. **決算キュー管理**: 今後の決算予定を時系列表示、優先順位付け
5. **構造化 IR ログ**: 面談内容を構造化して保存、検索・活用が容易

### ソリューション

**AI 拡張リサーチプラットフォーム**
- Claude API による自動要約生成
- MNPI コンプライアンス機能（フラグ付きメモは AI 処理スキップ）
- 20銘柄のサンプルデータ + 20件の AI Digest サンプル

**技術構成**
- フレームワーク: Next.js 16 + TypeScript
- スタイル: Tailwind CSS + Paper Design System
- データ: サンプルデータ（`data/extended-stocks.ts`）

## ユーザーフロー

### 日常リサーチフロー

```
1. ダッシュボード（Coverage）で全体確認
   - カバレッジ銘柄数: 20銘柄
   - AI承認待ち数
   - 今週の決算数
   ↓
2. AI承認待ちバナーをクリック → AI Digest ページへ
   ↓
3. 承認待ちダイジェストを確認
   - AI生成の要約を読む
   - 承認 or 編集 or 却下
   ↓
4. Earnings Queue で今週の決算予定を確認
   - 重要度順にソート
   - 決算後、AI Digest が自動生成される
   ↓
5. IR Log で面談メモを記録
   - 面談日・形式・参加者・メモを入力
   - MNPI フラグを設定（必要に応じて）
```

### 決算対応フロー

```
1. Earnings Queue で決算予定を確認
   ↓
2. 決算発表（外部システム）
   ↓
3. AI が自動要約を生成（バックグラウンド）
   ↓
4. AI Digest ページに「承認待ち」として表示
   ↓
5. アナリストが要約を確認
   - 内容が適切 → 承認ボタン → ステータス「承認済み」
   - 修正必要 → 編集 → 承認
   - 不適切 → 却下
   ↓
6. 承認済みダイジェストは検索・参照可能
```

## 画面フロー

```
[Coverage Dashboard] (/)
    ├─→ [AI Digest] (/digest)
    ├─→ [Earnings Queue] (/earnings)
    ├─→ [IR Log] (/ir)
    ├─→ [Thesis] (/thesis)
    └─→ [Watchlist] (/watchlist)
```

## 画面構成詳細

### 1. Coverage Dashboard（/）

**レイアウト**
```
[サイドバー: ナビゲーション]
[メインコンテンツ]
  [ページタイトル]
  [サマリーカード × 4]
    - カバレッジ銘柄数: 20
    - AI承認待ち数
    - 今週の決算数
    - 処理中数

  [AI承認待ちバナー]（条件付き表示）
    - 「AI生成ダイジェストがN件承認待ちです」
    - クリック → AI Digest ページへ

  [銘柄グリッド（4カラム）]
    - 銘柄カード × 20
      - ティッカー・銘柄名
      - Conviction バッジ
      - Thesis サマリ
      - セクター
      - AI処理ステータス（承認待ち/処理中/承認済み）
```

**インタラクション**
- AI承認待ちバナークリック → AI Digest ページへ
- 銘柄カードクリック → 詳細ページへ（未実装）

### 2. AI Digest（/digest）

**レイアウト**
```
[ページタイトル]
[説明カード]
  - AI Digest の目的・使い方

[タブ: 承認待ち | 承認済み | 却下済み]

[承認待ちタブ]
  - ダイジェストカード × N
    - 銘柄名・ティッカー
    - Conviction バッジ
    - カテゴリバッジ（決算/IR/ニュース）
    - AI生成日時
    - 要約テキスト
    - [承認] [編集] [却下] ボタン

[承認済みタブ]
  - ダイジェストカード × N
    - 銘柄名・ティッカー
    - カテゴリ
    - 承認日時
    - 要約テキスト

[却下済みタブ]
  - ダイジェストカード × N
    - 却下理由
```

**インタラクション**
- 承認ボタン → ステータス更新 → 承認済みタブへ移動
- 編集ボタン → テキストエリア表示 → 編集後承認
- 却下ボタン → 却下理由入力ダイアログ → 却下済みタブへ移動

### 3. Earnings Queue（/earnings）

**レイアウト**
```
[ページタイトル]
[サマリーカード × 3]
  - 今週の決算数
  - 来週の決算数
  - 今月の決算数

[ソート・フィルタバー]
  - ソート: 日付順/Conviction順
  - フィルタ: 全て/HIGH/MEDIUM/LOW

[決算カード × N]
  - 銘柄名・ティッカー
  - Conviction バッジ
  - 決算発表日時
  - 期（Q1/Q2/Q3/Q4）
  - セクター
  - AI Digest ステータス（生成済み/未生成）
```

### 4. IR Log（/ir）

**レイアウト**
```
[ページタイトル]
[新規面談追加ボタン]

[面談カード × N（日付逆順）]
  - 銘柄名・ティッカー
  - 面談日時
  - 面談形式（対面/電話/オンライン）
  - 参加者
  - メモ（展開/折りたたみ）
  - MNPI バナー（条件付き表示）
    - 「この面談には MNPI メモが含まれています。AI処理から除外されます。」
```

**MNPI 機能**
- 面談メモに `hasMnpiNote: true` フラグ
- MNPI フラグがある面談は黄色バナー表示
- AI Digest 生成時、MNPI メモは入力データから除外

**インタラクション**
- 新規面談追加ボタン → ダイアログ表示 → フォーム入力（銘柄・日時・形式・参加者・メモ・MNPI フラグ）→ 保存

### 5. Thesis（/thesis）

portfolio-governance の Thesis Board と同様の構成。

### 6. Watchlist（/watchlist）

portfolio-governance の Watchlist と同様の構成。

## データモデル

### ExtendedStock

```typescript
{
  id: string
  ticker: string
  name: string
  sector: string
  market: string
  conviction: "HIGH" | "MEDIUM" | "LOW"
  thesisSummary: string
  lastIRDate: string
}
```

### AIDigest

```typescript
{
  id: string
  stockId: string
  category: "EARNINGS" | "IR" | "NEWS"
  generatedAt: string
  summary: string
  status: "PENDING_REVIEW" | "APPROVED" | "REJECTED"
  approvedAt?: string
  rejectedReason?: string
}
```

### IRMeeting

```typescript
{
  id: string
  stockId: string
  date: string
  format: "IN_PERSON" | "PHONE" | "ONLINE"
  participants: string[]
  notes: string
  hasMnpiNote: boolean  // MNPI フラグ
}
```

## API エンドポイント

### POST /api/ai-digest/approve

AI Digest を承認

### POST /api/ai-digest/reject

AI Digest を却下

### POST /api/ir-meeting/create

IR面談メモを作成

## 運用方法

```bash
cd ../professional-ai/buyside/equity-research-app-scout
npm install
cp .env.local.example .env.local  # ANTHROPIC_API_KEY を設定
npm run dev  # → http://localhost:3004
```

## 技術的特徴

### Paper Design System

- サイドバー bg: `#eeedea`（paper-kraft）
- ページ bg: `#fdfdfc`（paper-white）
- アクセント: `#2563eb`（ink-blue）
- フォント: Instrument Sans（UI）/ JetBrains Mono（数値）

### 静的サンプルデータ

サンプルデータで動作。本番化には以下が必要：
- データベース統合（Prisma + PostgreSQL）
- Claude API 統合（決算・IR要約自動生成）
- データ入力UI実装
- MNPI コンプライアンス機能の強化

### 今後の拡張予定

1. **リアルタイム AI 要約**: 決算発表直後に自動要約生成
2. **MNPI 検出**: テキスト解析で MNPI の可能性を自動検出
3. **検索機能**: 承認済みダイジェストの全文検索
4. **レポート生成**: 承認済みダイジェストから週次レポート自動生成
5. **マルチテナント**: 複数組織での利用

**ドキュメント作成日**: 2026-04-06
**バージョン**: 1.0
