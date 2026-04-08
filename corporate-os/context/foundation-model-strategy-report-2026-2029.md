# 基盤モデル戦略分析と AGIネイティブ変革会社への示唆 2026–2029

**初版:** 2026-03-08（39 Hard Signals）
**更新:** 2026-04-08（78 Hard Signals — R1〜R39 を再検証、R40〜R78 を追加）

## エグゼクティブサマリー

2026年4月時点で、AI基盤モデル市場は「三極構造の深化」と「新たな構造変動」が同時進行している。

**三極構造は維持されているが、質的に変化した。** OpenAI・Anthropic・Googleの3社は引き続き異なるレイヤーを制圧しに来ているが、2026年3月以降の1ヶ月間で以下の構造変動が発生した。

1. **Anthropicの爆発的成長**: ランレート収益$30B（前年比10倍）、Claude Codeだけで$2.5B。Anthropicは「安全・信頼のニッチプレーヤー」から「OpenAIに匹敵する規模のエンタープライズAI企業」に変貌した
2. **Claude Mythos Preview / Project Glasswing**: AI がゼロデイ脆弱性を自律的に数千件発見。AIセキュリティの地図を塗り替える可能性がある。一般非公開とする判断自体がAnthropicの「信頼」ポジションを強化
3. **資本の桁が変わった**: OpenAI $122B調達（$852B評価）、Anthropic $30B調達（$380B評価）。合計$150B超の資本投入は、L0〜L2での競争がもはや通常企業の参入可能領域ではないことを確定
4. **Meta・Microsoft・Amazonの攻勢**: 三極構造を「脅かす」までには至っていないが、Llama 4のMoE+マルチモーダル、MicrosoftのMAI自社モデル群、AmazonのNova 2+AgentCoreがエコシステムの複雑性を高めている
5. **プロトコル層の成熟**: MCP（月間SDK DL 9,700万）とA2A（Linux Foundation移管）が共に標準化フェーズに入った。マルチエージェント・マルチモデルの「配管」が整備されつつある
6. **日本市場の急速な立ち上がり**: 大企業の生成AI導入率85.1%、AIインフラ市場$5.5B超。もはや「検討段階」ではなく「実装競争」

この分析の主体は、AGI/ASI前提で会社組織・業務の未来を設計し、その変革を実現するコンサルティングを提供する会社であり、実装手段としてプロダクトやオペレーション開発を持つ。主戦場は日本の大企業。

**結論の更新:** 3月時点の結論「AGIネイティブ企業変革アーキテクト」は依然有効だが、2つの修正が必要。第一に、AnthropicのClaude Partner Network（$100M、Accenture/Deloitte/Cognizant/Infosys）とOpenAIのFrontier Alliance（BCG/McKinsey/Accenture/Capgemini）の両方がグローバルコンサルと結んだことで、**「汎用変革コンサル」との差別化は前回想定以上に緊急**である。第二に、Claude Mythos / Project Glasswingに代表されるAIセキュリティの急進展は、**セキュリティ・ガバナンス・リスク管理が単なる付帯機能ではなく、Control Planeの中核価値**になりつつあることを示唆する。


## 分析の前提

**対象期間:** 2026年〜2029年末

**見る市場:** 日本の大企業（エンタープライズ）

**分析の出口:** 事業領域の選定・ホワイトスペースの特定・Do/Don't の整理

**主体の類型:** AGI/ASI前提の企業変革会社（コンサルティングが本体、プロダクト・オペレーション開発は実装手段）

**分析対象の9戦場:** compute/energy、frontier capability、default distribution、enterprise control plane、developer protocol/SDK、data/context/identity、safety/compliance/public sector、pricing/packaging、vertical/geography

**エビデンス基準:** 公式発表・プレスリリース・製品リリース・API変更・決算情報・公式ブログを Hard Signal として認定。メディア報道は複数ソースで相互確認できたもののみ採用


## AI市場のレイヤー構造（更新）

7層の基本構造は維持する。2026年4月時点の主要変化を反映。

**L0 Compute / Cloud / Energy**
GPU・TPU・Trainium・DC・電力。OpenAIは$500B Stargate計画で2029年までに10GW。Anthropicは最大100万TPU規模のGoogle Cloud拡張とAWS Trainium共同開発。Alphabetは2026年CapEx $175〜185B見込み。**新規**: OpenAI $122B調達の大半がStargate・インフラに投入。Amazonは$250B Azure確約をOpenAIから獲得し、AWSはTrainium 2GW + AgentCoreでインフラ層の独自競争力を構築。この層の資本規模は2026年Q1のM&A総額$1.22T（うちAIインフラが主要ドライバー）が示す通り、独立プレーヤーの参入余地はゼロに等しい。

