# 基盤モデル3社戦略分析と AGIネイティブ変革会社への示唆 2026–2029

## エグゼクティブサマリー

OpenAI・Anthropic・Google/Geminiの3社は、2029年に向けてそれぞれ異なる制圧レイヤーを取りに来ている。OpenAIは「知能オペレーティングシステム」として企業の主要AIランタイムとエンドユーザー接点を同時制圧する。AnthropicはMCPと信頼性を軸にクラウド横断の企業向けインテリジェンスレイヤーを押さえる。GoogleはWorkspace・Search・Chrome・Cloudをまたぐ「デフォルトAIファブリック」として既存配布面を再編する。

この分析の主体は、AGI/ASI前提で会社組織・業務の未来を設計し、その変革を実現するコンサルティングを提供する会社であり、実装手段としてプロダクトやオペレーション開発を持つ。主戦場は日本の大企業。強みは業界知識と販売チャネルである。

この前提に立つと、取るべきポジションは**汎用エージェント基盤企業**ではなく、**AGIネイティブ企業変革アーキテクト**である。3社の侵攻正面を避け、「AI供給スタック × 企業設計スタックの交点」に陣地を構えることが、2029年に向けた正しい戦い方である。


## 分析の前提

**対象期間:** 2026年〜2029年末

**見る市場:** 日本の大企業（エンタープライズ）

**分析の出口:** 事業領域の選定・ホワイトスペースの特定・Do/Don't の整理

**主体の類型:** AGI/ASI前提の企業変革会社（コンサルティングが本体、プロダクト・オペレーション開発は実装手段）

**分析対象の9戦場:** compute/energy、frontier capability、default distribution、enterprise control plane、developer protocol/SDK、data/context/identity、safety/compliance/public sector、pricing/packaging、vertical/geography


## AI市場のレイヤー構造

今回の市場を7層で定義する。この構造が分析の共通地図になる。

**L0 Compute / Cloud / Energy**
GPU・TPU・Trainium・DC・電力。OpenAIはStargateで2029年までに10GW計画。Anthropicは最大100万TPU規模のGoogle Cloud拡張とAWS Trainium共同開発。Alphabetは2025年通期914億ドルCapEx・2026年は1,750〜1,850億ドル見込み。この資本戦に降りていくのは非合理である。

**L1 Foundation Models**
GPT・Claude・Gemini・Gemma・partner models。モデル性能の差は縮まり続け、単体での差別化は持続しない。

**L2 Agent Runtime**
エージェントの状態管理、実行、ツール呼び出し、メモリ、handoff。3社の侵攻正面。

**L3 Context / Data / Identity / Tool Access**
社内データ、権限、コネクタ、MCP、system of record接続。3社が取りに来ているが、業務意味論に深く結びついた部分は残る。

**L4 Control Plane**
モデル/エージェント/ツールのrouting・policy・evals・trace・audit・cost・approval。独立プレーヤーの耐久性が高い層。

**L5 Workflow / Vertical Execution**
調達、監査、法務、営業、保守、品質、安全、医療などの業務実行。業界固有の承認責任・帳票・例外処理は3社が簡単に取れない。

**L6 Default Distribution / Front Door**
ChatGPT・Gemini in Workspace/Search/Chrome・Claude.ai・Cloud console・既存業務ソフト。3社の既存配布面が強く、ここに正面から入る意味はない。

**結論:** 独立プレーヤーの耐久性が最も高いのはL4とL5、そして業務意味論に深く結びついたL3である。


## 3社のハードシグナルと戦略分析

### OpenAI

**主要ハードシグナル**

2026年2月に**Frontier**を発表。企業向けにshared context・onboarding・feedback・permissionsを持つエージェントプラットフォームを前面に出した。BCG・McKinsey・Accenture・CapgeminiをFrontier Allianceとして巻き込み、パイロットではなく本番導入チャネルを押さえに来ている。同月Amazon提携によりFrontierのAWS展開・Bedrock上のStateful Runtime Environment・Trainium 2GWを確保。

コンテキスト側にも進出。**company knowledge**で社内文脈をChatGPTに取り込み、**MCPアクセスコネクタ**をBusiness/Enterprise向けに拡大。API側もAgents SDK・Responses APIに収束させている。

日本については、**日本のdata residency**・**Japan Economic Blueprint**を発表。米国外最大のcorporate API customer市場として本格攻略中。

**戦略の本質（2029仮説）: "intelligence operating system"**

