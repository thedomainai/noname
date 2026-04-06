# portfolio-governance プロダクトドキュメント

## プロダクトコンセプト

### ターゲットユーザー

**プライマリ**: Fund Manager（ポートフォリオ責任者）
- 役割: チーム全体の投資活動を監督
- 主要タスク: ポートフォリオ全体の Conviction 分布確認、リスク管理、IR活動の把握
- ゴール: 投資Thesisの健全性を維持し、チーム全体の意思決定品質を向上

**セカンダリ**: CIO（最高投資責任者）
- 役割: 投資戦略の最終承認・リスク統制
- 主要タスク: 投資委員会での承認、規制報告、取締役会報告
- ゴール: 組織全体のリスク・リターンを最適化

### 解決する課題

1. **Thesis 健全性の不可視化**: 各アナリストの投資 Thesis が正しく機能しているか、組織全体で把握できていない
2. **Conviction ドリフトの見逃し**: 確信度が変動しても気づかず、ポートフォリオが硬直化
3. **IR活動の散在**: 誰がどの企業といつ面談したか、組織横断で共有されていない
4. **リスク集中の見落とし**: セクター・テーマ別のリスク集中が可視化されていない
5. **決算対応の属人化**: 決算カレンダーが共有されず、対応が個人任せになる

### 提供する価値

1. **チーム全体の可視化**: 3アナリスト・15銘柄の Conviction マトリクスを一覧
2. **Thesis 健全性チェック**: 各銘柄の前提条件（Assumption）が INTACT / AT_RISK / BROKEN かリアルタイム表示
3. **Conviction Drift 追跡**: 確信度の時系列推移をグラフで可視化
4. **IR Pipeline 管理**: 面談予定・実施済み面談を一元管理
5. **決算カレンダー**: 今後の決算予定を時系列表示

### ソリューション

**静的ガバナンスダッシュボード**
- サンプルデータ（3アナリスト・15銘柄）を用いた可視化専用アプリ
- AI機能なし、データ入力UIなし（デモ・プレゼン用）
- 7つの専門ビュー（Portfolio Map / Thesis Board / Risk Radar / Conviction Drift / Earnings Calendar / IR Pipeline / Watchlist）

**技術構成**
- フレームワーク: Next.js 16 + TypeScript
- スタイル: Tailwind CSS + Paper Design System
- データ: サンプルデータ（`data/team.ts`）

## ユーザーフロー

### 日常監督フロー（FM）

```
1. ダッシュボード（Portfolio Map）で全体俯瞰
   - HIGH Conviction 銘柄数を確認
   - AT_RISK / BROKEN 前提条件の件数を確認
   - 要注意銘柄をチェック
   ↓
2. 気になる銘柄の Thesis Board で詳細確認
   - 各 Assumption の状態を確認
   - 最新の更新理由を読む
   ↓
3. Conviction Drift ページで推移確認
   - 確信度が下がっている銘柄を特定
   - ドリフトの理由を確認
   ↓
4. IR Pipeline で今後の面談予定を確認
   - 必要に応じてアナリストに同行を依頼
   ↓
5. Earnings Calendar で決算日程を確認
   - 今週・来週の決算予定を把握
```

### 週次レビューフロー（FM/CIO）

```
1. Portfolio Map でチーム全体の Conviction 分布を確認
   ↓
2. Risk Radar でセクター・テーマ別のエクスポージャーを確認
   - 集中リスクがないか確認
   - アクティブウェイトの偏りをチェック
   ↓
3. Conviction Drift で推移が激しい銘柄を確認
   - 投資 Thesis の安定性を評価
   ↓
4. 投資委員会での議論ポイントを整理
```

## 画面フロー

```
[Portfolio Map] (/)
    ├─→ [Thesis Board] (/thesis)
    ├─→ [Risk Radar] (/risk)
    ├─→ [Conviction Drift] (/drift)
    ├─→ [Earnings Calendar] (/earnings)
    ├─→ [IR Pipeline] (/ir)
    └─→ [Watchlist] (/watchlist)
```

## 画面構成詳細

### 1. Portfolio Map（/）

**レイアウト**
```
[サイドバー: ナビゲーション]
[メインコンテンツ]
  [ページタイトル]
  [サマリーカード × 3]
    - HIGH Conviction 銘柄数
    - AT_RISK 前提条件数
    - 要注意銘柄数（BROKEN含む）

  [アナリスト別セクション × 3]
    - アナリスト名・役割・担当銘柄数
    - 銘柄カード × N（3カラムグリッド）
      - 銘柄名・ティッカー
      - Conviction バッジ（HIGH/MEDIUM/LOW）
      - Conviction 変動アイコン（↑/→/↓）
      - Thesis サマリ（2行）
      - Assumption カウント（Intact/AtRisk/Broken）
```

**データ**
- 3アナリスト: 山田健太（FM、3銘柄）、鈴木美穂（Analyst、5銘柄）、田中誠（Analyst、7銘柄）
- 15銘柄: トヨタ・ソフトバンクG・キーエンス・任天堂・信越化学・ソニー・キヤノン・キリン・三菱UFJ・武田薬品・JR東日本・三井物産・アステラス・ホンダ・他

