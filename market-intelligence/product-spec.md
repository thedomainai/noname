# market-intelligence プロダクトドキュメント

## プロダクトコンセプト

### ターゲットユーザー

**プライマリ**: アナリスト・ファンドマネージャー
- 役割: 投資判断のための市場分析・競合調査
- 主要タスク: 企業分析・市場トレンド把握・投資機会の発掘
- ゴール: 競合環境・市場動向を構造化して把握し、投資判断の精度を向上

### 解決する課題

1. **情報の散在**: 競合情報・市場動向が複数ソースに分散している
2. **分析の属人化**: アナリストごとに分析手法が異なり、標準化されていない
3. **トレンド把握の遅延**: 市場の変化に気づくのが遅れる
4. **投資機会の見落とし**: 構造的な分析なしでは機会を逃す

### 提供する価値

1. **構造化された競合分析**: Reflexivity ベースで市場環境を可視化
2. **UI/UX コンセプトの提示**: 投資分析プラットフォームの方向性を示すデモ
3. **統合ビュー**: 複数の分析視点を1つのダッシュボードに集約

### ソリューション

**競合調査ベース投資分析デモアプリ**
- Reflexivity 理論を応用した市場分析フレームワーク
- 静的サンプルデータによる UI/UX コンセプト実証
- Paper Design System による洗練されたインターフェース

**技術構成**
- フレームワーク: Next.js 16 + TypeScript
- スタイル: Tailwind CSS + Paper Design System
- データ: 静的サンプルデータ

## ユーザーフロー

### 市場分析フロー

```
1. ダッシュボードで市場全体像を把握
   - 主要セクター動向
   - 注目トレンド
   ↓
2. 競合企業マップで業界構造を確認
   - 主要プレイヤーのポジショニング
   - 市場シェア・成長率
   ↓
3. 個別企業の詳細分析
   - 競合優位性
   - リスク要因
   ↓
4. 投資判断材料として活用
```

## 画面フロー

```
[Dashboard] (/)
    ├─→ [Market Overview] (/market)
    ├─→ [Competitive Landscape] (/competitive)
    └─→ [Company Deep Dive] (/company/[id])
```

## 画面構成詳細

### 1. Dashboard（/）

**レイアウト**
```
[サイドバー: ナビゲーション]
[メインコンテンツ]
  [ページタイトル]
  [サマリーカード × 3]
    - 分析対象企業数
    - 注目セクター数
    - アップデート件数

  [最新トレンドセクション]
    - トレンドカード × N
      - トレンド名
      - 影響度
      - 関連企業
```

### 2. Market Overview（/market）

市場全体の動向・セクター別分析を表示

### 3. Competitive Landscape（/competitive）

競合企業のポジショニングマップ・市場構造を可視化

### 4. Company Deep Dive（/company/[id]）

個別企業の詳細分析ページ

## データモデル

### Company

```typescript
{
  id: string
  name: string
  sector: string
  marketCap: number
  competitivePosition: string
  keyMetrics: {
    revenue: number
    growth: number
    marketShare: number
  }
}
```

### MarketTrend

```typescript
{
  id: string
  name: string
  description: string
  impact: "HIGH" | "MEDIUM" | "LOW"
  relatedCompanies: string[]
}
```

## 運用方法

```bash
cd ../professional-ai/buyside/reflexivity-app
npm install
npm run dev  # → http://localhost:3007
```

## 技術的特徴

### Paper Design System

- サイドバー bg: `#eeedea`（paper-kraft）
- ページ bg: `#fdfdfc`（paper-white）
- アクセント: `#2563eb`（ink-blue）
- フォント: Instrument Sans（UI）/ JetBrains Mono（数値）

### デモアプリとしての位置づけ

このアプリは **UI/UX コンセプトの提示が主目的** のデモアプリです。実装詳細は簡略化されており、以下の点で制約があります：

- サンプルデータのみで動作（実データ連携なし）
- AI 分析機能は未実装
- データ入力 UI は未実装

### 今後の拡張予定

1. **データベース統合**: PostgreSQL によるデータ永続化
2. **AI 分析機能**: Claude API による競合分析自動生成
3. **リアルタイムデータ連携**: Bloomberg / Refinitiv API 統合
4. **レポート生成**: PDF/Excel エクスポート機能
5. **マルチテナント**: 複数組織での利用

**ドキュメント作成日**: 2026-04-06
**バージョン**: 1.0
