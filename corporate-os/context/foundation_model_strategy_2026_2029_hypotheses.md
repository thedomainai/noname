# 基盤モデルレイヤー 2026–2029 戦略仮説ドキュメント  
**対象:** OpenAI / Anthropic / Gemini（Google）  
**作成日:** 2026-03-08  
**用途:** このセッションを踏まえ、2029年12月までに基盤モデル3社がどんな戦略をもとに、何をし、どんな戦術で戦ってくるかの仮説を構築するための戦略文書。  
**前提:** 2026年3月時点の公開情報（できるだけ公式一次情報）を hard signal とし、その上に推論を積み上げる。

---

## 0. まず結論

このセッションで最も重要だった認識更新は、**「モデル比較」ではなく「誰がどのレイヤーを支配しようとしているか」** を見るべきだ、という点だった。  
そしてもう一つの重要な更新は、**こちら側の自分たちの正体** が単なる Agent基盤 / Data基盤 / Router ではなく、**AGI/ASI前提で企業組織と業務を再設計する transformation firm** だと再定義されたことだった。

この2つを合わせると、最終的な見取り図は次のようになる。

- **OpenAI** は、最も野心的に **「知能そのもののプラットフォーム化」** を進める可能性が高い。  
  つまり、モデル単体ではなく、`consumer surface + enterprise runtime + developer primitives + government/country channel + diversified compute + 多様な収益化` を一体で押さえにいく。  
  2029年時点の仮説は、**「新しい intelligence operating layer」** を取りに行く会社。

- **Anthropic** は、最も一貫して **「信頼できる enterprise cognition layer」** を狙う可能性が高い。  
  安全性、透明性、標準化、クラウド中立性、規制産業への入り方がきわめて整合的である。  
  2029年時点の仮説は、**「最も信頼される高価値・高リスク業務向けの思考基盤」** を取りに行く会社。

- **Google / Gemini** は、最も強く **「既に持っている巨大な配布面をAIで再編する」** 方向に進む可能性が高い。  
  Search、Workspace、Chrome、Android、Cloud、TPU を束ねて、Gemini を単体商品ではなく **default AI fabric** として押し込む。  
  2029年時点の仮説は、**「既存のデフォルトをAIネイティブなデフォルトへ置き換える会社」**。

この3社の戦いは、単純な「どのモデルが一番賢いか」ではなく、少なくとも以下の9つの戦場で同時進行する。

1. Compute / Energy  
2. Frontier capability  
3. Default distribution  
4. Enterprise runtime  
5. Context / Identity / Tool access  
6. Protocol / SDK / interoperability  
7. Safety / Compliance / Public sector  
8. Pricing / Packaging / Monetization  
9. Vertical solutions / industry templates

このため、**2029年に winner-take-all になる確率はそこまで高くない**。  
むしろ、**OpenAI が premium intelligence platform、Google が bundled default、Anthropic が trusted serious-work layer** という三極構造になる仮説の方が、現時点では説明力が高い。

---

## 1. このセッションで何が更新されたか

### 1.1 初期仮説
最初は、こちら側の立ち位置を次のように捉えていた。

- Agent基盤
- Data / Context基盤
- Model Router / Orchestrator

この枠組み自体は間違いではない。  
ただし、この定義だけだと **「どのレイヤーの何を売る会社なのか」** が技術寄りに寄りすぎる。

### 1.2 補正後の仮説
補足情報によって、こちら側の本来の事業は次のように再定義された。

- AGI/ASIを前提に、企業組織・業務・役割・意思決定・評価をどう作り変えるべきかを考える
- その未来を実現するためのコンサルティングを提供する
- ただし、現実の企業はトップダウンでは一気に変われないため、必要に応じてプロダクトやオペレーション改善のモジュールから入る
- つまり、**コンサルが本体 / プロダクトは楔（wedge）であり実装手段**

この更新によって、分析の見方が変わる。  
見るべきものは「AI供給スタック」だけではない。  
**AI供給スタック × 企業設計スタック** の交点で、どこに durable な価値が残るかを見なければならない。

### 1.3 この更新が意味すること
この補正後の立ち位置に立つと、こちらが本当に理解すべきものは次の問いになる。

- 基盤モデル3社は、企業のどのレイヤーまで上がってくるのか
- どこまでを標準化・同梱・バンドル・垂直統合してくるのか
- 逆に、どの部分は各企業固有の組織設計・権限設計・移行設計として残るのか
- そこに transformation firm として、どんな wedge と operating system を作るべきか

このため、本ドキュメントの主眼は、**3社の未来予測そのもの** だけではなく、**その予測がどこに構造的な白地を生むか** まで含む。

---

## 2. 分析フレーム

## 2.1 エビデンスの優先順位
この文書では、予測を感覚論にしないため、以下の順に重みづけしている。

1. 公式発表・公式ドキュメント  
2. 決算 / 10-K / 料金 / リリースノート  
3. 安全性・規制・政策文書  
4. 主要パートナー発表  
5. それらから導く推論

特に重視する hard signal は次の種類。

- 新製品 / 新API / 新ランタイム
- バンドルや同梱の変更
- クラウド / インフラ / 電力 / データセンター投資
- 標準化・プロトコル・SDK
- データレジデンシー・規制対応・政府向け展開
- 料金体系・収益化方針
- SI / コンサル / クラウドとのチャネル構築

### 2.2 AI供給スタック（縦軸）
| Layer | 何を意味するか |
|---|---|
| L0 | Compute / Cloud / Energy |
| L1 | Foundation Models |
| L2 | Agent Runtime（状態管理、長期実行、ツール実行） |
| L3 | Context / Data / Identity / Tool Access |
| L4 | Control Plane（Routing, Policy, Evals, Trace, Audit） |
| L5 | Workflow / Vertical Execution |
| L6 | Default Distribution / Front Door |

