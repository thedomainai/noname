# AI業界横断テーマ調査設計書（2026年3-4月）

## 調査目的

2026年3月〜4月のAI業界における構造的変化のシグナルを収集し、既存の「AI市場7層レイヤー構造」「三極構造仮説」への含意を抽出する。

## 調査対象期間

2026年3月1日〜2026年4月8日

## 調査テーマと検索クエリ

### テーマ1: エージェントフレームワーク・プロトコル統合

**背景:** MCP（Model Context Protocol）、A2A（Agent-to-Agent Protocol）、OpenAI Agents SDK等の複数プロトコルが並走している。統合 or 分断の方向性を見極める必要がある。

**検索クエリセット:**

```
1. "MCP Model Context Protocol" adoption 2026 March OR April
2. "Agent-to-Agent Protocol" A2A 2026 developments
3. "OpenAI Agents SDK" enterprise adoption 2026
4. "agent framework" standardization 2026
5. MCP vs A2A competition OR cooperation 2026
```

**抽出項目:**

- [ ] MCPの新バージョン発表（日付、主要機能、採用企業）
- [ ] A2Aプロトコルの進展状況（仕様公開、実装例）
- [ ] OpenAI Agents SDKの採用事例（企業名、用途）
- [ ] フレームワーク間の統合・競合の動き
- [ ] エージェント実行基盤の実装状況（L2層への影響）

**既存レポートとの接続:**

- L2（Agent Runtime）の勢力図変化
- L4（Control Plane）のプロトコル中立性の実現可能性
- MCP + A2A + runtime-specific extensionsの多層構造の進展

### テーマ2: AI規制・ガバナンス

**背景:** EU AI Actは2026年から段階的施行が始まる。米国・日本の規制動向も2026年が重要な分岐点。

**検索クエリセット:**

```
1. "EU AI Act" enforcement 2026 implementation
2. "US AI regulation" executive order 2026
3. Japan AI regulation METI 2026
4. "Hiroshima AI Process" 2026 update
5. AI liability legislation 2026
6. "AI governance" framework 2026 March April
```

**抽出項目:**

- [ ] EU AI Actの施行フェーズ（対象システム、期限、罰則）
- [ ] 米国のAI規制法案の進展（議会審議状況）
- [ ] 日本のAI規制ガイドライン更新（経産省、広島AIプロセス）
- [ ] AI責任・ライアビリティの法的判例・議論
- [ ] 国際的なAI規制協調の動き

**既存レポートとの接続:**

- L4（Control Plane）のpolicy enforcement要件への影響
- L5（Workflow / Vertical Execution）の業界固有コンプライアンス対応
- 「組織OS」のガバナンスモジュール設計への示唆

### テーマ3: エンタープライズAI採用トレンド

**背景:** SalesforceのAgentforce等の事例から、エンタープライズAIが実証実験から本格導入フェーズに移行しつつある。

**検索クエリセット:**

```
1. "enterprise AI adoption" 2026 statistics
2. "AI agent deployment" enterprise 2026
3. "AI ROI" case study 2026
4. "enterprise AI market size" 2026 forecast
5. "AI implementation barriers" survey 2026
```

**抽出項目:**

- [ ] 大企業のAIエージェント導入率（業界別、地域別）
- [ ] AIのROI実績データ（生産性向上率、コスト削減額）
- [ ] エンタープライズAI市場規模の最新推計（2026-2029年）
- [ ] AI導入の障壁に関する調査結果（技術、組織、規制）
- [ ] 成功事例のパターン（業界、用途、導入プロセス）

**既存レポートとの接続:**

- L3（Context / Data / Identity）の実装パターン
- L5（Workflow / Vertical Execution）の業界別成熟度
- 「Permissioned Context Plane」の需要検証

### テーマ4: コンピュート経済

**背景:** OpenAIのStargate、AnthropicのTPU拡張、Googleの巨額CapEx等、コンピュート投資が加速。一方で推論コスト低下も進行。