**L1 Foundation Models**
モデル性能の差は引き続き縮まるが、**新たな差別化軸が出現**した。Anthropicの Claude Mythos Preview はセキュリティ特化能力で突出し、「汎用ベンチマークでは計測できない質的差異」が存在しうることを示した。一方、推論コスト競争は激化。GPT-5.2は$1.75/$14、Gemini 3.1 Flashは$0.50/$3.00、DeepSeek V4（MoE 1T/37B active）は$0.20/$1.00水準。**全社が原価割れで推論を提供しており（R55）、このモデルは持続不可能**。OpenAIの2026年推定損失$14Bが示す通り、IPO・追加資金調達が止まれば価格正常化が起こる。

**L2 Agent Runtime**
3社の侵攻正面に加え、AmazonのBedrock AgentCoreとNova Actが参入。エージェントの状態管理・ツール呼び出し・ブラウザ操作・マルチエージェント協調の標準化が進む。**新規**: xAIもGrok 4.20 Betaでマルチエージェント機能を投入。OpenAI Agents SDK、Google ADK/A2A、Anthropic MCP + Claude Codeの三つ巴に、AWS AgentCoreとxAIが加わり五つ巴。

**L3 Context / Data / Identity / Tool Access**
OpenAIのcompany knowledge+MCPコネクタ（Box, Notion, Linear, Dropbox等追加）、AnthropicのMCP GA（Web search tool + programmatic tool calling）、GoogleのWorkspace深度統合が進行。**新規**: Anthropicのpersistent memory（全ユーザー開放、無料ティア含む）はcontext蓄積を個人レベルにまで拡張。MCPの月間SDK DL 9,700万はこの層のde facto standardとしての地位を確立しつつある。

**L4 Control Plane**
依然として独立プレーヤーの耐久性が最も高い層。ただし、**OpenAI FrontierのEnterprise展開（HP, Intuit, Oracle, State Farm, Thermo Fisher, Uber等が初期顧客）とAnthropicのClaude Partner Network（Accenture, Deloitte, Cognizant, Infosys）がこの層への上からのアプローチを開始**。「モデル提供者がcontrol planeまで垂直統合する」シナリオの確率が上がった。ただし、マルチモデル運用のニーズは消えておらず、中立control planeの価値は残る。

**L5 Workflow / Vertical Execution**
AnthropicのCowork（Claude Codeの業務横展開、11のオープンソースプラグインで営業・法務・財務等に特化）が注目。OpenAI FrontierもVertical展開を加速。ただし日本企業固有の業務設計・承認責任・帳票・例外処理は依然として3社が簡単に取れない。**Anthropicの$200M PE投資によるenterprise浸透**は、L5での直接競合の前兆。

**L6 Default Distribution / Front Door**
ChatGPT 900M WAU、Gemini 750M MAU。配布面の優位は圧倒的。GoogleのWorkspace同梱（Business/EnterpriseにGemini+NotebookLM Plusを標準搭載）は配布面の再編を完了しつつある。

**結論（更新）:** 独立プレーヤーの耐久性が最も高いのは依然としてL4とL5。ただし、L4への上からの垂直統合圧力が3月時点より明確に強まった。L5の業務意味論に深く結びついたポジションの重要性が一層増した。


## エビデンス: 78 Hard Signals

### 既存シグナル（R1〜R39）の再検証

R1〜R39は2026年3月8日時点のシグナルであり、全て引き続き有効。以下のシグナルについて更新注記を付す。

- **R1（OpenAI Frontier発表）**: Frontier Alliance企業（BCG, McKinsey, Accenture, Capgemini）に加え、初期顧客としてHP, Intuit, Oracle, State Farm, Thermo Fisher, Uberが公開された（R40）。Enterprise売上は全体の40%超、2026年末にConsumerとのパリティを目指す
- **R5（MCP open standard）**: MCP月間SDK DL 9,700万に到達。Linux Foundation傘下のAAIF（AI Alliance Interop Foundation）に移管。全主要プレーヤーが採用（R48）
- **R10（Anthropic RSP 3.0）**: Claude Mythos Preview / Project Glasswing（R44）の文脈で、RSPの実効性が初めて大規模に検証された
- **R17（Google Workspace同梱）**: Gemini Enterprise MAU 750Mに到達。API開発者2.4M（118%成長）、月間APIリクエスト850億（142%成長）（R46）

### 新規シグナル（R40〜R78）

**OpenAI**

- **R40**: GPT-5.4リリース（2026年3月5日）。推論・コーディング・エージェント能力を統合した単一モデル。GPT-5.1は3月11日に非推奨化。リリースサイクルの加速を示す
- **R41**: OpenAI $122B調達（2026年3月31日）。ポストマネー評価額$852B。IPO目標$1T。調達の大半はStargateインフラに投入
- **R42**: ChatGPT WAU 900M超。Enterprise顧客100万社、有料ビジネス顧客900万以上。年間収益ランレート$25B（月$2B超）
- **R43**: ChatGPTにBox, Notion, Linear, Dropbox等のアプリ統合を追加。company knowledge + MCPコネクタの拡張でL3侵攻を加速
- **R44**: OpenAI日本市場攻略継続。Japan Economic Blueprint、data residency対応。米国外最大のcorporate API customer市場として位置づけ不変

**Anthropic**