### 2.3 企業設計スタック（横軸）
- Task
- Role
- Team
- Function
- Company operating model
- Capital allocation / Management system

### 2.4 今回の鍵となる洞察
基盤モデル企業の戦争は L0〜L6 の縦方向だけではない。  
本当に重要なのは、**それらが Task / Role / Team / Function にどう食い込んでくるか** である。

たとえば、

- company knowledge は単なる RAG ではなく、**誰が何にアクセスできるか** を変える
- Frontier や Gemini Enterprise は単なる agent builder ではなく、**誰がどこまで委譲してよいか** を変える
- MCP / A2A は単なる接続規格ではなく、**複数エージェントと人間の役割分解の単位** を変える

したがって、こちらが見るべき white space は、  
**「技術の間」ではなく「技術と企業設計の間」** にある。

---

## 3. 2026年3月時点の hard signals

## 3.1 OpenAI

### 事実
- OpenAI は 2026年2月に **Frontier** を発表し、enterprise 向けに「AI agents を build / deploy / manage する platform」として打ち出した。[R1]
- その直後に **Frontier Alliances** を発表し、BCG、McKinsey、Accenture、Capgemini を導入パートナーとして前面に出した。[R2]
- ChatGPT Business / Enterprise / Edu 向けに **company knowledge** を発表し、社内アプリの文脈を ChatGPT に集約する方向に進んだ。[R3]
- Enterprise / Edu のリリースノートでは、**custom MCP connectors** が company knowledge に入ってきている。[R4]
- OpenAI は Amazon と戦略提携し、**Frontier の AWS 展開** と **Amazon Bedrock 上の Stateful Runtime Environment**、さらに **2GW の Trainium capacity** を打ち出した。[R5]
- 開発者向けには、Apps SDK が **MCP** ベースで ChatGPT と接続され、2026年2月には **ChatGPT が MCP Apps spec と fully compatible** になった。[R6][R7]
- API 側では Responses API が agentic primitives の中心となり、Assistants API からの移行が推奨されている。[R8]
- インフラ面では Stargate で **2029年までに10GW** を目標にしている。[R9]
- 公共領域では **OpenAI for Government** を立ち上げている。[R10]
- 日本向けには **Japan Economic Blueprint** を出し、enterprise AI report では、日本が米国外で最大の corporate API customer 市場だと述べている。[R11][R12]
- OpenAI の CFO は 2026年1月の文章で、サブスク、API、free tier の ad/commerce、将来的な outcome-based pricing や licensing を含む、**「value of intelligence に応じて拡張する business model」** を明示している。[R13]

### ここから読めること
OpenAI はもう「モデル会社」ではない。  
**研究会社 → API会社 → ChatGPT会社 → enterprise runtime会社 → country/government channel を持つ intelligence company** に変わりつつある。

重要なのは、OpenAI が同時に以下をやっている点である。

- end-user surface を持つ（ChatGPT / Codex）
- enterprise runtime を持つ（Frontier）
- context を取りに行く（company knowledge / connectors）
- developer primitives を統合する（Responses API / Apps SDK）
- SI / consulting channel を構築する（Frontier Alliances）
- cloud / compute の single dependency を減らす（AWS + Stargate）
- monetization を多層化する（subscription / API / ad / commerce / licensing）

これは、2029年に向けた OpenAI の戦略が、**「世界最高のモデルを作る」だけではなく「知能の経済を制御する」方向** にあることを示唆する。

---

## 3.2 Anthropic

### 事実
- Anthropic は 2025年12月、**MCP を Linux Foundation 傘下の Agentic AI Foundation に寄贈** した。共同創設には OpenAI も関わり、Google / Microsoft / AWS も支援している。[R14]
- Anthropic は 2026年2月に **Responsible Scaling Policy v3.0** を公開し、Frontier Safety Roadmaps と Risk Reports を含む形に進化させた。[R15]
- Anthropic は 2025年10月、**最大100万TPU までの Google Cloud 拡張** を発表した。[R16]
- 2026年2月の資金調達発表では、Claude は **AWS Bedrock / Google Vertex AI / Microsoft Azure Foundry の3大クラウドすべてで利用可能** であり、かつ **AWS Trainium / Google TPU / NVIDIA GPU** を組み合わせていると述べている。[R17]
- Anthropic は **Claude for Life Sciences**、続いて **Claude for Healthcare** を展開し、規制領域向けの垂直化を進めている。[R18][R19]
- 2025年10月には **東京オフィス開設** と **Japan AI Safety Institute との協力覚書** を発表した。[R20]
- 2026年1月には **Anthropic Labs** を発表し、製品化と体験設計の強化を進めている。[R21]
- Anthropic のドキュメントでも、Claude は Bedrock / Vertex / Foundry などを前提に enterprise deployment を組めるようになっている。[R22][R23]

### ここから読めること
Anthropic の動きは非常に一貫している。  
その一貫性は、**「trust / safety / standards / cloud neutrality」** の4語で要約できる。

Anthropic は、Google や OpenAI のように自前の巨大 end-user distribution を持つ会社ではない。  
その代わりに、次の形で勝ち筋を作っている。

- **安全性・透明性** を enterprise feature に変える
- **MCP** を業界標準側へ寄せる
- **3大クラウド全部で買える** ことで procurement friction を減らす
- **規制産業**（life sciences, healthcare など）から高単価案件を取りに行く
- 自前 distribution が弱いぶん、**埋め込み先の選択肢の広さ** を武器にする