**検索クエリセット:**

```
1. "inference cost" reduction trend 2026
2. "GPU supply" 2026 shortage OR availability
3. "TPU" "Trainium" custom AI chip 2026
4. "edge AI" "on-device inference" 2026
5. "AI datacenter" power consumption 2026
6. "AI CapEx" investment 2026
```

**抽出項目:**

- [ ] 推論コストの変化（$/1Mトークン、前年比）
- [ ] GPU/TPU/専用チップの供給状況（納期、価格）
- [ ] エッジAI / on-device推論の進展（モデルサイズ、性能）
- [ ] AIデータセンターの電力問題（消費電力、電源確保）
- [ ] 主要3社のCapEx計画（OpenAI Stargate、Google、AWS）

**既存レポートとの接続:**

- L0（Compute / Cloud / Energy）の資本戦の実態
- L1（Foundation Models）の訓練・推論コスト構造
- 「3社の寡占」vs「独立プレーヤー」の力学

### テーマ5: オープンソースAI

**背景:** Llama、Gemma、Mistral等のオープンウェイトモデルが品質向上を続けており、クローズドモデルとの性能差が縮小している。

**検索クエリセット:**

```
1. "Llama 4" OR "Llama" model release 2026
2. "Gemma" Google open model 2026
3. "Mistral" open model 2026
4. "open source AI" vs closed model 2026
5. "open weight model" enterprise adoption 2026
```

**抽出項目:**

- [ ] 主要オープンモデルの新バージョン（日付、性能、ライセンス）
- [ ] オープンモデル vs クローズドモデルのベンチマーク比較
- [ ] 企業のオープンモデル採用動向（理由、懸念事項）
- [ ] オープンソースAIエコシステムの成長（ツール、プラグイン）
- [ ] 規制のオープンAIへの影響（EU AI Act、米国輸出規制）

**既存レポートとの接続:**

- L1（Foundation Models）のコモディティ化圧力
- 「マルチモデル前提の設計」の妥当性検証
- L4（Control Plane）のマルチモデルrouting需要

## 調査実行手順

### ステップ1: 情報収集

各テーマの検索クエリセットを実行し、以下の情報を記録する：

- **日付:** YYYY-MM-DD形式
- **ソース:** 記事タイトル + URL
- **要約:** 100-200文字
- **引用:** 重要な数値・発言（原文）

### ステップ2: 事実の分類

収集した情報を以下の3カテゴリに分類：

1. **確定事実:** 発表済み、公式データ、実績値
2. **予測・見込み:** アナリスト予測、企業計画、市場推計
3. **論評・意見:** 専門家コメント、業界見解

### ステップ3: 含意の抽出

各事実について、以下の含意を記述：

- **7層レイヤー構造への影響:** どのレイヤーの力学が変化するか
- **三極構造（OpenAI/Anthropic/Google）への影響:** 勢力図の変化
- **ホワイトスペースへの影響:** 独立プレーヤーの機会・脅威

### ステップ4: 出力フォーマット

以下のマークダウン構造で出力：

```markdown
# AI業界横断テーマ調査レポート（2026年3-4月）

## テーマ1: エージェントフレームワーク・プロトコル統合

### 重要事実

#### 事実1: [タイトル]

- **日付:** 2026-03-15
- **ソース:** [記事タイトル](URL)
- **カテゴリ:** 確定事実 / 予測・見込み / 論評・意見
- **要約:** [100-200文字]
- **引用:** "[原文]"
- **含意:**
  - 7層レイヤー構造: L2（Agent Runtime）における...
  - 三極構造: Anthropicが...
  - ホワイトスペース: MCP Bridge市場において...

[以下同様に各テーマの事実を記述]

## 横断的考察

### 5テーマの共通パターン

[共通する構造変化を抽出]

### 既存レポートとの整合性

[「AI市場7層レイヤー構造」「三極構造仮説」の検証]

### 2026-2027の予測修正

[既存予測の修正が必要な点]
```