- **R45**: Claude Mythos Preview発表（2026年4月7日）。セキュリティ能力で全AIモデルを大幅に上回る。全主要OS・ブラウザでゼロデイ脆弱性を数千件自律発見。FreeBSDの17年間未発見のRCE脆弱性（CVE-2026-4747）を発見から攻撃まで完全自律で実行
- **R46**: Project Glasswing発表（2026年4月7日）。Claude Mythosの防御的セキュリティ利用をAWS, Apple, Broadcom, Cisco, CrowdStrike, Google, JPMorganChase, Microsoft, Nvidia + 約40組織に限定提供。一般公開は行わない方針。「危険すぎるから公開しない」という判断自体がAnthropicの信頼ポジションを強化
- **R47**: Anthropic Series G $30B調達（2026年2月）。ポストマネー評価額$380B。Claude Codeだけで年間ランレート$2.5B
- **R48**: Anthropic全体のランレート収益$30B突破。前年比10倍成長（OpenAIの3.4倍成長を大きく上回る）。1,000社以上が年間$1M超をAnthropicに支出（2ヶ月前の500社から倍増）
- **R49**: Claude Partner Network発表（2026年3月）。$100Mの投資でAccenture, Deloitte, Cognizant, Infosysをアンカーパートナーに据え、エンタープライズClaude導入の実装支援・共同マーケティング体制を構築
- **R50**: Coworkローンチ（2026年1月）。Claude Codeのエンジニアリング能力をナレッジワーク全般に拡張。11のオープンソースプラグインで営業・法務・財務等の職種特化を実現
- **R51**: Claude Sonnet 4.6リリース。バランス型モデル、拡張思考、1Mコンテキスト。batch処理でmax_tokens 300Kに引き上げ
- **R52**: Web search tool、programmatic tool callingがGA。Persistent memoryを全ユーザー（無料ティア含む）に開放
- **R53**: Anthropic、ベンガルールオフィス開設。Infosysと戦略提携し、テレコム・金融・製造業でのClaude展開を推進
- **R54**: Anthropic、$200MのPEベンチャー投資を通じてClaude Enterpriseの浸透を計画

**Google / Gemini**

- **R55**: Gemini 3.1 Ultra発表。ネイティブマルチモーダル推論。Gemini 3.1 Flash-Liteは2.5倍高速で$0.25/M入力トークン
- **R56**: Gemma 4リリース。最も高性能なオープンモデルとして位置づけ。エージェント的ワークフロー向け設計
- **R57**: Gemini MAU 750M。API開発者2.4M（118%成長）。月間APIリクエスト850億（142%成長、2026年1月）
- **R58**: Google Workspace深度統合。Docs, Sheets, Slides, Driveへの直接統合。Google Marketing Platformにも展開
- **R59**: A2A（Agent2Agent）プロトコル v0.3リリース。50以上のテクノロジーパートナー（Atlassian, Box, Salesforce, SAP, ServiceNow等）。Linux Foundation移管済み。プロダクションレディ版は2026年内
- **R60**: Google Wiz買収がDOJ承認。セキュリティスタックの垂直統合を加速

**Meta / Llama**

- **R61**: Llama 4リリース。Scout（17B/16 experts MoE）、Maverick（17B/128 experts MoE）、Behemoth（288B、未リリース）。初のMoE + ネイティブマルチモーダルオープンモデル
- **R62**: GPT-4oとGemini 2.0 Flashを上回る性能。ただしBehemothは独自保持で一般非公開 — **Metaのオープンソース戦略に初めて明確な制限が発生**。ハイブリッドオープンソース戦略への転換を示唆
- **R63**: Meta、自律エージェントプラットフォームManusを$2Bで買収。$40B超のインフラコンソーシアム（Aligned Data Centers）を締結

**Microsoft**

- **R64**: MAI自社モデル群（Transcribe, Voice, Image）を開発。OpenAI依存の段階的低減を示す
- **R65**: AI売上目標$25B（FY2026末）。AI容量を前年比80%増。ただしOpenAIは$250B Azure確約、API独占は2030年まで継続

**Amazon / AWS**

- **R66**: Nova 2モデル群発表。8モデルを6ヶ月で投入。Nova Forge SDK（カスタマイズツール）、Nova Act（ブラウザ操作エージェント）
- **R67**: Bedrock AgentCore発表。エージェント構築のための本番グレードインフラ。Bedrock上に約100モデルを搭載
- **R68**: NVIDIA Nemotron 3 SuperをBedrock上で提供開始

**xAI**

- **R69**: Grok 5リリース（6Tパラメータ、2026年1月）。Grok 4.20 Betaでマルチエージェント機能を追加
- **R70**: Enterprise/Businessプラン発表。Oracle OCI上での提供を開始。API価格はOpenAI/Anthropicを大幅に下回る

**Apple**

- **R71**: On-deviceファースト戦略を維持。Siriのオーバーホールを進行（Gemini統合の報道あり、一次ソース未確認）
- **R72**: Pointable AI（知識検索）を買収。Apple IntelligenceをサードパーティAI開発者に開放

**プロトコル・エコシステム**