したがって Anthropic の本質は、  
**「最も neutral で、最も serious work に向く frontier lab」**  
としての地位を狙っている点にある。

---

## 3.3 Google / Gemini

### 事実
- Google は 2025年10月、**Gemini Enterprise** を「the new front door for Google AI in your workplace」として発表した。[R24]
- Google Workspace 側では 2025年1月から **Gemini と NotebookLM Plus を Business / Enterprise プランへ同梱** し、add-on から default inclusion へ移している。[R25][R26]
- **Gemini in Chrome** は enterprise policy で制御可能な形で提供され、ページ文脈も活用できる。[R27]
- Gemini アプリは **Workspace apps** と接続され、Gmail / Drive / Calendar / Keep / Tasks などの文脈を横断利用できるようになっている。[R28]
- Search 側では 2026年1月、**AI Overviews が Gemini 3 を利用** するようになった。[R29]
- Vertex AI は **200超のモデル** を抱える open platform であり、Google モデルだけでなく partner / open models も扱う。[R30]
- ADK は Google の agent framework だが、公式に **model-agnostic / deployment-agnostic** を掲げている。[R31]
- Google は **A2A** を発表し、MCP を補完する open protocol として位置づけた。[R32]
- 2025年12月には **Interactions API** を発表し、background execution を含む server-side interaction model を提供している。[R33]
- Google / Google Cloud は公式の **remote MCP servers** と **Developer Knowledge API + MCP Server** を拡充している。[R34][R35]
- Google は **Universal Commerce Protocol (UCP)** を打ち出し、AI interactions から commerce へ接続する標準化にも着手している。[R36]
- Alphabet は 2026年の CapEx 見通しとして **175B–185Bドル** を示し、10-K でも technical infrastructure への大幅投資継続を述べている。[R37][R38]
- 2025年Q3時点の Sundar Pichai の remarks では、Gemini Enterprise の packaged agents の adoption が進み、**700社で200万 subscriber 超** と述べている。[R39]

### ここから読めること
Google は「Gemini 単体で勝つ」よりも、**既存の巨大 distribution surface を AI で再統合する** 戦略を取っている可能性が高い。

これを構成する要素は明確である。

- Search に入れる
- Workspace に同梱する
- Chrome に入れる
- Cloud では Vertex AI を open platform にして developer を逃がさない
- A2A / MCP / ADK で protocol と orchestration も押さえる
- UCP で commerce への収益接続も試す
- TPU / data center / infra への莫大な先行投資を続ける

つまり Google の勝負は、**「AIが必要なら結局Googleの surface と infra を通る」状態を作れるか** である。

---

## 4. 本当の戦場はどこか

このセッションを通じて、基盤モデルレイヤーの戦争は、次の9戦場で見るのが最も説明力が高いと整理できた。

## 4.1 Compute / Energy
- 誰が十分な compute を確保できるか
- 誰が電力・データセンター・地域要件をさばけるか
- 誰が cost curve を下げつつ capacity を増やせるか

**所感:**  
Google が最も統合度の高い infra を持つ。  
OpenAI は最も aggressive に外部資本・外部パートナーを動員して capacity を取りにいく。  
Anthropic は最も機動的に multi-chip / multi-cloud で最適化している。

## 4.2 Frontier capability
- ベンチマークではなく、実務での reasoning / coding / multimodal / tool use / long-horizon execution の総合力
- ただし、これは戦場の一部でしかない

**所感:**  
3社ともここに投資するが、2029年までの差は読み切れない。  
重要なのは、**能力差がそのまま利益差にならない** こと。

## 4.3 Default distribution
- 誰が end-user の daily workflow に一番自然に入るか
- OS / browser / search / workspace / standalone AI app のどこを持つか

**所感:**  
Google が breadth で最強。  
OpenAI が “AIそのもの” のブランドで最も強い。  
Anthropic は direct distribution が最も弱い。

## 4.4 Enterprise runtime
- 企業が本番運用する agent / workflow の実行基盤を誰が握るか
- state, memory, tool execution, orchestration, permissions, handoff, monitoring を誰が持つか

**所感:**  
OpenAI は Frontier と Responses / Apps で積極的。  
Google は Gemini Enterprise + Vertex / Interactions API で追う。  
Anthropic は自前支配より、neutral embedded position を狙う形に見える。

## 4.5 Context / Identity / Tool access
- company knowledge
- connectors
- MCP
- workspace / documents / browser / tickets / code / CRM / ERP への接続
- 誰が permission model まで押さえるか

**所感:**  
3社とも猛烈に上がってきている。  
したがって、**thin RAG / thin connector business は圧縮されやすい**。

## 4.6 Protocol / SDK / Interoperability
- MCP
- A2A
- Apps SDK / MCP Apps
- ADK
- 各社の agent SDK / runtime SDK

**所感:**  
プロトコル層は single-standard ではなく、  
**MCP（tool/context） + A2A（agent-to-agent） + runtime-specific UI/UX**  
という多層構造に進む可能性が高い。  
これにより、**単なる中継ではなく identity / policy / trace / audit を握る層** の価値が増す。

## 4.7 Safety / Compliance / Public sector
- 誰が regulated industries に入れるか
- 誰が data residency, governance, risk reporting, auditability を整えるか
- 誰が government / sovereign AI に食い込むか

**所感:**  
Anthropic が trust signaling で最も強い。  
OpenAI は government / countries で aggressive。  
Google は既存 enterprise compliance と public cloud の強みがある。

## 4.8 Pricing / Packaging / Monetization
- 同梱するのか
- usage-based にするのか
- premium subscription なのか
- ad / commerce / outcome-based まで行くのか

