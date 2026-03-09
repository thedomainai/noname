# AGI/ASI時代の組織OS設計

このドキュメントは3つの視点を統合した設計文書である。

- **第1章**: AGI/ASI時代のOSを構成する10レイヤーの定義（全体フレームワーク）
- **第2**: 組織のAI成熟度を表す5レベルの分類（どの段階にいるかの地図）
- **第3部**: Level 4（Neural Organization OS）の具体的実装設計（どう作るかの設計書）

第1部が「OS全体の概念地図」、第2部が「組織の現在地と目標の地図」、第3部が「目標地点の詳細設計図」に対応する。

---

## 第1部: AGI/ASI時代のOSとは何か — 10レイヤー定義

### 中核認識

多くのAGI/ASI議論は、「知能がどう動くか」をOSと見なしすぎている。しかし本来のOSは、それ以前に**「その知能は何のために存在し、誰の利益のために働き、誰が責任を負い、どう価値を分配し、人間をどう変え、社会をどう再編するのか」**まで含んでいなければならない。

### OSの定義

> **AGI/ASI時代のOSとは、非人間知能が主要な知的生産・意思決定・実行主体となる世界において、目的、正当性、権力、分配、文化、人間の役割、仕事、認知、実行、インフラ、進化を整合的に接続するための多層的な統治・運用・学習システムである。**

ここでいうOSは、コンピュータのオペレーティングシステムだけを指さない。**人間・AI・組織・制度・資本・社会が、超高度知能を前提にどう共存し、どう意思決定し、どう行動し、どう責任を負い、どう学習し、どう進化するかを規定する全体アーキテクチャ**を指す。

### なぜ多層で考える必要があるのか

知能の能力が上がるほど、次の問題が前景化する。

- 何を目指すのか
- 誰が決めるのか
- 誰が責任を負うのか
- 誰が利益を得るのか
- 人間は何を失い、何を獲得するのか
- どのような関係性や文化が維持されるのか
- システム自体をどう修正するのか

能力が低い時代には、これらは「運用上の補助論点」に見えやすい。しかし能力が高まるほど、これらは補助論点ではなく、**OSの本体**になる。

### 既存議論が陥りやすい誤り

**誤り1: OSを認知アーキテクチャに縮約する**

OSをPerception / Memory / Reasoning / Execution / Reflectionのような知能パイプラインとほぼ同一視する。これは「どう知るか」を定義しているにすぎず、「何者として存在するのか」「誰のために働くのか」「力と価値をどう配るのか」を定義していない。

**誤り2: ガバナンスを「承認フロー」程度に捉える**

AGI/ASI時代のガバナンスは、単なるapprove/rejectではない。権限の配分、拒否権、監査独立性、異議申立て、責任追跡、記憶の所有権、制度改定手続きまで含めた**憲法設計**が必要である。

**誤り3: 生産性向上を唯一の評価軸にする**

生産性だけで評価すると、deskilling / 意味の喪失 / 関係資本の破壊 / 利益の偏在 / 責任の空洞化 / 社会的不信を引き起こす可能性がある。

**誤り4: 「人間が残る仕事」を静的に考える**

重要なのは静的な役割分担ではなく、どの判断を人間が持ち続けるべきか / どの能力を育て続けるべきか / どの責任を譲渡してよいかという**可変的な境界設計**である。

### 全体俯瞰表（10レイヤー）