**インタラクション**
- 銘柄カードクリック → Thesis Board ページへ（該当銘柄選択状態）

### 2. Thesis Board（/thesis）

**レイアウト**
```
[左: 銘柄一覧（4カラム分）]
  - 銘柄カード × 15
    - ティッカー・銘柄名
    - Conviction バッジ
    - Assumption ステータスサマリ

[右: Thesis 詳細（8カラム分）]
  - 銘柄ヘッダー
    - ティッカー・銘柄名
    - セクター・市場
    - Conviction バッジ
    - 最終IR日
  - Thesis サマリ（テキスト）
  - Assumptions リスト
    - Assumption テキスト
    - ステータスバッジ（INTACT/AT_RISK/BROKEN）
  - Conviction 履歴タイムライン
    - 日付・Conviction・理由
```

**インタラクション**
- 左カラムの銘柄カードクリック → 右カラムに詳細表示

### 3. Risk Radar（/risk）

**レイアウト**
```
[KPIカード × 4]
  - ポートフォリオ銘柄数
  - セクター数
  - HIGH Conviction 銘柄数
  - リスク警告数

[タブ: セクター別 | テーマ別 | Conviction別]

[セクター別タブ]
  - セクター別エクスポージャー棒グラフ
  - セクターカード × N
    - セクター名・銘柄数
    - 代表銘柄リスト

[テーマ別タブ]
  - テーマカード × N
    - テーマ名（例: AI・自動運転・脱炭素）
    - 関連銘柄リスト

[Conviction別タブ]
  - Conviction分布円グラフ
  - 銘柄リスト（Conviction順）
```

### 4. Conviction Drift（/drift）

**レイアウト**
```
[説明カード]
  - Conviction Drift の定義
  - 監視目的

[銘柄別ドリフトチャート × 15]
  - 銘柄名・ティッカー
  - 折れ線グラフ（時系列）
    - Y軸: Conviction（HIGH=3, MEDIUM=2, LOW=1）
    - X軸: 日付
  - ポイントごとの理由ツールチップ
```

**インタラクション**
- チャート上のポイントホバー → 理由ツールチップ表示

### 5. Earnings Calendar（/earnings）

**レイアウト**
```
[サマリーカード × 3]
  - 今週の決算数
  - 来週の決算数
  - 今月の決算数

[タブ: カレンダービュー | リストビュー]

[カレンダービュータブ]
  - 月次カレンダー
  - 決算日にバッジ表示

[リストビュータブ]
  - 決算カード × N（時系列）
    - 銘柄名・ティッカー
    - 決算発表日時
    - 期（Q1/Q2/Q3/Q4）
    - Conviction バッジ
    - 担当アナリスト
```

### 6. IR Pipeline（/ir）

**レイアウト**
```
[サマリーカード × 3]
  - 今月の面談予定数
  - 実施済み面談数
  - 平均面談頻度

[タブ: 予定 | 実施済み]

[予定タブ]
  - 面談カード × N（日付順）
    - 銘柄名・ティッカー
    - 面談日時
    - 面談形式（対面/電話/オンライン）
    - 担当アナリスト
    - ステータスバッジ

[実施済みタブ]
  - 面談カード × N（日付逆順）
    - 銘柄名・ティッカー
    - 面談日
    - メモ（概要）
    - 担当アナリスト
```

### 7. Watchlist（/watchlist）

**レイアウト**
```
[説明カード]
  - Watchlist の目的

[銘柄リスト]
  - 銘柄カード × N
    - ティッカー・銘柄名
    - セクター
    - Watchlist 追加理由
    - 追加日
```

## データモデル

### TeamMember

```typescript
{
  id: string
  name: string
  role: "FM" | "ANALYST" | "CIO"
  coverage: string[]  // stockId[]
}
```

### PortfolioStock

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
  analystId: string
  currentPrice?: number
  targetPrice?: number
  upside?: number
  assumptions: ThesisAssumption[]
  convictionHistory: ConvictionPoint[]
}
```

### ThesisAssumption

```typescript
{
  id: string
  text: string
  status: "INTACT" | "AT_RISK" | "BROKEN"
}
```

### ConvictionPoint

```typescript
{
  date: string
  conviction: "HIGH" | "MEDIUM" | "LOW"
  reason: string
}
```

## 運用方法

```bash
cd ../professional-ai/buyside/equity-research-app-compass
npm install
npm run dev  # → http://localhost:3005
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
- データ入力UI実装
- リアルタイムデータ連携（Bloomberg API 等）
- ユーザー認証・権限管理

### 今後の拡張予定

1. **データベース統合**: サンプルデータから実データへ
2. **編集UI**: Thesis・Assumption の追加・編集機能
3. **通知機能**: Conviction ドリフト・決算アラート
4. **レポート生成**: PDF/Excel エクスポート
5. **マルチテナント**: 複数組織での利用

**ドキュメント作成日**: 2026-04-06
**バージョン**: 1.0