**所感:**  
Google はバンドル。  
OpenAI は最も多様な monetization を試す。  
Anthropic は premium / cloud-driven / enterprise-driven が中心になる可能性が高い。

## 4.9 Vertical solutions
- healthcare
- life sciences
- government
- customer service
- software engineering
- commerce
- そのほかの high-value domains

**所感:**  
2029年に利益が残るのは、単なる基盤提供だけではなく、**verticalized intelligence** になる可能性が高い。  
Anthropic は regulated vertical に強く、OpenAI は science / enterprise / government に広く、Google は horizontal breadth + commerce に向かう。

---

## 5. 3社の戦略仮説カード

---

## 5.1 OpenAI 戦略仮説

### 要約
**OpenAI は 2029年までに、「最も広い意味での intelligence company」になろうとしている**、というのが本仮説である。

モデルを売るだけではなく、

- ChatGPT / Codex で end-user surface を持ち
- Frontier で enterprise runtime を持ち
- company knowledge / MCP で context を持ち
- Responses API / Apps SDK で developer layer を持ち
- Government / Countries で public-sector channel を持ち
- Stargate / AWS / multi-provider で compute portfolio を持ち
- subscription / API / ads / commerce / outcome-based まで収益化を多層化する

この全体像は、**「知能のフルスタック企業」** を志向していると読むのが自然である。

### OpenAI が2026–2027にやること（高確度）
1. **Frontier を enterprise 本番基盤として浸透させる**  
   単なる demo agent ではなく、shared context、permissions、feedback loops を持つ本番基盤にする。[R1][R2]

2. **ChatGPT を社内文脈の front door に近づける**  
   company knowledge と MCP connectors を強化し、社内検索 / 要約 / 横断理解から action までつなぐ。[R3][R4]

3. **API を agentic primitive に統合する**  
   Responses API を中心に寄せ、tool use / remote MCP / multimodal / multi-turn agent loop を標準化していく。[R8]

4. **cloud dependence を分散する**  
   AWS / Bedrock / Trainium と Stargate で、単一プロバイダ依存を下げる。[R5][R9]

5. **government / country channel を拡大する**  
   OpenAI for Government のような public-sector GTM を強める。[R10]

### OpenAI が2027–2028にやること（中〜高確度）
1. **persistent agents / long-running workflows** の比重を上げる  
2. 社内ツール連携から一歩進み、**workflow completion** に近づく  
3. consultancies / SI / platform partners を使って enterprise adoption を industrialize する  
4. ChatGPT / Codex / enterprise surfaces 間の境界を薄くし、**UI と runtime を跨ぐ統合** を進める  
5. science / health / service / engineering など、結果価値が高い vertical に深く入る

### OpenAI が2028–2029にやること（中確度）
1. **consumer assistant と enterprise coworker の境界を薄くする**  
2. **free tier の commerce / ads** を本格的な収益柱に育てる可能性がある（ただし強い確度ではない）[R13]
3. enterprise では **outcome-based pricing / workflow-based pricing** を試す  
4. countries / sovereign deployments / regulated deployments の型をつくる  
5. ChatGPT を単なるアプリではなく、**知能の default interaction layer** にしようとする

### OpenAI の強み
- standalone AI brand の強さ
- consumer と developer の両面を持つ
- enterprise runtime へ上がる速度
- monetization の幅
- SI / consulting / government を巻き込む攻め方
- multi-provider compute portfolio への意思

### OpenAI の弱み
- 大企業から見ると vendor lock-in 懸念が強い
- cloud / partner と競合しやすい
- safety / neutrality では Anthropic より慎重に見られることがある
- default distribution は Google ほど既存面を持たない
- compute を他社より強く必要とする

### この仮説を反証するもの
以下が起きれば、この仮説は弱くなる。

- Frontier が enterprise standard にならず、単なる feature 群で終わる
- OpenAI が runtime ownership をやめ、中立 provider 的な立ち位置に寄る
- company knowledge / connectors が shallow integration にとどまる
- ad / commerce / licensing が収益の一部に留まり、subscription + API のままになる
- OpenAI が government / country で拡大せず、民間用途へ集中する

### OpenAI に関する判断
**高確度の核:**  
OpenAI は「最高性能モデルの会社」から「知能の総合プラットフォーム企業」へ進んでいる。  

**まだ不確かな点:**  
2029年時点で ad / commerce / vertical licensing がどこまで重要収益になるか。

---

## 5.2 Anthropic 戦略仮説

### 要約
**Anthropic は 2029年までに、「最も信頼される serious-work 向け cognition layer」になることを狙っている**、というのが本仮説である。

Anthropic の特徴は、distribution の弱さを、  
**trust / standards / cross-cloud availability / high-stakes verticals**  
で補っている点にある。

OpenAI や Google のように「すべてを自分で持つ」よりも、Anthropic はむしろ  
**「どこにでも入れるが、特に重要業務で選ばれる」**  
ポジションを狙っているように見える。

### Anthropic が2026–2027にやること（高確度）
1. **MCP の標準化側の中心に立ち続ける**  
   プロトコルを自社だけの囲い込み手段ではなく、業界の共通基盤に寄せる。[R14]

2. **安全性を commercial feature に変える**  
   RSP v3、Risk Reports、Safety Roadmaps のような枠組みを enterprise procurement に耐える武器へ変換する。[R15]

3. **cloud-neutral procurement を強める**  
   AWS / GCP / Azure の全方位 availability を生かし、「Claude を使いたいがクラウド縛りは避けたい」企業に入る。[R17][R22][R23]

4. **regulated verticals を開拓する**  
   healthcare / life sciences を足がかりに、規制・精度・監査が重い領域で実績を作る。[R18][R19]