- **R73**: MCP月間SDK DL 9,700万。全主要プレーヤーが採用。AAIF（AI Alliance Interop Foundation）がLinux Foundation傘下でガバナンスを管理。2026年ロードマップ: エンタープライズ対応性・ガバナンス成熟
- **R74**: A2AプロトコルがLinux Foundation移管。50+パートナー。MCPと補完関係（MCP = ツール/コンテキスト、A2A = エージェント間通信）

**規制・政策**

- **R75**: EU AI Act 次期施行期限2026年8月2日。高リスクAIシステムの適合性評価義務が開始
- **R76**: 米国: Trump大統領令（2025年12月）でAI規制を緩和方向に。DOJ AI訴訟タスクフォースを設立
- **R77**: 日本: AI利活用促進法（ノンバインディング）。自主規制路線を維持。罰則なし

**市場構造**

- **R78**: 推論価格は全社が原価割れで提供中。OpenAI 2026年推定損失$14B。Anthropic・OpenAIともにIPO前の市場シェア獲得フェーズ。12〜24ヶ月以内に価格正常化の可能性。これはthin routerの収益モデルを直撃する


## 3社のハードシグナルと戦略分析（更新）

### OpenAI

**主要ハードシグナル（更新）**

2026年2月のFrontier発表に続き、3月にGPT-5.4をリリース、$122B調達を完了。Enterprise売上は全体の40%超。ChatGPT WAU 900Mで消費者接点を圧倒的に押さえつつ、Frontier AllianceでBCG・McKinsey・Accenture・Capgeminiを巻き込み、初期顧客としてHP, Intuit, Oracle, State Farm, Thermo Fisher, Uberを獲得。

company knowledge + MCPコネクタの拡張（Box, Notion, Linear, Dropbox追加）でL3侵攻を加速。AWS上でのFrontier展開と$250B Azure確約のデュアルクラウド戦略でインフラの選択肢を広げている。

日本市場ではdata residency対応・Japan Economic Blueprintを継続。米国外最大のcorporate API customer市場としての位置づけは不変。

**戦略の本質（2029仮説）: "intelligence operating system" — 維持**

ChatGPTをfront doorに、Frontierでenterprise processを動かし、company knowledge/connectorsでcontextを吸収し、Agents SDKで開発面も収束させる。$122B調達と$852B評価額は、この戦略を「計画」から「実行フェーズ」に移した。

**3月時点からの変化:** Frontier Allianceの具体的な顧客名が公開されたことで、「エンタープライズ攻略は本気」が確定。GPT-5.4のリリースサイクル短縮（5.1→5.4を約3ヶ月）はモデル開発ペースの加速を示す。

### Anthropic

**主要ハードシグナル（更新）**

最大のシグナルは2つ。**第一に、財務的爆発**: ランレート$30B（前年比10倍）、Series G $30B調達、$380B評価。Claude Code単体で$2.5B。1,000社以上が年間$1M超を支出。もはや「安全志向のニッチプレーヤー」ではなく、OpenAIに匹敵する規模のエンタープライズAI企業。

**第二に、Claude Mythos Preview / Project Glasswing**: 全主要OS・ブラウザでゼロデイ脆弱性を数千件自律発見。FreeBSDの17年間未発見のRCE脆弱性を発見から攻撃まで完全自律で実行。一般非公開とし、AWS・Apple・Microsoft・Google・Nvidia等約50組織に防御目的のみで限定提供。

Claude Partner Networkの$100M投資（Accenture, Deloitte, Cognizant, Infosys）はOpenAI Frontier Allianceへの直接対抗。Cowork（11プラグインで営業・法務・財務等に職種特化）はL5への本格進出。

**戦略の本質（2029仮説）: "trusted enterprise intelligence layer" → 更新: "trusted enterprise platform"**

3月時点の「trusted intelligence layer」仮説を修正する必要がある。Anthropicはもはや「インテリジェンス層」に留まらず、以下を同時に展開している:

- **Trust/Safety**: Mythos/Glasswingで「セキュリティ能力 × 責任ある公開姿勢」を体現
- **Enterprise Platform**: Claude Code/Coworkで開発者・ナレッジワーカーの双方を獲得
- **Channel**: Claude Partner Networkでグローバルコンサルの実装力を取り込み
- **Geographic**: ベンガルール開設、東京オフィス、Infosys提携でグローバル展開

「信頼されたエンタープライズプラットフォーム」への転換が正確な記述。OpenAIの"intelligence OS"に対して、Anthropicは"trusted enterprise platform"で対抗する構図。

**3月時点からの変化:** 最大の変化はスケール。ランレート$30Bは「ニッチ」ではない。Claude Partner Networkは「Claude導入支援」ビジネスに対する直接的な代替手段をAnthropic自身が提供し始めたことを意味する。自社事業への影響を再評価する必要がある。

### Google / Gemini

**主要ハードシグナル（更新）**

Gemini 3.1 Ultraをリリースし、ネイティブマルチモーダル推論でフロンティア性能を維持。Flash-Liteは$0.25/M入力トークンで価格破壊的ポジション。Gemma 4はオープンモデルとしてエージェント向け設計。