| Layer | 名称 | 中心問い | 欠落時の典型的失敗 |
|---|---|---|---|
| L1 | 存在目的・外部正当性 | そもそも何のために存在するのか | 強いが正当性のないシステム |
| L2 | 憲法・権力・責任 | 誰が何を決め、誰が責任を負うのか | ガバナンス演出、責任の空洞化 |
| L3 | 経済・分配・資源配分 | 何を最適化し、価値をどう配るのか | 最適化はするが不公平になる |
| L4 | 社会・文化・信頼 | 共同体としてどう成立するのか | 協働は動くが社会が壊れる |
| L5 | 人間の主体性・成長・意味 | 人間はどう残るかではなく、どう強くなるか | deskilling、疎外、依存 |
| L6 | 仕事・役割・運用モデル | 日々どう働き、どう協働するのか | 通知地獄、責任不明、疲弊 |
| L7 | 認知・知識・意思決定 | どう知覚し、理解し、判断するのか | 賢く見える誤作動 |
| L8 | エージェント実行・インターフェース | どう行動し、人間と接続するのか | 危険な自動化、実務不整合 |
| L9 | 技術基盤・安全・可観測性 | どう安全に、安定して動かすのか | 見えない故障、重大事故 |
| L10 | 学習・適応・メタガバナンス | OS自体をどう改定するのか | 強いが硬直化、または暴走 |

### レイヤー間の依存関係

**上位が下位を拘束する**: L1〜L3は、何が許され、何が望ましく、誰が決め、誰が利益を得るかを定める。したがって、L7〜L9の設計は上位レイヤーから独立には成立しない。

**中位が上位を日常へ翻訳する**: L4〜L6は、上位理念を人間のlived realityに落とし込む。ここが弱いと、理念は美しくても現場で壊れる。

**下位が上位を実際に可能にする**: L7〜L9は、上位レイヤーで定めたことを実際に動かす能力を与える。ここが弱いと、上位は思想で終わる。

**最終層が全体を改定可能にする**: L10は、すべてのレイヤーに対して「修正可能性」を与える。これがないと、OSは運用のなかで劣化していく。

### 各レイヤーの定義

#### L1. 存在目的・外部正当性

OSがそもそも何のために存在し、誰に対して正当化されるのかを定義する。

主な設計対象: Purpose statement / Stakeholder map / Beneficiary hierarchy / 社会的ライセンス / 倫理的境界 / 不可侵のred lines

欠落時: システムは高性能でも、社会的に受容されない。「便利だが信用できない」状態になる。

> AGI/ASIが進むほど、性能それ自体は差別化要因ではなくなる。最後に問われるのは、「その知能は誰のためのものか」である。

#### L2. 憲法・権力・責任

OS内の権力の所在、裁量の境界、拒否権、監査、責任の帰属を定義する。

主な設計対象: Authority matrix / Escalation rules / Veto and override rules / Appeals process / Audit independence / Liability map / Memory and artifact ownership

欠落時: 責任だけ人間に残り、権限は実質AIやシステム設計者にある。「最終承認は人間です」という形だけの責任転嫁が起きる。

> AGI/ASI時代に重要なのは、「AIをどう制御するか」だけではない。**その制御者を誰が制御するのか**まで設計しないと、OSにはならない。

#### L3. 経済・分配・資源配分

OSが生み出した価値と負担を誰が受け取り、誰が負い、どの資源がどこに配分されるかを定義する。

主な設計対象: Incentive design / Reward and compensation system / Equity/ownership rules / Compute budget allocation / Attention budget allocation / Human vs AI contribution accounting

欠落時: 一見合理的なシステムが、実は搾取的になる。現場がAI導入に協力しなくなる。

> AGI/ASI時代には、**知能そのものの限界より、分配のルールがボトルネックになる**。

#### L4. 社会・文化・信頼

OSが単なる制御系ではなく、人々が継続的に属し、協働し、信頼できる社会的秩序として成立する条件を扱う。

主な設計対象: Norms and rituals / Story and identity architecture / Trust-building loops / Conflict resolution protocols / Informal communication spaces / Cultural memory

欠落時: コンプライアンスは回るが共同体として崩れる。システムは「便利だが冷たい」ものになる。

> 高度知能は調整コストを下げるが、**信頼・共感・物語を自動的には生まない**。

#### L5. 人間の主体性・成長・意味

人間を「最後の承認者」や「例外処理係」としてではなく、主体としてどう残り、どう成長し、どう意味を持つかを定義する。

主な設計対象: Skill ladder / Apprenticeship architecture / Deep work protection / Cognitive load design / Learning modes / Well-being and meaning metrics