5. **日本やアジアで trust channel を作る**  
   東京拠点と JAISI 連携のような安全性・制度寄りの関係を強める。[R20]

### Anthropic が2027–2028にやること（中〜高確度）
1. **industry-specific agent skills / evals / governance patterns** を整備する  
2. Labs を通じて productization の速度を上げる  
3. regulated enterprise における “safe default choice” を狙う  
4. developer / enterprise に対し、Claude を neutral stack の中核に置く  
5. 「MCPを使えば Claude でなくてもよい」という逆風に対して、**MCPの上で最も信頼できるモデル** という地位を固める

### Anthropic が2028–2029にやること（中確度）
1. **多くの enterprise control plane の中の preferred model** になる  
2. direct distribution より、**high-value embed rate** を取りにいく  
3. 安全性や監査の証明能力を活かし、公共・医療・研究・金融などに深く入る  
4. 「noisy mass consumer app」よりも、「mission-critical knowledge work」での定着を狙い続ける可能性が高い

### Anthropic の強み
- trust / safety / governance の明快さ
- MCP という標準化の主導権
- 3大クラウド横断の neutrality
- serious work / reasoning / coding の強い評判
- regulated vertical に入りやすい語り口

### Anthropic の弱み
- direct distribution が弱い
- Google や OpenAI のような massive bundle power がない
- consumer breadth で scale しづらい
- standard 化が進むほど、MCP 単独では差別化にならない
- 資本戦では hyperscaler や OpenAI ほど自由度が高くない

### この仮説を反証するもの
以下が起きれば、この仮説は弱くなる。

- Anthropic が MCP / open standard より closed stack を優先し始める
- cloud-neutrality を崩し、特定クラウドの実質専属になる
- consumer distribution に大きく舵を切り、mass-market bundle を狙い始める
- safety / governance が商業上の差別化にならず、単なるコスト中心になる
- regulated vertical で十分な traction を得られない

### Anthropic に関する判断
**高確度の核:**  
Anthropic は「最も信頼できる enterprise reasoning layer」を取りに行っている。  

**まだ不確かな点:**  
この戦略が 2029年時点で distribution disadvantage を埋めるほど大きな利益プールになるか。

---

## 5.3 Google / Gemini 戦略仮説

### 要約
**Google は 2029年までに、「Gemini を既存 Google surfaces 全体の default AI fabric にする」ことを狙っている**、というのが本仮説である。

Google の勝ち筋は、単体アプリとしての Gemini が最も愛されることではない。  
むしろ、

- Search
- Workspace
- Chrome
- Android
- Cloud / Vertex AI
- TPU / infra
- commerce / ads

を束ねて、**Gemini が “見えない既定値” になること** にある。

### Google が2026–2027にやること（高確度）
1. **Gemini を Workspace の既定機能にする**  
   すでに add-on から inclusion に移っており、座席単価ではなく bundle value で押し込む。[R25][R26]

2. **Gemini Enterprise を front door として浸透させる**  
   これは単なる chatbot ではなく、company data / tools / people を secure にまとめる hub として売られている。[R24]

3. **Search の AI transformation を進める**  
   AI Overviews / AI Mode を Gemini 3 系で強化し、検索の失陥ではなく検索の再発明として進める。[R29]

4. **Chrome を AI-native browser にする**  
   Gemini in Chrome によって、ブラウザそのものを作業面の一部にする。[R27]

5. **Cloud では open platform を維持する**  
   Vertex AI を multi-model 化し、ADK / A2A / MCP support で developer を囲い込む。[R30][R31][R32][R34][R35]

### Google が2027–2028にやること（中〜高確度）
1. **multi-agent workflow** を Workspace / Cloud / Chrome の間で深く結ぶ  
2. packaged enterprise agents を増やす  
3. A2A と MCP の両方を使える ecosystem を整え、Google infra 上で heterogeneous agents を動かしやすくする  
4. AI Overviews / AI Mode を収益化と両立させる  
5. security / admin / compliance を武器に大企業管理部門を押さえる

### Google が2028–2029にやること（中確度）
1. **Gemini を invisible default** に近づける  
   人は「Gemini を使っている」と強く意識せず、Search / Chrome / Workspace / Android の中で結果的に Gemini を使うようになる。

2. **Vertex AI を“最も現実的な multi-model / multi-agent cloud”にする**  
   Gemini だけでなく他社モデルも扱いながら、結局 orchestration / security / identity / billing は Google 側に残す。

3. **AI x commerce の収益導線** を育てる  
   UCP のような取り組みが本格化すれば、agentic commerce を Google ecosystem の新しい導線にする可能性がある。[R36]

### Google の強み
- 圧倒的 distribution
- Search / Workspace / Chrome / Android の面の広さ
- Cloud / admin / security / compliance 基盤
- 200超モデルの open platform
- TPU / infra / CapEx の規模
- “good enough + bundled” で勝てる可能性

### Google の弱み
- antitrust / regulation の制約
- Search / ads を自ら壊す難しさ
- frontier brand / developer love では OpenAI に見劣りする場面がある
- “default だが best とは限らない” という評価が残る可能性
- enterprise から見ると Google を control plane の owner にしたくないケースがある

### この仮説を反証するもの
以下が起きれば、この仮説は弱くなる。

- Gemini inclusion が縮小し、再び add-on 的ポジションに戻る
- Vertex AI が partner/open models を縮小し、closed stack に寄る
- Search の AI 統合が monetization / UX 両面で難航する
- Chrome / Workspace / Android での AI integration が企業利用で十分伸びない
- antitrust により bundle / distribution の自由度が大きく削られる

### Google に関する判断
**高確度の核:**  
Google は Gemini を “単体AI商品” より “既存のデフォルトをAI化する布地” として使っている。  