ChatGPTをfront doorに、Frontierでenterprise processを動かし、company knowledge/connectorsでcontextを吸収し、Responses API/Agents SDKで開発面も収束させる。AWSとの提携はAzure一辺倒からdistributionとinfraを広げるdefensive/offensive moveである。

「モデル企業」ではなく「知能プラットフォーム＋配布＋インフラ」を取りに行っている。

### Anthropic

**主要ハードシグナル**

最大のシグナルは**MCP（Model Context Protocol）**。open standardとして打ち出し、APIからremote MCP serversを直接扱えるようにしつつ、Claude をAnthropic API/Bedrock/Vertex AI/Azure AI Foundryの全方位で提供。クラウド横断の中立プレーヤーとして広がる戦略である。

安全・規制面では2026年2月に**RSP 3.0**を更新、1月に**Claude's constitution**を公開。東京オフィス開設と**Japan AI Safety Institute**との協力覚書を発表。日本の大企業・規制業種にとって「governance-first」な選択肢として認識されやすい。

Vertical進出も明確。**Claude for Life Sciences**・**Claude for Healthcare**・**Labs**による製品化加速。

**戦略の本質（2029仮説）: "trusted enterprise intelligence layer"**

consumer defaultではなく、trust/safety/interoperability/regulated adoptionを勝ち筋とする。MCPとクロスクラウド展開がその中心。日本の大企業向けでは有力なパートナー候補だが、自社vertical進出も進むため「Claude導入支援」だけでは薄い。

### Google / Gemini

**主要ハードシグナル**

**Gemini Enterprise**を「職場における Google AIの新しいfront door」と位置づけ。2025年1月以降、**Workspace Business/EnterpriseにGeminiとNotebookLM Plusを同梱**（追加課金のadd-onから既定機能へ移行）。**Gemini in Chrome**をWorkspaceユーザーに拡大、**SearchのAI OverviewsはGemini 3**が動作。

Cloud側では**ADK/A2A agent**をGemini Enterprise上で登録可能にし、**A2A**をMCP補完のopen protocolとして発表。**Interactions API**でserver-side state・background executionを提供。Vertex AIは200超のモデルを載せるModel Gardenとして機能し、Claude等のpartner modelsも受け入れている。

**戦略の本質（2029仮説）: "default AI fabric across existing surfaces"**

Gemini単体の勝負ではなく、Workspace・Search・Chrome・Cloudを束ねた「default AI fabric」を取りに行く。既存配布面をAIで再編するbundle戦略。採用障壁を下げながら囲い込む。

### プロトコル層の見通し

MCP（tool/context）とA2A（agent-to-agent）は競合より補完関係にある。OpenAIもMCP Appsに寄せ、GoogleもGoogle servicesのMCP supportを進めている。2029年に向けては「独自プロトコル一本勝負」より、**MCP + A2A + runtime-specific extensions**の多層構造になる可能性が高い。これは中立オーケストレータに追い風だが、価値が残るのは単なるメッセージ中継ではなく、**identity/policy/trace/eval/audit**を持つ場合だけである。


## ホワイトスペース分析

### 2026〜2027: 最初に取るべき白地

**Permissioned Context Plane**

単なるRAGでも、単なるコネクタ集合でもない。OpenAIのcompany knowledge・Google WorkspaceのContent Integration・AnthropicのMCPが汎用接続を飲み込み始めている。残るのは、**日本企業のsystem of recordをまたいで、権限・監査・文書系統・業務オブジェクトを正しく束ねる層**である。これはData/Context基盤と最も整合する。

**Policy-based Router / Control Plane**

タスク・機密区分・求める正確性・許容レイテンシ・データ所在地・承認要否・利用予算をもとに、model/agent/tool/cloudを切り替える層。OpenAIがAWSに出て、AnthropicがMajor Cloud全面展開し、GoogleがModel Gardenでpartner modelsを抱える以上、「マルチモデル現実を管理可能にする」方向に価値がある。これはModel Router/Orchestratorを進化させる本丸。

**Evals / Observability / Human Approval**

OpenAI Frontierはpermissions/boundariesを前提に設計され、GoogleはPrivate Registry・tool governanceを強化し、AnthropicはTrust/Safeguardsを前面に出している。企業が本当に買うのは「賢い返答」より「安全に動かせること」である。trace・再現性・承認フロー・監査ログ・コスト配賦・失敗時のfallbackを一体化したcontrol planeは、硬い白地である。

### 2027〜2028: 次に伸びる白地

**MCP/A2A Bridge の Managed Layer**

両規格をまたいでidentity/policy/traceを一貫させるmanaged bridge。agent platformというより**enterprise interop fabric**として機能する。