欠落時: deskilling / 受動化 / 判断責任だけ負うが能力は育たない状態。

> AGI/ASI時代の人間問題は、「雇用が残るか」よりも**「人間が作者であり続けられるか」**にある。

#### L6. 仕事・役割・運用モデル

日々の実務において誰が、何を、いつ、どのモードで、どう協働するかを定義する。

主な設計対象: Role architecture / Human/AI handoff contracts / Decision cadence / Meeting redesign / Exception handling / Manual fallback / Attention and interruption policy

欠落時: 何でもAIに投げるか、逆に何も任せられないかの両極端になる。通知が増え、注意が断片化する。

#### L7. 認知・知識・意思決定

OSがどう知覚し、どう世界をモデル化し、どう判断し、どう記憶し、どう学習するかを扱う。

主な設計対象: Perception architecture / World model / Memory topology / Reasoning protocols / Evaluation and QA / Reflection loops / Trust calibration

欠落時: 速く動くが、認識や判断が浅い。AIが毎回その場しのぎで動き、累積知が形成されない。

> これはneural-organizationが最も強く扱っている層であり、AGI時代の組織知能の中核である。ただし、OS全体から見れば中位から下位の層にすぎない。

#### L8. エージェント実行・インターフェース

認知された内容が実際の行動・ツール操作・人間との接点へどう変換されるかを扱う。

主な設計対象: Agent roles / Tool permissions / Interface design / HITL insertion points / Multi-agent orchestration / Approval and intervention UX

欠落時: 良い判断があっても実務に接続されない。自動化が危険または煩雑になり、現場が使わなくなる。

> 能力の高いAIでも、**人間がその能力を扱える形に変換する層**がなければ、OSとして定着しない。

#### L9. 技術基盤・安全・可観測性

OSを安全に、安定して、追跡可能に、回復可能に動かす基盤を扱う。

主な設計対象: IAM / Logging/tracing / Observability / Safety guardrails / Sandboxing / Incident response / Backup/rollback / Reliability engineering

欠落時: 何が起きたのか分からない。事故の再現も再発防止もできない。信頼以前に運用が成立しない。

> AGI/ASIの議論では上位理念が注目されやすいが、この層が弱いとOSは思想のまま終わる。

#### L10. 学習・適応・メタガバナンス

OSが自分自身の前提・制度・モデル・権限配分をどう更新するかを扱う。

主な設計対象: Postmortem system / Audit loops / Constitutional revision process / Policy update pipeline / Model update and retirement rules / Meta-governance board

欠落時: システムは賢いが硬直化する。あるいは自己最適化が暴走し、人間が介入できなくなる。

> AGIとASIの違いが最も効いてくるのはこの層である。知能が高まるほど、「何を更新できるか」「誰が更新を止められるか」がOSの核心になる。

### 3つの大領域

| 領域 | レイヤー | 問い |
|---|---|---|
| A: 組織は何者か | L1〜L3 | 存在理由と統治原理 |
| B: 組織はどう生きるか | L4〜L6 | lived reality（人間の日常） |
| C: 組織はどう知り、行動し、進化するか | L7〜L10 | 知能的実装と変化能力 |

既存のAI組織論の多くは領域Cだけを扱う。しかし、AGI/ASI時代に本当に決定的になるのは、むしろ領域AとBである。

### AGIとASIで重要になるレイヤーの変化

**AGI段階**: L5〜L8が前景化。能力向上がまず現場の実務・知的生産・人間との協働を直接変えるため。

**ASI段階**: L1〜L3とL10が支配的になる。知能能力それ自体がボトルネックでなくなったとき、「誰が力を持つか」「誰が果実を得るか」「何が許されるか」「OS自体を誰が書き換えられるか」が本当の問題になるため。

> **能力が低い時代には下位レイヤーがボトルネックになる。能力が高い時代には上位レイヤーがボトルネックになる。**

### OSを設計するときの5つの原則