**まだ不確かな点:**  
AI Overviews / AI Mode / UCP のような新収益導線が 2029年までにどこまで大きくなるか。

---

## 6. 三極構造の仮説

このセッションで最も大きな整理は、**2029年の市場は single winner ではなく、三極分化しやすい** という点である。

### 6.1 OpenAI が勝ちやすい領域
- premium standalone AI experience
- frontier developer mindshare
- end-user app と enterprise runtime をまたぐ統合
- government / country / science のような「国家級・社会級」の narrative
- outcome-based / intelligence-based monetization

### 6.2 Anthropic が勝ちやすい領域
- trust が購買理由になる high-stakes enterprise
- regulated industries
- cloud-neutral deployment
- protocols / standards を重視する enterprise stack
- “best model” ではなく “safest serious choice” が欲しい場面

### 6.3 Google が勝ちやすい領域
- bundled enterprise seat expansion
- existing workflows への frictionless AI adoption
- Search / browser / workspace / mobile に埋め込まれる daily use
- Cloud-native orchestration at scale
- multi-model だが Google infra 中心、という世界

### 6.4 なぜ winner-take-all になりにくいのか
1. **利益プールが違う**  
   Consumer, enterprise, public sector, developer, commerce で勝ち方が異なる。

2. **配布面が違う**  
   OpenAI は standalone AI app、Google は existing surface、Anthropic は embed/partner。

3. **調達要件が違う**  
   一部の企業は best model を買い、一部は trusted model を買い、一部は bundled default を使う。

4. **プロトコルが semi-open 化している**  
   MCP / A2A / ADK / Apps SDK の世界では、完全封鎖型の lock-in だけでは勝ち切れない。

5. **能力そのものが commoditize し得る**  
   推論・コード・マルチモーダルが一定以上に普及すると、差は distribution, context, control, workflow に移る。

---

## 7. 2029年シナリオ

ここでは 2軸でシナリオを置く。

- 横軸: **市場構造**  
  `単一デフォルト集中` ←→ `マルチモデル / マルチエージェント常態化`

- 縦軸: **供給環境**  
  `compute制約 / 規制強い` ←→ `compute豊富 / intelligence安価`

### 7.1 世界A: Default Empire
**単一デフォルト集中 × compute制約**

- Google は bundle と既存 distribution で強い
- OpenAI は premium intelligence で強い
- Anthropic は高信頼 niche を深く取る
- 企業は 1〜2 ベンダーへ寄せやすい
- 周辺プレーヤーの白地は狭く、control plane と vertical workflow に限定される

### 7.2 世界B: Bundled Abundance
**単一デフォルト集中 × compute豊富**

- モデル能力差は縮小し、bundle power が勝ちやすい
- Google 優位が広がる
- OpenAI は premium segment と独自体験で残る
- Anthropic は信頼プレミアムで残る
- 価格競争が厳しくなり、thin router / thin RAG は死にやすい

### 7.3 世界C: Governed Mesh
**マルチモデル常態化 × compute制約**

- 企業はリスクと能力でモデルを使い分ける
- Anthropic の neutral / trusted position が強まる
- Google は open platform と infra で強い
- OpenAI は single-runtime dominance を取りきれずとも premium model / app で残る
- Control plane / policy routing / evals の価値が大きい

### 7.4 世界D: Cheap Intelligence, Expensive Integration
**マルチモデル常態化 × compute豊富**

- intelligence 自体は安くなる
- 価値は context / orchestration / workflow / trust / adoption design に移る
- OpenAI / Anthropic / Google のモデルは利用されるが、利益は上位レイヤーへ移る
- ここが最も、adjacent player に white space が大きい世界

### 7.5 現時点の見立て
2026年3月時点では、  
**短中期は A と C の混合、長期は D 寄り**  
が最も自然である。

理由は以下。

- compute 制約はしばらく残る
- ただし protocol / multi-model 化は確実に進む
- 企業が 100% 単一ベンダーに寄せ切るには、リスク・調達・地域・業種要件が多すぎる
- intelligence のコストは中長期で下がる可能性が高い

つまり、**2029年までの本命は “完全単一覇権” ではなく “上は複数、下は統合、真ん中は制御と文脈が勝つ” 世界** である。

---

## 8. この仮説から見える white space

このセッションでは、こちら側の立ち位置が  
**AGI-native enterprise design / transition firm**  
として再定義された。  
この前提で見ると、white space は次の順で現れる。

## 8.1 2026–2027: 移行設計の white space
ここで売るべきものは「AI戦略」そのものではない。  
**AI-native company への移行責任** である。

具体的には、

- どの Task から変えるか
- どの Role を agent と再分配するか
- どの承認を人間に残すか
- どのデータをどのモデルに渡すか
- どのガードレールで本番運用するか

このフェーズで価値があるのは、

- Permissioned Context Plane
- Policy-based model / agent / tool routing
- Evals / observability / audit
- Human approval / exception handling
- 業界別 workflow wedge

であり、単なる general-purpose agent platform ではない。

## 8.2 2027–2028: Transition OS の white space
上流コンサルだけでは repeatability が弱い。  
一方、単なるプロダクトだけでは本丸を取れない。  
ここで必要になるのが **Transition OS** である。

その要素は、

- role decomposition
- human-agent handoff patterns
- approval redesign
- enterprise policy layer
- MCP / A2A bridge
- transformation dashboard
- industry template library

つまり、**「未来像」ではなく「そこへ移る operating system」** が白地になる。

## 8.3 2028–2029: AI-native management system の white space
最終的に残るのは、  
**人と agent が混成で働く会社をどう管理するか**  
という層である。

たとえば、