MAU 750M、API開発者2.4M（118%成長）、月間APIリクエスト850億は、Geminiが「存在感の薄いモデル」から「大規模利用されるプラットフォーム」に転換したことを示す。

A2A v0.3（50+パートナー、Linux Foundation移管）はMCPとの補完的なポジションを確立。Google Marketing Platformへの統合は広告・マーケティング領域での差別化。

Workspace深度統合（Docs, Sheets, Slides, Drive直接統合、Business/EnterpriseにGemini+NotebookLM Plus標準搭載）は配布面の再編を完了しつつある。

**戦略の本質（2029仮説）: "default AI fabric across existing surfaces" — 維持・強化**

Gemini MAU 750M + Workspace同梱 + Chrome統合 + Search AI Overviewsの組み合わせは、「default AI fabric」仮説をさらに強化。API開発者の爆発的成長はdeveloperプラットフォームとしての地位も構築しつつあることを示す。

**3月時点からの変化:** 量的シグナルが強化された（MAU・API利用の数字が公開）。Wiz買収DOJ承認によるセキュリティ垂直統合、Gemma 4によるオープンモデル攻勢が新要素。

### 3社以外のプレーヤー分析

**三極構造仮説の検証: 壊すプレーヤーはいるか？**

| プレーヤー | 3社への脅威度 | 根拠 |
|---|---|---|
| Meta/Llama | 中（L1のみ） | Llama 4 MoEはフロンティア級だが、Meta自身がプラットフォーム展開していない。Behemoth非公開はオープンソース純粋戦略からの後退。Manus買収（$2B）はエージェント層への進出を示すが、enterprise制圧の体制は不足 |
| Microsoft | 低〜中 | MAI自社モデルは「保険」であり、OpenAI依存からの段階的脱却。ただし2030年までのAPI独占契約があり、当面は共存。CopilotのEnterprise浸透がOpenAI Frontierとどう棲み分けるかが未決 |
| Amazon/AWS | 中 | Nova 2 + AgentCore + Bedrock（100モデル）はインフラ層の独立プレーヤーとして着実に強化。ただしモデル性能単体ではフロンティアに及ばず、「選択肢の豊富さ」と「自社インフラ統合」がバリュー |
| xAI | 低 | Grok 5（6T params）は注目を集めるが、enterprise向けの製品・チャネル・信頼性の蓄積が不足。X/Twitterエコシステムとの統合は特定用途に限定 |
| DeepSeek | 中（価格のみ） | V4（1T MoE/37B active）の推論効率は業界最高水準。価格面での下方圧力。ただし中国企業ゆえにregulated industriesでの採用障壁が高い |
| Apple | 低〜中（配布面） | on-deviceファースト戦略は独自路線。10億台以上のデバイス配布面は潜在的に最大だが、enterprise AI platformとしての展開はしていない |

**結論:** 三極構造を根本から壊すプレーヤーは現時点で存在しない。ただし、Metaのオープンモデル（Llama 4）とDeepSeekの価格破壊はL1の差別化を困難にし、AWSのインフラ層は三極の「下」を押さえる独立プレーヤーとして存在感を増している。三極構造は「崩壊」ではなく「複雑化」の方向に進んでいる。

### プロトコル層の見通し（更新）

MCPとA2Aの補完関係は3月時点の分析を維持する。新しい要素:

1. **MCPの事実上の標準化が確定**: 月間9,700万DL、全主要プレーヤーが採用、Linux Foundation傘下。もはや「Anthropicの規格」ではなく「業界標準」
2. **A2A v0.3**: 50+パートナー、プロダクションレディ版2026年内。エンタープライズ利用に耐える安定インターフェースが整備
3. **Gartner予測**: 2026年にエンタープライズアプリの40%がタスク特化AIエージェントを搭載（前年5%未満から急増）。ただし80%の企業がエージェント利用する中、システムレベルの相互運用性を達成するのは30%

**含意:** MCP/A2Aの標準化は「配管」の問題を解決しつつあるが、真の課題は配管の上に乗る**identity/policy/trace/eval/audit**である。protocol bridgeの単純な仲介よりも、**enterprise interop fabricとしてのcontrol plane**に価値がある。


## ホワイトスペース分析（更新）

### 2026〜2027: 最初に取るべき白地

**Permissioned Context Plane — 有効だが攻められている**

3月時点の分析は維持。ただし、OpenAIのcompany knowledge + MCPコネクタ拡張（R43）、AnthropicのPersistent Memory全ユーザー開放（R52）により、**汎用context layer部分の侵食速度が想定以上**。残る白地は、日本企業のsystem of recordをまたいだ権限・監査・文書系統・業務オブジェクトの束ね。ここは3社のグローバル展開では取れない。

**Policy-based Router / Control Plane — 有効だが圧力増**