**Vertical Workflow Execution**

3社とも汎用面は広げるが、業界固有の承認責任・帳票・例外処理・KPI・現場運用までは簡単に取れない。業界知識と販売チャネルが生きるのはここである。2027〜2028年では、**1〜2業界に絞って、調達/監査/法務/品質/保守/コンプライアンスのような「行動を伴う業務」を深く実装する**のが正解である（L5を取る動き）。

### 2028〜2029: 最後にmoatになる白地

**Industry Operating Layer**

「社内データを読める」ではなく、**業界ごとの業務オブジェクト・権限・承認・例外・SLA・KPI・履歴**を持った実行層。基盤モデルが入れ替わっても、front doorがChatGPT/Gemini/Claudeに変わっても、この層は残る。プロトコルの半オープン化とmulti-model化が進むほど強くなる。


## AGIネイティブ変革会社としての戦略フレーム

### 事業の正確な定義

前提として、この会社の類型は**AGIネイティブ企業変革会社**（AI-native Enterprise Design Firm）である。

売るものは単なるAI導入でも単なるエージェント基盤でもない。

- AGI/ASI前提で会社組織はどう変わるべきか
- そのとき業務・権限・役割・評価・意思決定はどう再設計されるべきか
- そこへ移行するには何から着手すべきか

という**企業の未来設計と移行設計**である。

### 事業の3層構造

**Destination（目的地）**
AI-native companyの設計思想そのもの。AGI前提での組織・役割・管理会計の再設計。

**Transition（移行）**
その未来へ移るための移行アーキテクチャ・変革プログラム・意思決定支援。role decomposition・work graph・approval redesign・human-agent handoff・risk tiering・model/tool/data policy・導入順序設計を含む。ここはコンサルだけでもプロダクトだけでも成立しない領域であり、だからこそ白地になる。

**Wedge（楔）**
現実に入るためのモジュール型プロダクト・業務実装・運用設計。重要なのは、単なる効率化ツールではなく、**将来のoperating modelに資産が蓄積する楔**であること。

### 時間軸別の打ち手

**2026〜2027: 移行責任を売る**

「未来像」ではなく「移行責任」を売る。
- どの機能から変えるか
- どのroleを先にAI化するか
- どのガードレールで進めるか
- 何を内製し、何を外に任せるか

主力商品は**上流のtransformation advisory + 1つの実装楔**。

**2027〜2028: 方式に上げる**

advisoryをrepeatable化する。案件から方式へ。持つべきもの：AI-native operating modelの標準テンプレート・業界別role map・human-agent handoffの標準・governance/eval/approvalの標準・module catalog。この時期に「Transition OS」という形が見えてくる。

**2028〜2029: 管理システムを握る**

「実装支援」より「会社の管理システムそのものを握れるか」に価値が移る。AI workforceのポートフォリオ管理・role/budgetの再配分・function別自律度設計・人とagentの混成組織設計・経営会議レベルのAI governance。ここまで行くと「AI導入会社」ではなく「企業設計会社」になる。

### 2軸で見る分析フレーム

ホワイトスペースを正確に特定するために2軸で市場を見る。

**縦軸: AI供給スタック**
Compute/Cloud → Models → Agent Runtime → Context/Identity/Access → Control/Policy/Evals → Workflow Execution

**横軸: 企業設計スタック**
Task → Role → Team → Function → Company Operating Model → Capital Allocation/Management System

狙う白地はAI供給スタックのど真ん中ではなく、**AI供給スタック × 企業設計スタックの交点**である。roleの再設計・teamのAIとの共存・functionの再構成・管理会計/承認/KPI/責任体系の変革がここに当たる。OpenAI/Anthropic/Googleは、日本企業ごとの**組織設計責任**まで持てない。


## Do / Don't 整理

### やるべきこと

事業定義を**「日本の大企業向けAGI/ASI時代の企業変革アーキテクト」**に置く。

**5つの中核機能:**
1. Permissioned context graph（権限付きコンテキストグラフ）
2. Policy-based model/agent/tool routing
3. Evals / trace / cost / audit
4. Human approval / exception handling
5. 1〜2業界向けworkflow kits

**2つの商流を持つ:**
- 上から入る商流: CXO向けのfuture org/transition design
- 下から入る商流: 特定業務・特定部門のモジュールから入り、company-wide redesignに接続

この2本は同じ北極星につながっていなければならない。

### やらないべきこと

**汎用AI戦略コンサル**
OpenAIはFrontier Allianceで大手コンサルと結び、Googleもtransformation文脈でGemini Enterpriseを語っている。generic な「AI活用戦略」は最も圧縮されやすい。