- AI workforce portfolio management
- role / budget / headcount 再配分
- 人・agent・外部委託の境界設計
- governance / audit / escalation at management level
- 業界固有の operating layer

ここは基盤モデル企業が簡単には持てない。  
なぜなら、これはモデル技術ではなく、**企業の設計責任そのもの** だからである。

---

## 9. やるべきこと / やらないべきこと

## 9.1 やるべきこと（robust bets）
1. **AGI-native operating model design** を上流商品として持つ  
2. ただし提案だけで終わらず、**1つの実装楔** を必ず持つ  
3. 実装楔は以下のいずれかに寄せる  
   - permissioned context  
   - policy routing  
   - evals / observability / approval  
   - industry-specific workflow module  
4. MCP / A2A 時代を前提に、**managed interoperability layer** をつくる  
5. 業界ごとに、Task → Role → Team → Function の再設計テンプレートを蓄積する  
6. 最終的には **Transition OS** と **industry operating layer** に上がる

## 9.2 やらないべきこと（no-go）
1. **汎用 AI 戦略コンサル**  
   OpenAI / Google / 大手コンサルが極めて混む。

2. **汎用社内チャット / 汎用 copilot**  
   ChatGPT / Gemini / Claude Enterprise / Workspace inclusion に飲まれやすい。

3. **thin router**  
   価格とレイテンシだけのルータは、クラウド同梱・内製・モデル側改善で圧縮されやすい。

4. **thin RAG / thin connector business**  
   company knowledge / MCP / official connectors で吸収されやすい。

5. **汎用 no-code agent builder 単体**  
   Frontiers / Gemini Enterprise / cloud-native agent stacks と真正面でぶつかる。

6. **楔が本丸へ資産化しない受託の積み上げ**  
   案件を積んでも future operating model の知見が蓄積しないなら危険。

---

## 10. 四半期ごとに追うべき観測指標

## 10.1 OpenAI の watchlist
- Frontier の導入社数 / 事例 / partner expansion
- company knowledge と connector の拡張速度
- Responses API への収束度、Apps SDK / MCP Apps の広がり
- AWS 以外を含む compute diversification の追加発表
- government / country programs の増加
- commerce / ads / licensing の具体化

## 10.2 Anthropic の watchlist
- MCP / AAIF の採用進展
- RSP / Risk Reports / audit frameworks の継続
- regulated vertical（医療・科学・金融・公共）での大型案件
- 3大クラウドでの availability / procurement の強化
- Labs を通じた productization の速度
- consumer mass distribution に進むか否か

## 10.3 Google の watchlist
- Gemini Enterprise の seat adoption と packaged agents の拡大
- Workspace / Chrome / Search / Android への AI inclusion の深化
- AI Overviews / AI Mode の monetization signal
- Vertex AI の openness（partner models 維持）
- A2A / MCP / ADK ecosystem の浸透
- UCP / commerce protocol の本格事業化

## 10.4 外生変数の watchlist
- compute cost curve と inference efficiency
- 電力制約 / データセンター規制
- AI safety / liability / copyright / antitrust の制度変化
- open models の能力向上
- Microsoft / AWS / Meta / Apple の動き
- 大きな安全性・セキュリティ事故

---

## 11. この文書のクリティカルシンキング上の留意点

### 11.1 この仮説が外れうる理由
1. **モデル能力差が想定以上に縮小する**  
   そうなると、基盤モデル企業の利益は思ったより薄くなり、上位レイヤーの価値がもっと早く移る。

2. **逆に能力差が拡大し続ける**  
   そうなると premium frontier provider がより強くなり、OpenAI や Anthropic の一部シナリオが強まる。

3. **規制が急に厳しくなる / 逆に緩い**  
   Anthropic 優位にも Google 不利にも OpenAI 不利にもなり得る。

4. **distribution owner が別に現れる**  
   たとえば OS / browser / enterprise suite の側がさらに強くなれば、OpenAI 単独の runtime ambition は抑制される。

5. **大企業の導入速度が想定より遅い**  
   すると enterprise runtime より、co-pilot 的な軽量用途が長引く。

### 11.2 それでもこの枠組みを採る理由
この枠組みが有用なのは、  
**「どの会社が勝つか」だけでなく「どのレイヤーがどの会社に取られやすいか」** を整理できるからである。

そしてこちら側にとって重要なのは、  
**勝者予想よりも、勝者が誰でも残る white space を見つけること**  
だからである。

---

## 12. 最終結論

このセッションを通じて到達した最終仮説は、次の通りである。

### 12.1 OpenAI
OpenAI は 2029年までに、  
**モデル企業 → intelligence platform 企業**  
へ最も強く進む可能性が高い。

戦略の核は、  
**frontier capability を consumer / enterprise / developer / government / compute / monetization に横展開し、知能の供給そのものを制御すること**。

### 12.2 Anthropic
Anthropic は 2029年までに、  
**trusted, neutral, serious-work cognition layer**  
になる可能性が高い。

戦略の核は、  
**safety / standards / cross-cloud neutrality / regulated verticals** を通じて、最も信頼される埋め込み先になること。

### 12.3 Google / Gemini
Google は 2029年までに、  
**default AI fabric across existing surfaces**  
を取りに行く可能性が高い。

戦略の核は、  
**Search / Workspace / Chrome / Cloud / TPU を束ねて、Gemini を“選ぶAI”ではなく“既にそこにあるAI”にすること**。

### 12.4 三社の戦いの本質
本質は「モデル性能」ではなく、  
**compute + distribution + runtime + context + protocol + control + monetization**  
の複合戦である。

### 12.5 こちら側にとっての示唆
こちら側が目指すべきは、  
**もう1つの汎用 agent 基盤** ではない。  
そうではなく、