マルチモデル運用のニーズは確認された（AWS Bedrock 100モデル、Google Model Garden 200+モデル）。ただし、OpenAI FrontierのEnterprise展開とAnthropicのClaude Partner Networkがcontrol plane方向に伸びていることで、**上からの垂直統合圧力が増した**。thin routerは不可。policy/eval/audit/cost/approvalを一体化した「厚い」control planeのみが耐久する。

**Evals / Observability / Human Approval — 有効・重要性増大**

Claude Mythos/Glasswingの出現で、AIセキュリティとガバナンスの重要性が劇的に上昇。「エージェントが自律的にゼロデイ脆弱性を発見・攻撃できる世界」では、**エージェントの行動のtrace・audit・承認制御は存亡にかかわる要件**となる。この白地は3月時点より一層硬くなった。

**新規白地: AI Agent Governance & Risk Management**

R45/R46（Claude Mythos/Glasswing）が示した「AIの能力がセキュリティを突破する」という現実は、新たなカテゴリーの白地を生んだ。エージェントの行動範囲制限・リスク評価・インシデント対応・保険/ライアビリティ設計は、3社自身が提供するインセンティブを持たない（自社モデルの制約をアピールする動機がない）。中立的な第三者によるガバナンスフレームワークに需要がある。

### 2027〜2028: 次に伸びる白地

**MCP/A2A Bridge の Managed Layer — 有効・タイミング前倒し**

MCP/A2Aの標準化が2026年内にプロダクションレディに到達する見込み（R59, R73）。bridgeの需要が2027年を待たず発生する可能性。ただし単純な仲介ではなく、identity/policy/traceを持つmanaged fabricとして。

**Vertical Workflow Execution — 有効・競争激化**

AnthropicのCowork 11プラグイン（R50）とOpenAI Frontierの業種特化展開が進行中。3社がL5に入ってくるスピードが想定以上に速い。**2027年を待たず、2026年中に1業界のdeep implementationを開始**しないと、3社の汎用展開に先行の余地を失う。

### 2028〜2029: 最後にmoatになる白地

**Industry Operating Layer — 有効・moatとしての重要性増大**

資本規模の桁が変わった（OpenAI $122B, Anthropic $30B, Q1 M&A $1.22T）中で、**技術的moatは持続しない**。残るmoatは「業界ごとの業務オブジェクト・権限・承認・例外・SLA・KPI・履歴」の蓄積。これは資本では買えない時間的蓄積である。

**新規白地: AI-native Management System**

2029年までに、AIエージェントが業務の大部分を自律実行する組織では、**人間が管理すべき対象が「人間の従業員」から「人間+AIエージェントの混成ワークフォース」に変わる**。AIエージェントのパフォーマンス評価・コスト配賦・リソース配分・障害復旧・倫理監査を統合する管理システムは、現在どの3社も提供していない。これは「企業設計会社」としてのmoatになりうる。


## AGIネイティブ変革会社としての戦略フレーム（更新）

### 事業の正確な定義 — 維持

AGIネイティブ企業変革会社（AI-native Enterprise Design Firm）。売るものはAGI/ASI前提での企業の未来設計と移行設計。これは変わらない。

### 事業の3層構造 — 維持

**Destination / Transition / Wedge** の3層は引き続き有効。

### 時間軸別の打ち手（更新）

**2026〜2027: 移行責任を売る — 維持・緊急度上昇**

Claude Partner Network（R49）とOpenAI Frontier Alliance（R1）が同時にグローバルコンサルを巻き込んだことで、**「移行責任」の市場にアクセンチュア・デロイト・マッキンゼー等が3社のモデルを抱えて参入してくる**。差別化は「特定モデルの導入支援」ではなく「マルチモデル前提の企業設計」にしかない。

追加の打ち手:
- AIエージェントガバナンスフレームワークの早期策定（R45/R46がドライバー）
- 1業界でのdeep implementation開始を2027年から2026年内に前倒し

**2027〜2028: 方式に上げる — 維持**

advisoryをrepeatable化。AI-native operating modelの標準テンプレート・業界別role map・human-agent handoffの標準・governance/eval/approvalの標準・module catalog。

追加の打ち手:
- AI agent管理のダッシュボード/ツール群をプロダクト化
- MCP/A2A interop fabricの運用実績を蓄積

**2028〜2029: 管理システムを握る — 維持・重要性増大**

「会社の管理システムそのものを握れるか」に価値が移る。AI workforceのポートフォリオ管理・role/budgetの再配分・function別自律度設計・人とagentの混成組織設計・経営会議レベルのAI governance。

追加の打ち手:
- AI-native Management Systemのプロダクト基盤を構築
- Industry Operating Layerを業界標準として確立


## Do / Don't 整理（更新）

### やるべきこと

事業定義を**「日本の大企業向けAGI/ASI時代の企業変革アーキテクト」**に置く。これは不変。

**5つの中核機能（更新）:**
1. Permissioned context graph（権限付きコンテキストグラフ）
2. Policy-based model/agent/tool routing
3. Evals / trace / cost / audit
4. Human approval / exception handling
5. 1〜2業界向けworkflow kits
6. **（追加）AI agent governance & risk management framework**