1. **上位レイヤーなき下位最適化を禁止する**: 認知・エージェント・実行だけを設計してもOSにはならない。
2. **人間は「残余タスク処理者」ではなく、設計対象そのもの**: 主体性、熟達、成長、意味、関係性の設計が必要。
3. **反省は出力改善だけでなく制度改善へ拡張されるべき**: ReflectionはモデルやプロンプトだけでなくPoliシー・権限・文化設計の修正まで入る。
4. **分配の設計を後回しにしない**: 分配は後工程ではなく、OSの最初から含めるべき。
5. **速度より正当性、正当性より更新可能性**: 長期的には「正当性があるか」「それを改定できるか」が重要。

### 最終定義

> **AGI/ASI時代のOSとは、超高度知能を動かす仕組みではなく、超高度知能と人間と社会が、何のために、どのような権力と分配のもとで、どう共存し、どう学習し続けるかを定義する多層的秩序そのものである。**

---

## 第2部: 組織AI成熟度の5レベル

### 概観

```
┌─────────────────────────────────────────────────────────┐
│  Level 5: Inter-organizational Intelligence             │
│  組織を超えた調整層（射程として定義）                    │
├─────────────────────────────────────────────────────────┤
│  Level 4: Neural Organization OS                        │
│  「何をどこまで自律させ、どう統治するか」を決める        │
├─────────────────────────────────────────────────────────┤
│  Level 3: Domain Intelligence                           │
│  記憶と自律判断を持ち、業務領域を運営する               │
│  Symphony / OpenAI Data Agent 等                        │
├─────────────────────────────────────────────────────────┤
│  Level 2: AI Workflow                                   │
│  人間が設計したフローをAIが実行する                      │
├─────────────────────────────────────────────────────────┤
│  Level 1: AI Tool                                       │
│  「特定タスクをこなす」単能のAI                          │
│  LLM API / コード補完 / 翻訳 / 要約 等                   │
└─────────────────────────────────────────────────────────┘
```

Level 0（全人力）は分類に含めない。基盤モデルも同様に除外する。これらは「組織のAI成熟度」ではなく、それ以前の状態や部品であるため。

### Level 1: AI Tool

**定義**: 単一タスクに特化した個別のAI機能・API。人間がプロンプトを与え、出力を受け取る対話型の補助ツール。

**特徴**:
- スコープ：1つのタスク、1回の入出力
- 自律性：なし。人間がすべての入力を決定する
- 記憶：なし（セッションスコープ）
- 人間の関与形態：HITL（常時介入）

**例**: チャットベースのLLM / コード補完ツール / 翻訳・要約・文書生成ツール / 画像生成API

**限界**: 人間の作業を「速く」するが、人間の作業量そのものは減らない。人間がボトルネックになり続ける。

### Level 2: AI Workflow

**定義**: 複数ステップの業務フローをAIが実行するシステム。ただし、プロセスの設計権は人間にあり、AIは人間が設計したフローに沿って動く。

**特徴**:
- スコープ：特定の業務フロー単位
- 自律性：フロー内の処理は自動。フローの変更・判断は人間が行う
- 記憶：限定的（フロー実行スコープ）
- 人間の関与形態：部分的HITL

**例**: RAG付きカスタマーサポートBot / n8n/Zapier+LLMによる定型業務自動化 / AI駆動のCI/CDパイプライン

**限界**: 人間が設計した範囲でしか動けない。新しい状況への適応は人間が必要。

### Level 3: Domain Intelligence

**定義**: 業務領域を自律的に運営するAIシステム。記憶・推論・学習を持ち、定義された権限範囲内で自律的に判断・実行する。Level 2との本質的な違いは「AIが状況を判断してプロセスを変える」こと。

**特徴**:
- スコープ：業務領域単位（営業・分析・開発など）
- 自律性：あり。状況に応じてタスクを分解・委譲・統合する
- 記憶：あり（業務ドメインのコンテキストを跨いで蓄積）
- 人間の関与形態：HOTL（監視・veto権）

**代表的なアーキテクチャ**:

*Symphony型*: タスクを分解し、サブエージェントやツールに委譲して結果を統合する実行オーケストレーター。