- AI-native enterprise design
- Transition OS
- Permissioned context
- Policy routing
- Evals / audit / approval
- Industry operating layer

を軸とした、  
**AGI-native transformation firm**  
としてのポジションである。

この位置取りなら、OpenAI / Anthropic / Google の誰が伸びても、  
その上で必要になる **企業設計・移行設計・実装設計の責任** を持てる。

---

## 13. 参考文献 / 参照ソース

### OpenAI
- [R1] Introducing OpenAI Frontier  
  https://openai.com/index/introducing-openai-frontier/

- [R2] Introducing Frontier Alliances  
  https://openai.com/index/frontier-alliance-partners/

- [R3] Work smarter with your company knowledge in ChatGPT  
  https://openai.com/index/introducing-company-knowledge/

- [R4] ChatGPT Enterprise & Edu Release Notes  
  https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes

- [R5] OpenAI and Amazon announce strategic partnership  
  https://openai.com/index/amazon-partnership/

- [R6] OpenAI Apps SDK Quickstart  
  https://developers.openai.com/apps-sdk/quickstart/

- [R7] OpenAI Apps SDK Changelog  
  https://developers.openai.com/apps-sdk/changelog/

- [R8] Migrate to the Responses API  
  https://developers.openai.com/api/docs/guides/migrate-to-responses/

- [R9] Stargate Community  
  https://openai.com/index/stargate-community/

- [R10] Introducing OpenAI for Government  
  https://openai.com/global-affairs/introducing-openai-for-government/

- [R11] AI in Japan — OpenAI's Japan Economic Blueprint  
  https://openai.com/index/japan-economic-blueprint/

- [R12] The state of enterprise AI 2025 report  
  https://openai.com/index/the-state-of-enterprise-ai-2025-report/

- [R13] A business that scales with the value of intelligence  
  https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/

### Anthropic
- [R14] Donating the Model Context Protocol and establishing the Agentic AI Foundation  
  https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation

- [R15] Anthropic’s Responsible Scaling Policy: Version 3.0  
  https://www.anthropic.com/news/responsible-scaling-policy-v3

- [R16] Expanding our use of Google Cloud TPUs and Services  
  https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services

- [R17] Anthropic raises $30 billion in Series G funding at $380 billion post-money valuation  
  https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation

- [R18] Advancing Claude in healthcare and the life sciences  
  https://www.anthropic.com/news/healthcare-life-sciences

- [R19] Claude for Life Sciences  
  https://www.anthropic.com/news/claude-for-life-sciences

- [R20] Anthropic officially opens Tokyo office, signs Memorandum of Cooperation with the Japan AI Safety Institute  
  https://www.anthropic.com/news/opening-our-tokyo-office

- [R21] Introducing Labs  
  https://www.anthropic.com/news/introducing-anthropic-labs

- [R22] Pricing - Claude API Docs  
  https://docs.anthropic.com/en/docs/about-claude/pricing

- [R23] Enterprise deployment overview - Claude Code Docs  
  https://docs.anthropic.com/en/docs/claude-code/third-party-integrations

### Google / Gemini / Alphabet
- [R24] Gemini Enterprise: The new front door for Google AI in your workplace  
  https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-enterprise-sundar-pichai/

- [R25] Empowering every business with the best of Google AI  
  https://workspace.google.com/blog/product-announcements/empowering-businesses-with-AI

- [R26] Gemini AI features now included in Google Workspace subscriptions  
  https://knowledge.workspace.google.com/admin/gemini/gemini-ai-features-now-included-in-google-workspace-subscriptions

- [R27] Gemini in Chrome - Chrome Enterprise and Education Help  
  https://support.google.com/chrome/a/answer/16291696?hl=en

- [R28] Gemini now connects to Google Workspace apps  
  https://blog.google/products-and-platforms/products/workspace/workspace-june-drop-gemini-workspace-apps/

- [R29] Just ask anything: a seamless new Search experience  
  https://blog.google/products-and-platforms/products/search/ai-mode-ai-overviews-updates/

- [R30] Overview of Vertex AI  
  https://docs.cloud.google.com/vertex-ai/docs/start/introduction-unified-platform

- [R31] Agent Development Kit (ADK) docs  
  https://google.github.io/adk-docs/

- [R32] Announcing the Agent2Agent Protocol (A2A)  
  https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/

- [R33] Building agents with the ADK and the new Interactions API  
  https://developers.googleblog.com/building-agents-with-the-adk-and-the-new-interactions-api/

- [R34] Google Cloud MCP servers overview  
  https://docs.cloud.google.com/mcp/overview

- [R35] Introducing the Developer Knowledge API and MCP Server  
  https://developers.googleblog.com/introducing-the-developer-knowledge-api-and-mcp-server/

- [R36] Universal Commerce Protocol on Google  
  https://developers.google.com/merchant/ucp

- [R37] Alphabet 2025 Q4 Earnings Call  
  https://abc.xyz/investor/events/event-details/2026/2025-Q4-Earnings-Call-2026-Dr_C033hS6/default.aspx

- [R38] Alphabet 2025 Annual Report (10-K)  
  https://s206.q4cdn.com/479360582/files/doc_financials/2025/q4/GOOG-10-K-2025.pdf

- [R39] Q3 earnings call: Remarks from our CEO  
  https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q3-2025/

---

## 14. 最後の一文

このセッションの最重要メッセージは一つに尽きる。

**2029年までの基盤モデル戦争は、「誰のモデルが一番賢いか」ではなく、「誰が知能を default infrastructure にできるか」の戦いである。**  
そして、その上に残る最も強い白地は、**企業そのものを AGI-native に作り変える責任** である。