**2つの商流を持つ** — 不変:
- 上から: CXO向けのfuture org/transition design
- 下から: 特定業務・特定部門のモジュールから入り、company-wide redesignに接続

**新たに追加すべき打ち手:**
- **マルチモデル・マルチクラウドを前提とした設計**: Claude Partner NetworkとFrontier Allianceの両方と「非排他的に」連携できるポジション。特定モデルベンダーとの排他パートナーシップは危険
- **AIセキュリティガバナンス**: Mythos/Glasswingが示した「攻撃的AI能力」に対する防御設計をcontrol planeに統合。3社のセキュリティ機能を「使う」側として中立的な評価・運用を提供
- **推論コスト正常化への備え**: 全社原価割れ（R78）は12〜24ヶ月で正常化する。コスト前提が変わった場合のscenario planningを顧客に提供

### やらないべきこと（更新・追加）

既存のDon'tは全て維持。以下を追加。

**特定モデルベンダーの排他パートナーになること**
Claude Partner Network（R49）やFrontier Alliance（R1）への参加は選択肢だが、**排他契約は危険**。両方のエコシステムにアクセスできる中立的ポジションを維持する。AnthropicのPE投資（R54）による囲い込みにも注意。

**「AIセキュリティは3社がやるから大丈夫」と考えること**
Mythos/Glasswingは「3社の中でセキュリティ能力格差がある」ことを示した。企業にとって、特定モデルのセキュリティに依存するのではなく、**モデル非依存のセキュリティガバナンス**が必要。これを提供する側に立つ。

**推論コスト下落を前提とした事業設計**
現在の価格は全社原価割れ。12〜24ヶ月後の正常化で2〜3倍の価格上昇が起こりうる。「安い推論が前提」のビジネスモデルは危険。


## 日本市場の補足（更新）

日本は「すでにfrontier vendorsが本気で取りに来る市場」であり、かつ**「大企業が実装フェーズに入った市場」**である。

**定量的エビデンス:**
- 大企業（売上1兆円超）の生成AI導入率: 85.1%（R77から推定）
- 全企業平均の導入率: 33.9% → 大企業との51.2ポイントの格差
- AIインフラ市場: 2026年に$5.5B超（前年比18%成長）
- AI市場全体: 2024年1.34兆円 → 2029年4.19兆円（5年で3倍）
- エージェントAI採用率: 約52%の組織が何らかの形で導入済み

**規制環境:**
- AI利活用促進法（ノンバインディング）は、欧州AI Actのような拘束的規制ではなく、自主規制路線
- 罰則がないため、規制コンプライアンスは「チェックボックス」ではなく「自主的なガバナンス設計」が鍵
- これは**ガバナンス設計をコンサルティングとして提供する側にとって追い風**。「法的に最低限必要なこと」ではなく「経営として正しいこと」を提案できる

**3社の日本攻略:**
- OpenAI: 日本data residency完了、Japan Economic Blueprint、米国外最大のcorporate API market
- Anthropic: 東京オフィス開設、Japan AI Safety Institute連携、Bedrockでの日本リージョン対応
- Google: Gemini Enterprise日本展開、Workspace同梱による全面攻略
- **新規**: Anthropic Claude Partner Networkのアンカーパートナー（Accenture, Deloitte, Cognizant, Infosys）は全て日本法人を持つ。2026年後半に日本市場での「Claude導入支援」が本格化する公算が高い

**日本市場の含意:**
- 「海外勢がまだ来ていない」は完全に不成立
- 差別化は**業界深度・権限設計・業務実装・導入責任**に加え、**日本語での業務意味論の理解と帳票・承認フローの日本固有設計**
- グローバルコンサル（Accenture等）がClaude Partner Networkを通じて参入してくるため、**「コンサル × AI」だけでは差別化にならない**。「企業設計 × AI × 業界深度」の三位一体が必要


## レッドチーム: 仮説を壊す6問（更新）

**Q1: 「Googleが配布面を制したら、この事業は残るか」 — 維持**
Gemini MAU 750M + Workspace同梱で配布面は強化されたが、結論は同じ。裏側のenterprise policy/context/vertical workflowを握っていれば成立する。むしろWorkspace同梱の進展は「front doorの選択肢が増える → マルチモデルcontrol planeの需要が増す」という追い風。

**Q2: 「OpenAIがenterprise runtimeを握ったら、自社ポジションは中抜きされないか」 — 維持・圧力増**
Frontier Alliance（BCG/McKinsey等）と初期顧客（HP, Oracle等）は、OpenAIがL4/L5に進出する意図の明確な証拠。ただし、マルチモデル運用のニーズ（AWS Bedrock 100モデル等）は消えておらず、中立control planeの需要は残る。**リスクは「OpenAIの排他的パートナーに取り込まれる」こと**。

