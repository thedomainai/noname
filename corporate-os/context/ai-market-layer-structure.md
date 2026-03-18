# AI市場の7層レイヤー構造 — 詳細分析

本ドキュメントは「基盤モデル3社戦略分析と AGIネイティブ変革会社への示唆 2026–2029」のレイヤー構造セクションを独立させ、各層の詳細・プレーヤー動向・論理関係を深掘りしたものである。


## レイヤー構造の全体像

AI市場を7層で定義する。下層（L0）がインフラ、上層（L6）がエンドユーザー接点であり、中間層（L3〜L5）に独立プレーヤーの持続的な戦場がある。

| Layer | 名称 | 一言定義 | 独立プレーヤー耐久性 |
|-------|------|---------|-------------------|
| L0 | Compute / Cloud / Energy | GPU・TPU・DC・電力 | 極めて低い |
| L1 | Foundation Models | 基盤モデル（GPT・Claude・Gemini等） | 低い |
| L2 | Agent Runtime | エージェント実行基盤 | 低い |
| L3 | Context / Data / Identity / Tool Access | 社内データ・権限・コネクタ | 中〜高（条件付き） |
| L4 | Control Plane | モデル/エージェント/ツールの統治層 | 高い |
| L5 | Workflow / Vertical Execution | 業界固有の業務実行層 | 高い |
| L6 | Default Distribution / Front Door | エンドユーザー接点・配布面 | 極めて低い |


## 各レイヤーの詳細

### L0: Compute / Cloud / Energy

**定義:** GPU・TPU・Trainium・データセンター・電力。AI のすべてを支える物理インフラ層。

**主要プレーヤーの動き:**

- **OpenAI:** Stargate プロジェクトで 2029 年までに 10GW 計画。SoftBank・Oracle との合弁
- **Anthropic:** Google Cloud で最大 100 万 TPU 規模の拡張。AWS と Trainium 共同開発（2GW 確保）
- **Google/Alphabet:** 2025 年通期 CapEx 914 億ドル、2026 年は 1,750〜1,850 億ドル見込み

**独立プレーヤーの耐久性: 極めて低い**

数十〜数百億ドル規模の資本投下が必要。スタートアップや独立プレーヤーがこの資本戦に降りるのは非合理。クラウドベンダーの寡占が続く。

**含意:** この層では戦わない。消費者として最適なインフラを選択する立場を取る。

### L1: Foundation Models

**定義:** GPT・Claude・Gemini・Gemma 等の基盤モデル群。推論能力・マルチモーダル・長文脈がコア機能。

**市場の構造的動向:**

- モデル性能の差は縮まり続けている（ベンチマーク上の差異は数ヶ月で追いつかれる）
- 単体モデルでの持続的差別化は困難
- オープンモデル（Llama, Gemma, Mistral 等）が品質面で追い上げ
- コモディティ化圧力が強い

**独立プレーヤーの耐久性: 低い**

モデル訓練には L0 層のインフラが前提であり、3 社＋少数のスケールプレーヤーに集約される。独立モデル企業の新規参入障壁は極めて高い。

**含意:** モデルは「選ぶもの」であって「作るもの」ではない。マルチモデル前提の設計が合理的。

### L2: Agent Runtime

**定義:** エージェントの状態管理・実行・ツール呼び出し・メモリ・handoff を担う実行基盤。

**3 社の侵攻正面:**

- **OpenAI:** Frontier（企業向けエージェントプラットフォーム）+ Agents SDK + Responses API。AWS 上に Stateful Runtime Environment を展開
- **Anthropic:** Claude Enterprise + MCP をランタイム層まで拡張。Bedrock / Vertex AI / Azure AI Foundry 全方位展開
- **Google:** Gemini Enterprise + ADK/A2A agent + Interactions API（server-side state・background execution）

**独立プレーヤーの耐久性: 低い**

3 社が全力で取りに来ている層。汎用 Agent Runtime を独立で構築しても、プラットフォーム統合の優位に対抗しにくい。

**含意:** 汎用エージェントプラットフォーム企業を目指すのは 3 社の延長線上に置かれるリスクが高い。

### L3: Context / Data / Identity / Tool Access

**定義:** 社内データ、権限（Identity）、コネクタ、MCP 接続、System of Record 連携。エージェントが「何を知っているか」「何にアクセスできるか」を決定する層。