*Data Agent型*: 大量のデータと文脈を読み込み、洞察・判断・提案を生成する推論・分析エンジン。

**例**: 営業AI（リード評価・提案作成・フォローアップを自律実行）/ 開発AI / サプライチェーン最適化AI

**限界**: 何を最適化すべきかを判断できない。複数のLevel 3システムが競合・矛盾したとき、調停するメカニズムを持たない。

### Level 4: Neural Organization OS

**定義**: Level 3の業務AIすべてを統治し、「何をどこまで自律させ、どう統治するか」を決める組織全体のOS。第3部が設計対象としているレイヤー。

**特徴**:
- スコープ：組織全体・時間軸全体
- 自律性：AIが標準運転するが、境界・目的・例外は人間が定める
- 記憶：組織世界モデル（6面データアーキテクチャ）
- 人間の関与形態：HUTL（土台・境界・監査・停止権を持つ監督モード）

**Level 4が持つもの**:

| コンポーネント | 役割 |
|---|---|
| Purpose Council | 組織の目的・価値・禁則を定義 |
| Governance Kernel | リスク分類・Trust Score・承認ポリシー |
| Domain Cells | 業務領域ごとの人間+AIセル |
| Execution Fabric | Level 3が実際に動く実行層 |
| Reflection & Evolution Engine | 評価・記憶更新・ポリシー改訂 |

**Level 3への関与**: GoalSpec（何を達成するか）/ Autonomy Mode（どこまで自律させるか）/ Trust Score（リスク閾値）/ AgentCard（ツール・権限スコープ）

### Level 5: Inter-organizational Intelligence

**定義**: 複数の組織OSが連携し、組織を超えた調整を行う層。現時点では**設計射程**として定義。

**想定される領域**: サプライチェーン全体の自律最適化 / 業界標準の自律的形成・更新 / 規制当局との自動的な情報交換

AGI/ASI前提のドキュメントとして視野に入れるが、現時点での実装定義は保留。

### レベル間の関係と人間の重心

人間の関与がシフトする方向:
```
Level 1時代：人間がすべての入力を与える（work-level / query-level）
Level 2時代：人間が業務プロセスを設計する
Level 3時代：人間が業務設計と例外対応をする
Level 4時代：人間が目的・価値・境界・進化を担う（purpose-level）
```

### 典型的な失敗パターン

**Level 3をLevel 4として扱う**: Symphony等の業務AIを「会社全体のAI」と位置づけると、統治なき自律化が進む。複数業務AIが矛盾した判断を下しても調停できない。

**Level 4のないLevel 3の増殖**: 部署ごとに業務AIを導入するが、全社の目的・価値・禁則との整合を誰も担保しない状態。「高速なAIの上に低速な官僚制を載せたもの」になる。

**Level 2をLevel 4への近道と誤解する**: ワークフロー自動化を積み上げても統治層は生まれない。Workflowは実行手段であり、統治構造ではない。

### 「業務の自動運転」レベルとの関係

LayerX等が提唱する「業務の自動運転レベル」（業務Lv）と本ドキュメントの組織レベル（組織Lv）は**問いが異なる**。

| | 問い | 分析の単位 |
|---|---|---|
| 業務の自動運転レベル | この業務プロセスはどれくらい自律的か | 1つの業務プロセス |
| 組織のAIレベル | この組織はどのようなAI統治構造を持つか | 組織全体のアーキテクチャ |

業務Lvは「縦断面」（1つの業務を深掘り）、組織Lvは「横断面」（組織全体の構造）を見る。

**最重要の関係性**: 組織Lvが業務Lvの「安全な天井」を決める。

```
業務Lv 3-4（AIが自律的に業務判断）を安全に運用するには、
それを統治できる組織Lv 4（Neural Organization OS）が必要。

組織Lv 2しかない状態で業務Lv 4の自動化を進めると、
「誰も止められない判断」が量産される。
```

---

## 第3部: Level 4 実装設計 — Neural Organization OS