**Q3: 「AnthropicがTrust/Complianceの標準になったら、規制業種で負けないか」 — 更新・リスク上昇**
AnthropicはMythos/Glasswing（R45/R46）で「セキュリティ能力のfrontier」を握り、Claude Partner Network（R49）でグローバルコンサルの実装力を取り込んだ。**ランレート$30BのAnthropicは、もはや「ニッチな安全志向プレーヤー」ではなく、「信頼をブランドとするフルスケールエンタープライズプラットフォーム」**。Claude単体の導入支援ポジションはClaude Partner Networkと完全に競合する。**対処: Claude導入支援ではなく、Claudeを「含む」マルチモデルgovernance/control planeとして差別化**。

**Q4: 「オープンモデルと小型モデルで価格が崩れたら、粗利は保てるか」 — 更新・短期は大丈夫だが中期リスク**
Llama 4 MoE（R61）、Gemma 4（R56）、DeepSeek V4の登場でオープンモデルの品質は急上昇。ただし現時点ではregulated industries向けの品質・コンプライアンス要件を完全に満たしておらず、当面は安全。**中期リスクは「オープンモデル + 自社fine-tuning」で大企業が内製化を進め、外部のcontrol plane/workflow提供者の需要が減るシナリオ**。対処: 内製化支援自体を事業として取り込む。

**Q5（新規）: 「Claude Partner NetworkとFrontier Allianceがコンサル市場を食い尽くしたら、変革コンサルの需要は残るか」**
両ネットワークのアンカーパートナー（Accenture, Deloitte, McKinsey, BCG等）は「モデル導入支援」として参入する。ただし、彼らの提供価値は「モデルAの導入」であり、「モデルA/B/Cを横断した企業設計」ではない。**マルチモデル前提の企業設計・組織変革は、特定ベンダーのパートナーネットワーク内からは提供しにくい**。これが差別化の生命線。ただし、Accenture等が「マルチモデル対応」を謳い始めた場合は危険。

**Q6（新規）: 「AIエージェントの能力が急進展し、コンサル自体が自動化されたら、この事業は成り立つか」**
Claude Mythos（R45）の能力水準は、少なくともセキュリティ領域において人間の専門家を大幅に上回った。これが他領域（戦略立案、組織設計、業務設計）にも拡大すれば、変革コンサルの需要自体が消える可能性がある。**対処: 自社の提供価値を「知識の売り切り」ではなく「移行責任の引き受け」に置く**。知識はAIがコモディティ化するが、「責任を持って実行し、結果にコミットする」機能は最後まで人間組織に残る。


## 監視指標（更新）

以下のシグナルが変化した場合は戦略の再評価が必要である。

**既存指標（維持）:**
- OpenAI Frontierが日本大企業向けのvertical workflow執行まで踏み込む
- Anthropicが日本市場向けに業種特化製品を出す
- GoogleがWorkspace同梱をEnterprise AI control planeまで拡張する
- 国内大手SIerがAGI-native transformation firmとして本格参入する
- オープンモデルが規制業種のローカル展開で品質・コンプライアンス要件を満たす

**新規指標:**
- Claude Partner Networkのアンカーパートナー（Accenture, Deloitte等）が日本市場で「Claude導入支援」を本格展開する
- Anthropic/OpenAIの推論価格が正常化（2〜3倍上昇）し、エンタープライズのコスト計算が変わる
- Anthropic Mythos-classモデルが一般公開され、AIセキュリティの攻撃面が劇的に拡大する
- 日本政府がAI規制を拘束的（罰則付き）に転換する
- 大手日本企業がオープンモデル+自社fine-tuningで内製化に成功し、外部ベンダーへの支出を削減する
- AIエージェントが戦略立案・組織設計タスクで人間コンサルタントを実証的に上回る


## 最終結論（更新）

**正しいポジション定義 — 微修正:**
「日本の大企業向けAGI-native transformation firmであり、その実装手段としてEnterprise AI Control Plane（マルチモデル governance / AI agent risk management 含む）とIndustry Workflow Modulesを持つ会社」

**Robust bets（どのシナリオでも有効）:**
- AI供給スタック × 企業設計スタックの交点を取る
- Permissioned Context + Policy Routing + Evals/Audit + AI Agent Governanceを一体化したcontrol planeを持つ
- 1〜2業界に絞ってL5 vertical workflowを深く実装する（2026年内に開始）
- 上流transformation advisory + 実装楔の2本の商流を北極星でつなぐ
- 特定モデルベンダーに排他的に依存しない

**Conditional bets（特定条件で有効）:**
- MCP/A2A bridge managed layer（multi-model/multi-protocol化が加速した場合）
- Industry operating layerの早期構築（競合が参入する前に業界標準を握れた場合）
- AI agent governance frameworkのde facto standard化（Mythos-class能力の拡散が進んだ場合）

**No-Go（どのシナリオでも危険）:**
- 汎用社内チャット・汎用copilot
- 薄いconnector business / 単なるRAG
- 価格・レイテンシだけのthin router
- 楔が本丸につながっていないPoC受託の積み上げ
- 汎用AI戦略コンサルとして見えること
- 特定モデルベンダーの排他パートナーになること
- 推論コスト下落を前提とした事業設計
- AIセキュリティガバナンスを軽視すること