## 品質基準

### 情報源の信頼性

優先順位（高→低）：

1. 企業公式発表（IR、プレスリリース）
2. 規制当局の公式文書（EU、米国政府、経産省）
3. 主要メディアの1次報道（Bloomberg、Reuters、日経）
4. 業界アナリストレポート（Gartner、IDC、McKinsey）
5. 技術ブログ・論文（arXiv、企業技術ブログ）

### 除外基準

以下は調査対象外：

- 特定企業の株価予測
- 未確認の噂・リーク情報
- 個人ブログの推測（公式発表の解説は可）
- AIアート・エンタメ用途の動向（業務AIに限定）

## 想定される発見事項（仮説）

以下は調査前の仮説であり、実際の調査で検証・修正する：

### テーマ1: エージェントフレームワーク

- MCPとA2Aは競合ではなく補完関係（tool/context vs agent-to-agent）
- OpenAI Agents SDKがAWS上で先行普及
- エージェント実行基盤の標準化が2026年中は未完

### テーマ2: AI規制

- EU AI Act施行により高リスクAIシステムの認証コスト増
- 米国は連邦法制定に至らず、州法・業界自主規制が先行
- 日本は広島AIプロセスの枠組みで国際協調路線

### テーマ3: エンタープライズAI

- AI導入率は50%超だが、本格展開（production）は20%未満
- ROI実績は部門レベルで20-40%の生産性向上を示す
- 障壁の上位は「既存システム統合」「人材不足」「ROI測定困難」

### テーマ4: コンピュート経済

- 推論コストは前年比50%低下（効率化・競争激化）
- GPU供給は需要増に追いつかず納期遅延継続
- エッジAIはスマートフォンで先行、PC・IoTは2027年以降

### テーマ5: オープンソースAI

- オープンモデルはGPT-4初期レベルに到達
- 企業のオープンモデル採用は「コスト削減」より「ベンダーロックイン回避」が主動機
- EU AI Actがオープンモデルの責任所在を曖昧化し普及の障壁に

## 調査後のアクションプラン

### 1. レポート統合

- 本調査結果を `/Users/yuta/workspace/projects/noname/inbox/ai-industry-crosscutting-themes-2026-03-04.md` として保存
- 既存の「AI市場7層レイヤー構造」と統合し、更新版を作成

### 2. HTML化

- 重要な発見があれば、Paper DS準拠のインタラクティブビジュアルに変換
- タイムライン形式で5テーマの進展を可視化

### 3. 戦略への反映

- 「Permissioned Context Plane」の設計に規制動向を反映
- 「Control Plane」のマルチモデルrouting設計にオープンモデル動向を反映
- エンタープライズAI採用トレンドから営業戦略を更新

## 付録: 主要な情報源リスト

### 企業公式

- OpenAI Blog: https://openai.com/blog
- Anthropic News: https://www.anthropic.com/news
- Google AI Blog: https://blog.google/technology/ai/
- Salesforce News: https://www.salesforce.com/news/

### 規制当局

- EU AI Act: https://artificialintelligenceact.eu/
- US AI.gov: https://ai.gov/
- 経産省AI戦略: https://www.meti.go.jp/policy/mono_info_service/ai/

### 業界アナリスト

- Gartner AI Insights
- IDC FutureScape
- McKinsey Technology Trends

### メディア

- Bloomberg Technology
- The Information
- TechCrunch
- 日経xTECH

## メタデータ

- **作成日:** 2026-04-08
- **作成者:** Claude Code (Sonnet 4.5)
- **目的:** WebSearch権限のある環境での調査実行用設計書
- **関連文書:**
  - `/Users/yuta/workspace/projects/noname/corporate-os/context/ai-market-layer-structure.md`
  - `/Users/yuta/workspace/projects/noname/inbox/refs/llm-commoditization-cross-analysis.md`
  - `/Users/yuta/workspace/projects/noname/corporate-os/20-rationale-agi-era-organization-os.md`