**単なるエージェントプラットフォーム企業**
OpenAI/Google/Anthropicの延長線上に置かれる。

**汎用社内チャット / 汎用社内copilot**
ChatGPT Business/Enterprise・Claude Enterprise・Gemini in Workspace/Chromeが正面でぶつかる。

**横断的なno-code agent builder単体**
OpenAI Frontier・Gemini Enterprise + Workspace Studio・Anthropicのenterprise/productizationが同じ方向に伸びている。

**価格・レイテンシだけで勝負するthin router**
ModelGarden・クロスクラウド展開で内製・クラウド同梱圧縮が進む。

**単なるRAG / connector business**
OpenAIのcompany knowledge+MCPコネクタ・GoogleのWorkspace integration・AnthropicのMCPがすでに飲み込み始めている。権限・監査・業務意味論まで持つcontext planeにしないと残らない。

**楔が本丸につながっていないこと**
PoCや個別受託が増えても、将来のoperating model資産が蓄積しないなら危険。

**プロダクトの目的化**
プロダクトは「正しさの証明」と「変革を通す武器」であって、自己目的化すると戦場を誤る。


## 日本市場の補足

日本は白地市場ではなく、**すでにfrontier vendorsが本気で取りに来る市場**である。

- OpenAI: 日本data residency・Japan Economic Blueprint・米国外最大のcorporate API marketとして位置づけ
- Anthropic: 東京オフィス開設・Japan AI Safety Institute連携・Bedrockでの日本リージョン対応
- Google: Gemini Enterpriseの日本展開・Workspace同梱によるフルスタック攻略

したがって、日本で勝つためのthesisは「海外勢がまだ来ていないから」では成立しない。勝ち筋はあくまで**業界深度・権限設計・業務実装・導入責任**である。


## レッドチーム: 仮説を壊す4問

**「Googleが配布面を制したら、この事業は残るか」**
GoogleがWorkspace同梱でfront doorを取っても、**裏側のenterprise policy/context/vertical workflow**を握っていれば成立する。汎用社内アシスタントや薄いproductivity AIは壊れるが、業務意味論を持つcontrol planeは残る。

**「OpenAIがenterprise runtimeを握ったら、自社ポジションは中抜きされないか」**
汎用runtime・汎用社内チャット・薄いconnector businessは中抜きされる。OpenAIをone model/one runtime optionとして扱う上位control planeのポジションであれば成立する。

**「AnthropicがTrust/Complianceの標準になったら、規制業種で負けないか」**
Claude単体の導入支援ポジションだと薄くなる。Claude含む複数モデルを回すgovernance/context/control planeのポジションなら、Anthropicの台頭はむしろ追い風になる。

**「オープンモデルと小型モデルで価格が崩れたら、粗利は保てるか」**
業務意味論・権限設計・組織変革の責任を持つポジションは価格崩壊の影響を受けにくい。thin routerや汎用AI提案は直撃を受ける。


## 監視指標

以下のシグナルが変化した場合は戦略の再評価が必要である。

- OpenAI Frontierが日本大企業向けのvertical workflow執行まで踏み込む
- Anthropicが日本市場向けに業種特化製品を出す
- GoogleがWorkspace同梱をEnterprise AI control planeまで拡張する
- 国内大手SIerがAGI-native transformation firmとして本格参入する
- オープンモデルが規制業種のローカル展開で品質・コンプライアンス要件を満たす


## 最終結論

**正しいポジション定義:**
「日本の大企業向けAGI-native transformation firmであり、その実装手段としてEnterprise AI Control PlaneとWorkflow Modulesを持つ会社」

**Robust bets（どのシナリオでも有効）:**
- AI供給スタック × 企業設計スタックの交点を取る
- Permissioned Context + Policy Routing + Evals/Audit を一体化したcontrol planeを持つ
- 1〜2業界に絞ってL5 vertical workflowを深く実装する
- 上流transformation advisory + 実装楔の2本の商流を北極星でつなぐ

**Conditional bets（特定条件で有効）:**
- MCP/A2A bridge managed layer（multi-model/multi-protocol化が加速した場合）
- Industry operating layerの早期構築（競合が参入する前に業界標準を握れた場合）

**No-Go（どのシナリオでも危険）:**
- 汎用社内チャット・汎用copilot
- 薄いconnector business / 単なるRAG
- 価格・レイテンシだけのthin router
- 楔が本丸につながっていないPoC受託の積み上げ
- 汎用AI戦略コンサルとして見えること