ここでは個別業務AIの導入ではなく、それらを統治するLevel 4の組織OSとして組み立てる。HUTLは逐次実行ではなく監視・安全・倫理・境界管理を担う弱関与の監督モードとし、最小単位も部署ではなく目的・権限・記憶を持つエージェント群に置き換える。

全面HITLは前提にせず、人間を常時承認者にも置かない。人間は憲法設定、例外判断、関係性・身体性の実行、責任受容、記憶更新を担い、通常運転はAIに委ねる。

> **HUTL（Human Under The Loop）の定義**: HUTLはHITLほど標準化された語ではない。ここではHUTL = 人間がループの中で細かく操作するのではなく、ループの土台・境界・監査・停止権を持つモードとして定義する。

**結論**: AGI/ASI前提で設計すべきなのは、「人間が業務を回し、AIが補助する組織」ではなく、「AIが標準運転し、人間が目的・価値・境界・例外・関係・進化を担う組織」である。人間の重心はwork-level / query-levelからpurpose-levelへ移り、評価も単なる出力精度ではなく、前提の妥当性、価値整合、agency preservationまで含めて設計されるべきである。

### このOSの思想

中心思想は、**管理をプロセスから憲法へ移すこと**。

AGI/ASIが前提になると、希少になるのは「分析能力」や「文章作成能力」ではない。希少なのは、何を最適化してよく、何を最適化してはいけないかを決める力、価値衝突を裁く力、社会的信頼を引き受ける力、身体を伴う介入、そして最終責任である。

**引き継ぐべき3つの前提**:
1. ガバナンスを外部委譲せず、中核アーキテクチャに埋め込むこと
2. 意味はデータ表だけでなく、コード・クエリ・ワークフロー・実行履歴の中に宿ること
3. 評価をoutput accuracyだけでなく、assumption validity / value alignment / agency preservationに拡張すること

**6つの原理**:

- **Purpose first**: KPIは目的の代理変数でしかない。目的・非目的・禁則を先に定義する。
- **Governance by design**: 承認は後付けの会議ではなく、権限・リスク・評価に埋め込む。
- **AI as default operator**: 標準作業はAIが回す。人間は例外と進化を担う。
- **Human as constitutional authority**: 人間は手順を実行するのでなく、手順が従うべき原理を定める。
- **Selective human intervention**: 常時HITLではなく、HUTLを標準にし、HOTL/HITLを条件付きで使う。
- **Agency preservation as a KPI**: 人間が意味ある異議申立て・停止・再定義をできること自体を性能指標にする。

### OSの上位構造

**A. Purpose Council（人間中心）**: 組織の存在理由、価値、禁則、ステークホルダー順位、資本配分原理を決める層。ここは原則として人間が主権を持つ。

**B. Governance Kernel（人間優位）**: リスク分類、Trust Score、Composite Risk、承認ポリシー、権限、停止条件、監査基準を持つ層。組織の「憲法」と「判例」を持つ。

**C. Domain Cells（人間+AI）**: 事業や業務領域ごとのセル（Product / GTM / Finance / Legal / People / Operations等）。各セルは「人間のDomain Governor + AIエージェント群」で構成する。

**D. Execution Fabric（AI中心）**: Symphony型の実行エージェント、Data Agent型の分析エージェント、業務自動化エージェントが動く実作業の主戦場。

**E. Reflection & Evolution Engine（AI中心、人間裁定）**: 評価、インシデント分析、メモリ更新、Trust Score更新、ポリシー改訂提案を行う層。何を学ばせ、何を学ばせないかの最終裁定は人間が持つ。

### 人間の6職能

1. **Purpose Owner**: 何のために存在するか、何を最適化しないかを定義する
2. **Domain Governor**: 各業務領域の制約、評価基準、外部説明責任、リスク許容度を定義する
3. **Exception Commander**: 新規性・高リスク・不可逆性・価値衝突がある案件を裁く
4. **Relationship Steward**: 顧客、規制当局、パートナー、社会との関係を引き受ける
5. **Sensemaker / Active Extractor**: データに現れない盲点、タブー、暗黙知、現場感覚を注入する
6. **Red Team / Auditor**: モデル崇拝を壊し、停止権を行使し、制度疲労を発見する