**3 社の動き:**

- **OpenAI:** Company Knowledge で社内文脈を ChatGPT に取り込み + MCP アクセスコネクタを Business/Enterprise に拡大
- **Google:** Workspace Content Integration + Search の AI Overviews で社内/社外データを統合
- **Anthropic:** MCP をオープンスタンダードとして推進。Remote MCP Servers を API から直接利用可能に

**2 つのサブ層:**

| サブ層 | 内容 | 3社の侵食度 |
|-------|------|------------|
| 汎用コネクタ / RAG | 汎用的なデータ接続・検索 | 高い（飲み込まれつつある） |
| 業務意味論 | 権限・監査・文書系統・業務オブジェクトの正しい束ね方 | 低い（残る） |

**独立プレーヤーの耐久性: 中〜高（条件付き）**

単なる RAG やコネクタ集合では 3 社に飲み込まれる。**日本企業の System of Record をまたいで、権限・監査・文書系統・業務オブジェクトを正しく束ねる層**（Permissioned Context Plane）であれば耐久性が高い。

**含意:** 「何をつなぐか」ではなく「どう権限と意味を束ねるか」が価値の源泉。

### L4: Control Plane

**定義:** モデル/エージェント/ツールの routing・policy・evals・trace・audit・cost・approval を一体化した統治層。

**構成要素:**

- **Policy-based Routing:** タスク・機密区分・正確性要件・レイテンシ・データ所在地・承認要否・予算に基づく model/agent/tool/cloud の動的切り替え
- **Evals / Observability:** 再現性のある評価、トレース、失敗時の fallback
- **Human Approval / Audit:** 承認フロー、監査ログ、コスト配賦
- **Cost Management:** 利用量・モデル別・部門別のコスト可視化と制御

**なぜ耐久性が高いか:**

1. OpenAI が AWS に出て、Anthropic が Major Cloud 全面展開し、Google が Model Garden で partner models を抱える → **マルチモデル現実を管理可能にする層に構造的な需要がある**
2. 3 社はそれぞれ自社プラットフォーム内の制御は提供するが、**クロスプラットフォームの統治**は構造的に提供しにくい
3. 企業が買うのは「賢い返答」より「安全に動かせること」

**独立プレーヤーの耐久性: 高い**

マルチモデル・マルチクラウド化が進むほど価値が増す。ただし、単なる thin router（価格・レイテンシだけで勝負）は内製・クラウド同梱圧縮に潰される。**identity / policy / trace / eval / audit を持つ場合にのみ**価値が残る。

**含意:** Control Plane は独立プレーヤーの本丸候補。

### L5: Workflow / Vertical Execution

**定義:** 調達・監査・法務・営業・保守・品質・安全・医療などの業界固有の業務実行層。

**なぜ 3 社が簡単に取れないか:**

1. **業界固有の承認責任:** 誰が何を承認する権限を持つかは業界・企業ごとに異なる
2. **帳票・フォーマット:** 規制・業界慣行に基づく固有のドキュメント体系
3. **例外処理:** 標準フローから外れた場合の業界固有のエスカレーションパス
4. **KPI・SLA:** 業界ごとに異なる成果指標と品質基準
5. **現場運用:** 物理的な作業環境・人間のワークフローとの統合

**独立プレーヤーの耐久性: 高い**

業界知識と販売チャネルが直接的な参入障壁になる。基盤モデルが入れ替わっても、front door が変わっても、この層の価値は残る。

**含意:** 1〜2 業界に絞って深く実装するのが正解。薄く広く展開するのは 3 社の汎用面と衝突する。

### L6: Default Distribution / Front Door

**定義:** エンドユーザーが AI に最初に触れる接点。ChatGPT・Gemini in Workspace/Search/Chrome・Claude.ai・Cloud console・既存業務ソフト。

**3 社の配布面:**

- **OpenAI:** ChatGPT（月間数億ユーザー）+ Frontier（企業向け）
- **Google:** Gemini in Workspace（Workspace Business/Enterprise に同梱）+ Search AI Overviews + Chrome
- **Anthropic:** Claude.ai + Bedrock/Vertex/Azure 上のAPI

**独立プレーヤーの耐久性: 極めて低い**