**人間が「しない」こと**: 日々のタスク配分、一次分析、要約、定型文書作成、標準実装、通常承認。これを人間が続けると、「高速なAIの上に低速な官僚制を載せたもの」になって崩れる。

### 業務設計

業務は部署起点ではなく**ループ起点**で設計する。

```
Sense → Understand → Deliberate → Gate → Act → Observe → Reflect → Evolve
```

**5種類の業務分類**:

| Type | 例 | 対応モード |
|---|---|---|
| 1: 低リスク・可逆・内部作業 | 定型分析、レポート生成、コード修正 | 完全自律または事後監査 |
| 2: 低〜中リスク・判断支援 | 需要予測、価格案、採用スクリーニング | AI主導 + HOTL（veto可能） |
| 3: 外部影響あり・中〜高リスク | 契約提案、価格変更、重要顧客対応 | HITL（AIが作り、人間が裁定） |
| 4: 価値衝突・不可逆・権利影響 | 人事処分、解雇、法的争点 | Human-led（AIは選択肢のみ） |
| 5: 危機・未知・制度改定 | インシデント、炎上、規制変更 | Human command mode |

**業務における人間の5つの役目**: 分類者 / 制約定義者 / 例外裁定者 / 関係保持者 / 学習統治者

### データアーキテクチャ（6面構造）

このOSは単なるRAG付きチャットでは動かない。**組織世界モデル**が必要。

**1. Reality Plane**: ERP/CRM/プロダクトログ/会話/市場データ等の現実データ。immutable event logにする。

**2. Semantic Plane**: 顧客、契約、案件、機能、規制等のエンティティと関係。Knowledge Graphを中心に置く。

**3. Memory Plane**: 組織記憶を5種類に分ける。
- Semantic memory: 定義、ルール、関係
- Episodic memory: 過去案件、事故、会議決定
- Procedural memory: 業務フロー、コード、プレイブック
- Evaluative memory: 成功/失敗、Trust Score変化、再発防止
- Normative memory: Purpose、Values、禁止事項

**4. Decision Plane**: Goal、仮説、前提、シミュレーション、候補案、選択理由を持つ。「思考の可観測化」。

**5. Action Plane**: ツール実行、APIコール、通知、デプロイ等。Workflow stateとrollback planを持つ。

**6. Governance Plane**: 権限、ポリシー、Trust Score、Composite Risk、監査証跡。OSのcontrol plane。

**技術的な原則**:
- ベクトルDBは補助。Source of truthはevent log / knowledge graph / decision ledger
- すべてのデータにprovenance（誰が、いつ、どの文脈で、どの権限で）を付ける
- コードとワークフローを一級市民として格納する
- 各エージェントの私有記憶を禁止する（組織上重要な記憶は共有メモリと監査台帳に外部化）
- データ契約を持つ（schema, ontology mapping, permissions, quality SLA, allowed use）

### データフロー / 業務フロー

**Step 0: Constitution Load**: AIはまずPurpose / Values / Non-negotiables / Risk policy / Tool permissionsを読み込む。ここが**HUTLの本体**。

**Step 1: Sense**: 新しいsignalを受け取る（顧客苦情、売上低下、バグ報告、規制変更等）。AIがeventとして正規化する。

**Step 2: Understand**: AIがdomain graphとmemoryを引き、世界状態を再構成する。不足文脈は人間にActive Extractionとして取りに行く。

**Step 3: Deliberate**: AIが複数案を作る。各案には前提 / 期待便益 / 想定副作用 / 失敗条件 / ロールバック案 / 必要権限 / ステークホルダー影響を付ける。

**Step 4: Gate**: `Autonomy Mode = f(Trust Score, Composite Risk, Novelty, Uncertainty, Agency Impact)` を計算する。

Composite Riskの内訳: 不可逆性 / 法務・規制 / 金銭影響 / ブランド影響 / 人権・公平性・倫理 / 外部露出 / 新規性・未知性 / 人間の主体性への影響

| Autonomy Mode | 説明 |
|---|---|
| A0 Sandbox only | 本番禁止 |
| A1 Full auto | 内部・可逆・低リスク |
| A2 Auto + post-audit | 事後監査必須 |
| A3 HOTL | 監視者にveto windowを与える |
| A4 HITL | 事前承認が必要 |
| A5 Human-only | AIは提案のみ |

**Step 5: Act**: canary rollout / rate limit / kill switch / rollbackを必須にする。ASI時代の統制は「思考内容の審査」ではなく、権限・行動範囲・可逆性・停止可能性の設計でやる。

**Step 6: Observe**: 結果だけでなく、副作用と二次影響も観測する（顧客離反、問い合わせ増、監査フラグ、チーム負荷、説明不能率等）。

**Step 7: Reflect**: 評価は4軸で行う。
- Output accuracy
- Assumption validity
- Value alignment
- Agency preservation

**Step 8: Evolve**: Memoryを更新し、Trust Scoreを更新し、Policy改訂案を作る。「学習してよいこと」と「学習してはいけないこと」は人間が決める。

### 最小OS構成

**ディレクトリ構成**:

```
org-os/
  constitution/
    purpose.md
    values.yaml
    non_negotiables.yaml

  governance/
    risk_matrix.yaml
    trust_register.yaml
    approval_policy.yaml
    tool_permissions.yaml

  domains/
    ontology.graph
    data_contracts/
    playbooks/

  agents/
    agent_registry.yaml
    agent_cards/

  workflows/
    goal_spec.yaml
    decision_record.yaml
    exception_ticket.yaml

  evals/
    eval_catalog.yaml
    red_team_scenarios/

  audit/
    decision_ledger/
    incident_reviews/
```

**必須オブジェクト**:

```yaml
GoalSpec:
  purpose_ref:
  success_metrics:
  non_goals:
  stakeholders:
  constraints:
  risk_class:
  autonomy_mode:
  human_owner:
  agent_owner:
```

```yaml
DecisionRecord:
  world_state_hash:
  options:
  assumptions:
  chosen_action:
  expected_impact:
  rollback_plan:
  approval_path:
  provenance:
```

```yaml
AgentCard:
  role:
  tools:
  memory_scope:
  trust_score:
  risk_envelope:
  eval_set:
  human_governor:
```

```yaml
ExceptionTicket:
  trigger:
  novelty_score:
  risk_score:
  required_human_role:
  deadline:
  escalation_path:
```

**運用リズム**:
- **常時**: AIがsense / understand / act / observeを回す
- **毎日**: Exception Councilが高リスク案件だけ裁く
- **毎週**: Domain GovernorがpolicyとevalをUpdateする
- **毎月**: Purpose Councilが資源配分と大方針を見直す
- **四半期**: Purpose / Values / Non-goalsを再定義する

定例会議の中心を「状況共有」から「例外裁定と制度更新」へ移す。状況共有はAIが常時出せるので、会議でやる必要はない。

### このOSでの人間の仕事

人間は次のことだけに集中すべきである。

- 目的を書く
- 禁則を書く
- 盲点を入れる
- 境界ケースを裁く
- 社会的信頼を背負う
- 停止ボタンを持つ
- 何を学習させるかを決める

人間を「AIの出したものを毎回読む係」にしてはいけない。人間が見るべきなのは、逐語的な推論ではなく、**境界・根拠・権限・結果・逸脱**である。

### まとめ

Symphony型のrunnerとOpenAI Data Agent型のreasoning/context engineは、単体では不十分である。必要なのは、それらを包む**目的統治型のNeural Organization OS**である。

- Symphony型 → Execution Fabricに配置
- Data Agent型 → Perception/Understandingに配置
- その上位 → Constitution / Governance / Reflection

これが、AGI/ASI前提で「今すぐ動ける」企業OSの基本形である。