3 社の既存配布面が圧倒的に強い。汎用社内チャット・汎用 Copilot で正面から入る意味はない。

**含意:** Front Door は 3 社に任せ、その裏側で動く層（L3〜L5）に注力する。


## レイヤー間の論理関係

### 依存関係（下から上へ）

各レイヤーは下位レイヤーの上に成立する。L5 の業務実行は L2〜L4 の実行基盤・データ・統治があって初めて機能する。

### 価値の逆転構造

**下位レイヤーほど資本集約的**（L0 の投資規模が最大）だが、**中間レイヤーほど独立プレーヤーの持続的価値が高い**。これは以下の構造による:

- L0〜L2: 規模の経済が効き、3 社に集約される
- L3〜L5: 業務固有性・組織固有性が高く、汎用プラットフォームでは吸収しきれない
- L6: ネットワーク効果とバンドル戦略で 3 社が制圧

### 3 社の侵攻パターン

3 社は**下（L0-L2）と上（L6）から挟み込む形**で中間層に侵攻している。

| 社 | 主な侵攻方向 | 中間層への侵食度 |
|----|------------|----------------|
| OpenAI | L6（ChatGPT）+ L2（Frontier/Agents SDK）から中間層へ | Company Knowledge・MCP コネクタで L3 に侵入 |
| Anthropic | L1（Claude）+ L3（MCP）から上下に拡大 | trust/safety で L4 に近い価値提案 |
| Google | L6（Workspace/Search/Chrome）+ L0（Cloud）から中間層へ | Workspace 統合で L3 に侵入、ADK/A2A で L2-L4 をカバー |

### プロトコル層の収束

MCP（tool/context）と A2A（agent-to-agent）は競合より補完関係。2029 年に向けて **MCP + A2A + runtime-specific extensions** の多層構造になる可能性が高い。中立オーケストレータに追い風だが、単なるメッセージ中継では価値が残らない。


## ホワイトスペースの時間軸推移

### 2026〜2027: L3-L4 の交点を取る

| ホワイトスペース | 対応レイヤー | 内容 |
|---------------|------------|------|
| Permissioned Context Plane | L3（業務意味論） | 日本企業の SoR をまたぐ権限・監査・文書系統・業務オブジェクトの統合 |
| Policy-based Router / Control Plane | L4 | タスク・機密区分・承認要否に基づくマルチモデル routing + governance |
| Evals / Observability / Human Approval | L4 | trace・再現性・承認フロー・監査ログ・コスト配賦・fallback の一体化 |

### 2027〜2028: L5 の Vertical を深掘る

| ホワイトスペース | 対応レイヤー | 内容 |
|---------------|------------|------|
| MCP/A2A Bridge の Managed Layer | L3-L4 間 | 両規格をまたぐ identity/policy/trace の一貫した managed bridge |
| Vertical Workflow Execution | L5 | 1〜2 業界に絞った調達/監査/法務/品質/保守/コンプライアンスの深い実装 |

### 2028〜2029: Industry Operating Layer を構築する

| ホワイトスペース | 対応レイヤー | 内容 |
|---------------|------------|------|
| Industry Operating Layer | L5（発展形） | 業界ごとの業務オブジェクト・権限・承認・例外・SLA・KPI・履歴を持つ実行層 |

基盤モデルが入れ替わっても、front door が ChatGPT/Gemini/Claude に変わっても、この層は残る。プロトコルの半オープン化とマルチモデル化が進むほど強くなる。


## 2 軸フレーム: AI 供給スタック × 企業設計スタック

### 縦軸: AI 供給スタック（本レイヤー構造）

L0 Compute → L1 Models → L2 Agent Runtime → L3 Context/Identity → L4 Control Plane → L5 Workflow

### 横軸: 企業設計スタック

Task → Role → Team → Function → Company Operating Model → Capital Allocation / Management System

### 交点がホワイトスペース

狙うべきは AI 供給スタックのど真ん中ではなく、**2 軸の交点**:

- Role の再設計（AI とのタスク分担）
- Team の AI との共存設計
- Function の再構成
- 管理会計・承認・KPI・責任体系の変革

OpenAI / Anthropic / Google は日本企業ごとの**組織設計責任**まで持てない。ここが構造的なホワイトスペースである。
