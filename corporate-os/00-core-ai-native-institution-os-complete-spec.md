# AI-native Institution / OS Complete Spec (Steady-State Scope)

## 日本語版

## スコープ

本ドキュメントは、AI-native institution / OS のための「平時における完全性仕様」を定義する。

含むもの:
- 13の具体的な設計次元
- 各次元に対する `Invariant / Allocation / Protocol / Exception / Metric` 形式の完全な定義
- 次元間の主要な因果接続の検証
- 完成度監査

含まないもの:
- 導入期の設計
- 移行期の設計
- 非常時の再設計
- 能力ジャンプやレジーム転換の設計

この制約に従い、第13次元は**平時におけるメタガバナンスと進化**に限定し、レジーム転換そのものは扱わない。

## モデル

本仕様は、次の3層で構成する。

1. `10レイヤー` を抽象的な完全性地図とする
2. `13次元` を具体的に設計すべき論点とする
3. `5要素` を各論点に対する必須の記述形式とする

この仕様の目的は、「自動的に正しい設計」を与えることではない。  
目的は、一次的な問い漏れを取り除き、残るリスクを「解の質」と「実装の質」の問題へ押し込むことにある。

## 10レイヤー

ここでいう `10レイヤー` は、AI-native institution / OS を抽象的に捉えるための完全性地図である。  
`13次元` が「何を具体的に決めるか」を問うのに対し、`10レイヤー` は「その論点が制度のどの種類の現実に属するか」を整理するために使う。

### L1. Purpose & Legitimacy

制度が何のために存在し、誰に対して正当化されるのかを扱う。  
ここでは、目的、受益者階層、外部正当性、社会的ライセンス、不可侵の境界が主題になる。

### L2. Membership, Rights & Constitutional Governance

誰が参加主体で、誰が権利主体で、誰がどの決定権を持つのかを扱う。  
membership、 rights bundle、 authority、 appeal、 accountability を定める層である。

### L3. Political Economy & Incentives

価値、コスト、報酬、compute、attention をどう配分するかを扱う。  
分配の公正と、OSを迂回させない incentive の整合をここで設計する。

### L4. Culture, Trust & Social Order

この制度が単なる制御系ではなく、継続可能な社会秩序として成立する条件を扱う。  
文化、信頼、儀礼、非公式コミュニケーション、衝突解決、物語の継承が主題である。

### L5. Human Agency, Development & Meaning

人間がどう強くなり、どう学び、どう作者であり続け、どう意味を持つかを扱う。  
agency preservation、 deskilling 防止、熟達、学習、deep work、意味の機会の設計がここに属する。

### L6. Operating Model & Role Topology

日々の仕事がどのようなループ、 role、 handoff、 cadence で回るかを扱う。  
実際の働き方、例外処理、 manual fallback、会議設計、 role contract をここで定義する。

### L7. World Model, Knowledge & Deliberation

制度が何を現実とみなし、どう理解し、どう推論し、どう判断案を作るかを扱う。  
ontology、 state、 memory、 reasoning、 epistemics の中心レイヤーである。

### L8. Actuation & Interface

判断が、どの経路で現実の組織を変えるかを扱う。  
タスク化、権限変更、予算配分、構造更新、外部ツール操作、人間との接点がここに属する。

### L9. Safety, Resilience & Observability

OSが安全に動き、観測でき、停止でき、回復できる条件を扱う。  
IAM、 logging、 tracing、 sandboxing、 anomaly detection、 incident response が主な対象である。

### L10. Meta-Governance & Evolution

OS自体をどう更新し、何を改定可能にし、何を改定不能にするかを扱う。  
hard-core / soft-shell、 policy update、監査、改定権の配分、進化の制約がここに属する。

### 10レイヤーの役割

この10レイヤーは、13次元を上から整理するための抽象的な座標系である。  
一つの次元が複数レイヤーにまたがることはありうるが、どのレイヤーにも属さない一次論点は残してはならない。

## 詳細モジュール

本ドキュメントは全体仕様の正本であり、詳細は次のモジュールに分割している。

- `10-module-governance-human-participation.md`
  - D1-D8 と D13 の平時詳細
- `11-module-information-ingress-state-and-observability.md`
  - D9-D12 の詳細、および状態・可観測性の実装原則

原則として、

- 全体構造の変更はこの core spec に反映する
- 個別次元の詳細運用は module に反映する
- 理由づけや広域構想は `20-rationale-agi-era-organization-os.md` に残す

## 参照実例

本仕様は抽象仕様であり、設計品質は concrete instance に落としたときに初めて十分に検証できる。  
そのため、本ディレクトリでは次の参照実例群を保持する。

- `40-reference-organization-profile.md`
  - 参照組織の前提、顧客、提供価値、規模、リスクを定義する
- `41-reference-organization-instantiation.md`
  - D1-D13 を参照組織に対して具体値で埋める
- `42-reference-organization-integrity-audit.md`
  - concrete instance が profile と core spec に対して整合しているかを監査する

原則として、

- 抽象仕様を更新したら `41-` と `42-` に矛盾が出ないか確認する
- 新しい組織類型を試す場合は `43-` 以降に第二の concrete instance を追加する

## 13次元

### D1. Objective Function

**Definition**
この制度が何を最適化してよいか、誰の利益をどの順序で守るか、そして何を最適化の名のもとに犠牲にしてはならないかを定義する次元。

**Invariant**
OSは、境界づけられた目的階層の内側でのみ最適化を行わなければならない。人間の権利、ハードな禁止事項、外部正当性は、局所的な効率のために交換可能なものではない。

**Allocation**
- AIは、目的の改善案、トレードオフの重み、資源配分案を提案する。
- 人間のステークホルダー代表は、受益者階層と不可侵条件を承認する。
- 各ドメインの運営主体は、その制約を継承するが、ローカルに書き換えることはできない。

**Protocol**
1. 明示的な purpose statement を維持する。
2. beneficiary hierarchy を維持する。
3. `生存 / 権利保全 / ステークホルダー福祉 / 戦略成果 / 局所効率` の順を持つ目的スタックを維持する。
4. 非交渉の禁止事項と red lines を維持する。
5. 固定の cadence で目的スタックを見直す。

**Exception**
- 目的同士が衝突し、許容可能なトレードオフが存在しない場合は、最適化を停止し D4 にエスカレーションする。
- 提案された目的がハードな権利や外部正当性に反する場合、その案は比較衡量なしで却下する。

**Metric**
- Goal coherence score
- Red-line violation count
- Objective drift frequency
- Stakeholder welfare delta
- 明示的な objective 参照を持つ意思決定の割合

### D2. Legitimacy & Boundary

**Definition**
このOSがなぜ社会的に許容されるのか、どこまでが自らの権限範囲なのか、外部の主体がどのように監視・異議申立てできるのかを定義する次元。

**Invariant**
制度は、性能だけでは正当化されない。影響を受ける主体に対して、検証可能であり、異議申立て可能であり、説明可能でなければならない。

**Allocation**
- OSは、社会一般、直接の利害関係者、監査主体、提携組織などの stakeholder class を定義する。
- 外部監査主体には inspection rights を与える。
- 影響を受けるステークホルダーには challenge rights を与える。
- 規制は外部制約ではなく、 governance input として扱う。

**Protocol**
1. 内部者、外部者、影響を受ける主体の boundary definition を維持する。
2. `public / stakeholder / audit` の3段階の disclosure level を維持する。
3. 外部からの異議申立てチャネルを維持する。
4. 規制変更を governance parameter に統合する。
5. legitimacy report を定期的に公表する。

**Exception**
- 正当性が重大に争われた場合、該当する判断を凍結し、レビューを行う。
- 規制と運用が衝突した場合、D4 と D12 が共同で compliant fallback を定義する。

**Metric**
- External audit pass rate
- Stakeholder challenge resolution time
- Regulatory nonconformance count
- Public trust score
- 外部から理解可能な rationale を持つ重要判断の割合

### D3. Membership & Participation

**Definition**
誰がメンバーで、誰が単に影響を受ける主体であり、各主体にどのような権利束があり、どのような参加形式が認められるかを定義する次元。

**Invariant**
人間の参加者を、システムに従属する受動的オブジェクトにしてはならない。 membership は、必ず rights bundle と participation mode を伴う。

**Allocation**
- 参加主体を、運営者、受益者、影響を受ける労働者、経営層、提携主体、外部影響主体に分類する。
- 人間の参加者には、最低限の権利束として `exit / kill switch / benefit / transparency` を付与する。
- stakeholder class ごとに参加のための forum を割り当てる。

**Protocol**
1. membership registry を維持する。
2. stakeholder class ごとの rights ledger を維持する。
3. choice、creation、learning、relationship のための参加チャネルを定義する。
4. 権利行使が象徴的でなく、運用上到達可能であることを保証する。

**Exception**
- stakeholder class 間で権利主張が衝突した場合、D4 にエスカレーションする。
- 権利が制度上は存在しても実際には行使できない場合、そのプロセスは non-compliant とみなす。

**Metric**
- Rights exercise latency
- Participation rate by stakeholder class
- Unresolved rights violation count
- 実効的な参加チャネルを持つメンバーの割合
- Exit と kill switch の実用到達性

### D4. Decision Rights & Accountability

**Definition**
誰が何を決定できるのか、その権限は何によって正当化されるのか、どのような異議申立てが可能か、失敗時に誰が責任を負うのかを定義する次元。

**Invariant**
明示された authority、accountable owner、appeal path、execution boundary を持たない binding decision は存在してはならない。

**Allocation**
- AI と人間の主体には、明示的な authority matrix に基づいて権限を割り当てる。
- 必要な人間参加の水準は Autonomy Mode によって決定する。
- 重要判断に対しては、独立監査が review rights を持つ。

**Protocol**
1. すべての binding decision を decision ledger に記録する。
2. 各判断には、authority basis、accountable owner、affected parties、appeal path を付与する。
3. Autonomy Mode を trust、risk、novelty、uncertainty、agency impact から算出する。
4. appeal と override は固定手続きに従って処理する。

**Exception**
- authority が衝突する場合は、 tie-break escalation を発動する。
- 権利に影響する判断が閾値を超える場合、より強い人間参加を要求する。
- kill switch の即時行使は通常承認を迂回できるが、事後レビューは必須とする。

**Metric**
- Unowned binding decisions count
- Appeal reversal rate
- Override frequency
- リスク区分ごとの time to decision
- accountable owner が明示された重要判断の割合

### D5. Political Economy & Incentive Compatibility

**Definition**
価値、コスト、compute、attention、報酬をどう配るか、そして人間とAIがなぜこのOSを迂回せずに使い続けるかを定義する次元。

**Invariant**
OSは善意に依存してはならない。 canonical behavior を安く、 shadow behavior を高くするように incentive を設計しなければならない。

**Allocation**
- 人間の参加者には最低 benefit floor を与える。
- compute と attention の budget を明示的に割り当てる。
- contribution accounting は可視化に用い、分配の唯一の道徳的根拠にはしない。
- チームやエージェントには、 write-back、 traceability、 policy compliance を報いる。

**Protocol**
1. 最低 benefit guarantee を維持する。
2. compute budget allocation rule を維持する。
3. attention budget allocation rule を維持する。
4. canonical write path を報い、 shadow ingress を不利にする。
5. 人間とAIの contribution を追跡するが、 rights を contribution に還元しない。

**Exception**
- incentive がゲーム化や迂回を誘発した場合、その仕組みを停止して再設計する。
- benefit floor が侵害された場合、関連する allocation を invalid とみなす。

**Metric**
- Shadow work ratio
- Benefit floor compliance
- Canonical write-path usage rate
- Compute budget fairness index
- Incentive gaming incident count

### D6. Social Order, Culture & Trust

**Definition**
この制度を、単なる制御システムではなく、継続可能な社会秩序として成立させるための文化・信頼・紛争処理の構造を定義する次元。

**Invariant**
信頼、衝突解決、物語的一貫性は、運用の副産物ではなく一級の運営条件である。

**Allocation**
- norms、rituals、 conflict mediation を担う主体を明示する。
- informal communication space を意図的に確保する。
- cultural memory を共有資産として管理する。

**Protocol**
1. norms と rituals を維持する。
2. conflict resolution protocol を維持する。
3. 主要な成功・失敗・価値観の変化を cultural memory として維持する。
4. 非公式な人間同士のコミュニケーション空間を保護する。

**Exception**
- trust collapse、 factionalism、未解決の対立が発生した場合、文化的介入を行う。
- informal space が shadow governance の経路になった場合、D5 と D12 が介入する。

**Metric**
- Trust index
- Conflict resolution time
- Belonging score
- Cultural memory update cadence
- protocol 内で解決された対立の割合

### D7. Human Development, Agency & Meaning

**Definition**
人間が rubber-stamp reviewer に堕さず、作者であり、学習者であり、意味を持つ参加者であり続ける条件を定義する次元。

**Invariant**
制度は、人間に対して `choice / creation / learning / relationship` の4つの意味ある機会を保全しなければならない。

**Allocation**
- 人間には保護された deep-work time を与える。
- learning budget と apprenticeship channel を確保する。
- 必要な領域では、人間の authorship と editing rights を明示的に保護する。

**Protocol**
1. skill ladder を維持する。
2. apprenticeship と mentoring mode を維持する。
3. deep-work protection と cognitive load limit を維持する。
4. 学習に必要な場合には、AIの reasoning を人間に理解可能な形で提示する。
5. 単なる review task ではなく、意味ある participation point を設計する。

**Exception**
- deskilling、過負荷、 authorship 喪失の兆候が出た場合、 automation を弱め、 skill restoration を行う。
- 人間が理解不能な提案の形式的承認者に退化した場合、その設計は non-compliant とみなす。

**Metric**
- Deskilling risk index
- Deep-work hours preserved
- Learning progression rate
- Human authorship participation rate
- Cognitive overload incident count

### D8. Operating Model & Role Contracts

**Definition**
日々の仕事がどのループで回り、人間とAIがどこで handoff し、例外時にどの fallback が働くかを定義する次元。

**Invariant**
あらゆる反復的な制度活動は、 explicit loop、 explicit handoff contract、 explicit fallback を持たなければならない。

**Allocation**
- 人間の参加者、AIの運営主体、監査主体、例外処理 forum のあいだに role を割り当てる。
- 各 workflow には cadence owner と exception owner を持たせる。

**Protocol**
1. 組織を部署だけでなく loop として設計する。
2. human/AI handoff contract を定義する。
3. meeting redesign、 exception handling、 manual fallback を定義する。
4. 各 loop に service level と escalation point を紐づける。

**Exception**
- handoff failure、 role ambiguity、 exception backlog が発生した場合、 fallback mode に入りプロセスを再設計する。
- accountable な exception owner を持たない workflow は incomplete とみなす。

**Metric**
- Loop completion rate
- Handoff failure rate
- Exception backlog size
- Manual fallback success rate
- 参加者あたりの meeting load

### D9. World Model, State & Memory

**Definition**
制度にとっての現実をどの ontology で表現し、どの state を正本とし、どの memory を保持し、どの read/write surface を canonical とするかを定義する次元。

**Invariant**
provenance を持つ canonical state だけが、 binding decision と institutional action を駆動してよい。

**Allocation**
- state、 decision、 action trace、 governance data ごとに authoritative source を割り当てる。
- ontology の ownership を明示する。
- 制度上重要な state に関する private agent memory を禁止する。

**Protocol**
1. official ontology と schema を維持する。
2. `reality / semantic / memory / decision / action / governance` の6面構造を維持する。
3. 制度上重要な全データに provenance を要求する。
4. canonical write surface と unified retrieval surface を定義する。

**Exception**
- provenance 欠落、 schema conflict、 shadow state が発見された場合は quarantine と reconciliation を行う。
- 競合する source of truth が複数存在する場合、下流の binding action を禁止する。

**Metric**
- Provenance completeness
- Canonicalization latency
- Orphan state count
- official state に対する retrieval precision/recall
- Duplicate source-of-truth incident count

### D10. Deliberation, Planning & Epistemics

**Definition**
制度がどのように signal を受け取り、世界を理解し、選択肢を作り、不確実性を扱い、提案を形成するかを定義する次元。

**Invariant**
重要な proposal は必ず、 assumptions、 expected value、 side effects、 failure conditions、 rollback logic、 required authority、 stakeholder impact を伴わなければならない。

**Allocation**
- デフォルトの sensemaking と option generation は AI が担う。
- 人間参加は Autonomy Mode と rights impact に応じて挿入する。
- AI が安定的に観測できない blind spot に対してのみ Active Extraction を使う。

**Protocol**
1. `Constitution Load -> Sense -> Understand -> Deliberate -> Gate` の loop を回す。
2. world model と memory を reasoning substrate として使う。
3. 重要な tradeoff がある場合は複数 option を生成する。
4. uncertainty、 novelty、 agency impact を明示的に評価する。

**Exception**
- uncertainty、 novelty、 rights impact が高い場合は、より強い人間参加へエスカレーションする。
- rollback path が存在しない proposal は高リスクとして扱う。

**Metric**
- Assumption validity score
- Value alignment score
- Forecast error
- Active Extraction rate
- multi-option comparison を持つ重要 proposal の割合

### D11. Actuation Surface

**Definition**
判断が実際に組織をどう変えるか、すなわちタスク、権限、予算、組織構造、外部ツール、通知経路への commit path を定義する次元。

**Invariant**
権限、可逆性、 traceability を備えた controlled actuation surface を通らない限り、 decision は現実になってはならない。

**Allocation**
- tool permission は role と agent ごとに明示的に scope する。
- 予算、 staffing、 access、 communication の control path を割り当てる。
- 制度状態を変更できる write path は指定されたものに限定する。

**Protocol**
1. すべての binding decision に commit path を付与する。
2. 重要 action には canary rollout、 rate limit、 kill switch、 rollback plan を必須とする。
3. action trace を記録し、 decision と state にリンクする。

**Exception**
- unauthorized actuation は incident として扱う。
- 必要な safeguard を欠く irreversible action は block する。

**Metric**
- Actuation latency
- Rollback success rate
- Unauthorized actuation count
- Decision-to-action traceability rate
- 承認された decision と実行内容の drift

### D12. Safety, Failure, Adversary & Observability

**Definition**
OSが誤作動、攻撃、隠蔽、 off-channel 行為、劣化に対して、観測可能で、停止可能で、回復可能である条件を定義する次元。

**Invariant**
重要な振る舞いはすべて、 observable、 attributable、 stoppable、 recoverable でなければならない。

**Allocation**
- IAM scope により minimum privilege を定義する。
- monitoring と incident ownership を明示する。
- red-team と anomaly review の責任を割り当てる。

**Protocol**
1. logging、 tracing、 anomaly detection、 audit trail を維持する。
2. 未検証エージェントや新規ドメインには sandboxing を適用する。
3. incident detection、 classification、 containment、 recovery、 postmortem の flow を維持する。
4. shadow ingress と off-channel binding behavior を検知する。

**Exception**
- incident は severity に応じて containment を発動する。
- stop-right の行使は通常フローを迂回できるが、事後レビューを必須とする。
- observability が閾値を下回った場合、該当 automation を downgrade する。

**Metric**
- Mean time to detect
- Mean time to recover
- Safety metric trend
- Stop-right exercise frequency
- Audit coverage rate

### D13. Meta-Governance & Evolution

**Definition**
OSが平時において、自らの policy、 threshold、 model、 soft rule を、 hard constraint を破らずに更新する方法を定義する次元。

**Invariant**
ハードコアの人間権利は改定不可能である。 soft-shell のルールは、明示的な review と approval の手続きを経た場合にのみ変更できる。

**Allocation**
- proposal rights は AI または人間が持ちうる。
- review rights は独立した混成 body が持つ。
- approval rights は stakeholder により正当化された人間が持つ。
- veto rights は影響を受ける stakeholder が持つ。

**Protocol**
1. hard-core / soft-shell の区別を維持する。
2. policy と model の update pipeline を維持する。
3. 重要変更には intelligible explanation、 peer AI review、 consequence translation、 canary rollout を要求する。
4. trust、 threshold、 procedure の更新は、 logged review を経てのみ行う。

**Exception**
- hard-core rights に触れる変更は reject する。
- intelligible rationale を欠く変更は reject する。
- regime transition に関する構造設計は、本ドキュメントのスコープ外とする。

**Metric**
- Unreviewed change count
- Policy change cycle time
- Veto rate
- Hard-core violation count
- Post-change regression rate

## 5要素の完全性検証

以下の表は、各次元が要求された5要素をすべて持っていることを検証するためのものである。

| Dimension | Invariant | Allocation | Protocol | Exception | Metric |
|---|---|---|---|---|---|
| D1 Objective Function | Yes | Yes | Yes | Yes | Yes |
| D2 Legitimacy & Boundary | Yes | Yes | Yes | Yes | Yes |
| D3 Membership & Participation | Yes | Yes | Yes | Yes | Yes |
| D4 Decision Rights & Accountability | Yes | Yes | Yes | Yes | Yes |
| D5 Political Economy & Incentive Compatibility | Yes | Yes | Yes | Yes | Yes |
| D6 Social Order, Culture & Trust | Yes | Yes | Yes | Yes | Yes |
| D7 Human Development, Agency & Meaning | Yes | Yes | Yes | Yes | Yes |
| D8 Operating Model & Role Contracts | Yes | Yes | Yes | Yes | Yes |
| D9 World Model, State & Memory | Yes | Yes | Yes | Yes | Yes |
| D10 Deliberation, Planning & Epistemics | Yes | Yes | Yes | Yes | Yes |
| D11 Actuation Surface | Yes | Yes | Yes | Yes | Yes |
| D12 Safety, Failure, Adversary & Observability | Yes | Yes | Yes | Yes | Yes |
| D13 Meta-Governance & Evolution | Yes | Yes | Yes | Yes | Yes |

結果: `13 / 13` の次元が `5 / 5` 要素を満たしている。

## 因果接続の検証

### Chain A: Objective Function -> Decision Rights -> Actuation Surface -> Incentives

**Claim**
OSが現実を一貫して動かすためには、 objective boundary が decision authority を制約し、 decision authority が actuation を制約し、 actuation の結果が incentive design に接続されていなければならない。

**Validation**
- D1 は、何を最適化してよく、何を禁じるかを定義する。
- D4 は、その境界内で誰が判断を commit できるかを定義する。
- D11 は、その判断がどのように現実を変えるかを定義する。
- D5 は、なぜ主体が canonical path を使い続け、迂回しないかを定義する。

**Failure if missing**
- D1 がなければ、局所効率的だが不当な判断が生まれる。
- D4 がなければ、憲法なき実行になる。
- D11 がなければ、判断が現実を変えない。
- D5 がなければ、 shadow execution と bypass incentive が増殖する。

Status: `Valid within scope`

### Chain B: Membership & Rights -> Decision Rights -> Operating Model -> Human Development -> Legitimacy

**Claim**
人間の参加は宣言だけでは持続しない。権利が authority を形づくり、 authority が日常の operating model を形づくり、その lived work が agency と meaning を保全してはじめて legitimacy が維持される。

**Validation**
- D3 は rights-bearing participant を定義する。
- D4 は、その権利を authority design の中に埋め込む。
- D8 は、その参加を実際の loop と handoff に落とす。
- D7 は、その参加が rubber-stamp に劣化しないようにする。
- D2 は、その継続的な rights practice を legitimacy へ接続する。

**Failure if missing**
- 実効性のない象徴的権利
- 人間レビューの演出化
- deskilling を経た legitimacy collapse

Status: `Valid within scope`

### Chain C: World Model -> Deliberation -> Decision Rights -> Actuation -> Observability -> Meta-Governance

**Claim**
制度知能が成立するには、 canonical state、そこに対する reasoning、 commit の authority、実行面、結果観測、そしてOS自体の governed change が連なっていなければならない。

**Validation**
- D9 は canonical state と provenance を与える。
- D10 はその state 上で reasoning し、 option を生成する。
- D4 は commit を許可または制限する。
- D11 は実行する。
- D12 は観測・監査・異常検知を行う。
- D13 は evidence に基づき soft-shell rule を更新する。

**Failure if missing**
- モデルはあるが行動できない設計
- 安全性を欠く実行
- 憲法的境界を欠いた学習

Status: `Valid within scope`

### Chain D: Legitimacy -> Objective Function -> Political Economy -> Social Order -> Legitimacy

**Claim**
正当性は入力であるだけでなく出力でもある。 legitimacy は objective を拘束し、その objective は分配と incentive を形づくり、その分配は social order を通じて再び legitimacy に返ってくる。

**Validation**
- D2 は外部に対する justification boundary を与える。
- D1 はそれを「何を最適化するか」に翻訳する。
- D5 は誰が利益を受け、誰が負担するかを定める。
- D6 はその制度が lived reality として trustable かどうかを決める。
- その結果が legitimacy に戻る。

**Failure if missing**
- 建前としては正しいが、分配や文化によって社会的に耐えられない制度

Status: `Valid within scope`

## 完成度監査

### 監査基準

1. すべての次元が定義されていること
2. すべての次元が `Invariant / Allocation / Protocol / Exception / Metric` を持つこと
3. 主要な因果連鎖が明示されていること
4. `Metric` によって検証条件が存在すること
5. スコープ内で、制度設計の一次的な領域漏れが存在しないこと

### 監査結果

| Criterion | Result | Notes |
|---|---|---|
| 13 dimensions defined | Pass | 13 / 13 complete |
| 5 elements present in every dimension | Pass | 13 / 13 complete |
| Major causal chains explicit | Pass | 4 core chains validated |
| Verification conditions present | Pass | Every dimension has metrics |
| Scope consistency | Pass with note | Regime-transition design intentionally excluded |

### 残る限界

- これは**平時の完全性仕様**であり、導入・移行・非常時まで含む仕様ではない。
- metric が存在しても、それだけで設計の真理性が証明されるわけではない。
- 具体組織に落としたときには、次元間の矛盾がなお発生しうるため、参照実装による検証が必要である。
- 複数OS間の protocol design は、D2 の legitimacy / boundary に部分的に表現されているが、ここでは全面展開していない。

## 結論

ユーザーが指定したスコープ内では、本仕様は一次設計レベルで complete である。

- 13次元すべてが定義されている
- 13次元すべてが5要素を持つ
- 主要な因果接続が明示されている
- 検証条件が存在する

したがって、ここから先の仕事は、もはやカテゴリ発見ではない。  
残るのは、 refinement、 contradiction testing、 concrete implementation である。

---

## English Version

## Scope

This document defines a steady-state completeness specification for an AI-native institution / OS.

Included:
- 13 concrete design dimensions
- A full answer for each dimension in the form of `Invariant / Allocation / Protocol / Exception / Metric`
- Validation of major causal chains across dimensions
- A completeness audit

Excluded by scope:
- introduction-phase design
- migration-phase design
- emergency-phase redesign
- capability-jump / regime-transition design

Accordingly, Dimension 13 is scoped to **steady-state meta-governance and evolution**, not regime transition.

## Model

This spec uses three levels:

1. `10 layers` as the abstract completeness map
2. `13 dimensions` as the concrete design questions
3. `5 elements` as the required answer schema for each dimension

The goal is not automatic correctness. The goal is to remove first-order question leakage so that remaining risk comes from answer quality and implementation quality.

## 10 Layers

The `10 layers` are the abstract completeness map for an AI-native institution / OS.  
Where the `13 dimensions` ask what must be concretely decided, the `10 layers` classify what kind of institutional reality each design question belongs to.

### L1. Purpose & Legitimacy

This layer defines why the institution exists and to whom it must be justified.  
Its core concerns are purpose, beneficiary hierarchy, external legitimacy, social license, and non-negotiable boundaries.

### L2. Membership, Rights & Constitutional Governance

This layer defines who counts as a participant, who holds rights, and who may decide what.  
It covers membership, rights bundles, authority, appeal, and accountability.

### L3. Political Economy & Incentives

This layer defines how value, cost, rewards, compute, and attention are allocated.  
It is where distributive fairness and anti-bypass incentive design are handled.

### L4. Culture, Trust & Social Order

This layer defines the institution as a durable social order, not merely a control system.  
It covers culture, trust, rituals, informal communication, conflict resolution, and narrative continuity.

### L5. Human Agency, Development & Meaning

This layer defines how humans remain capable, developmental, agentic, and meaningful participants.  
It includes agency preservation, anti-deskilling design, learning, deep work, authorship, and meaningful participation.

### L6. Operating Model & Role Topology

This layer defines how daily work is actually organized through loops, roles, cadences, and handoffs.  
It includes workflow structure, exception handling, manual fallback, meeting design, and role contracts.

### L7. World Model, Knowledge & Deliberation

This layer defines what counts as institutional reality, and how the OS understands, reasons, and forms proposals about it.  
It is the core layer for ontology, state, memory, reasoning, and epistemics.

### L8. Actuation & Interface

This layer defines how decisions change the real organization.  
It includes task creation, permission changes, budget allocation, structural updates, external tool operations, and human-facing interfaces.

### L9. Safety, Resilience & Observability

This layer defines the conditions under which the OS is safe, observable, stoppable, and recoverable.  
Its core concerns include IAM, logging, tracing, sandboxing, anomaly detection, and incident response.

### L10. Meta-Governance & Evolution

This layer defines how the OS itself can change, what may be amended, and what must remain fixed.  
It includes hard-core versus soft-shell distinctions, policy updates, audit structures, amendment rights, and bounded evolution.

### Role of the 10 Layers

The 10 layers are the abstract coordinate system that organizes the 13 dimensions.  
A single dimension may span multiple layers, but no first-order institutional design question should remain outside the map.

## Supporting Modules

This document is the canonical core spec. Detailed design is split into the following modules.

- `10-module-governance-human-participation.md`
  - steady-state detail for D1-D8 and D13
- `11-module-information-ingress-state-and-observability.md`
  - detail for D9-D12, plus state and observability implementation principles

As a rule:

- structural changes belong in this core spec
- operational detail belongs in the modules
- rationale and broader conceptual framing remain in `20-rationale-agi-era-organization-os.md`

## Reference Instantiation

This specification is abstract. It becomes fully testable only when instantiated for a concrete organization type.  
For that reason, this directory maintains the following reference-instance set.

- `40-reference-organization-profile.md`
  - defines the baseline assumptions, customers, offerings, scale, and risk profile of the reference organization
- `41-reference-organization-instantiation.md`
  - assigns concrete values to D1-D13 for that organization
- `42-reference-organization-integrity-audit.md`
  - audits whether the concrete instance is internally consistent with the profile and the core spec

As a rule:

- if the abstract spec changes, verify that `41-` and `42-` still close consistently
- if a second organization type is needed, add a contrasting instance in `43-` and onward

## 13 Dimensions

### D1. Objective Function

**Definition**
Defines what the institution is allowed to optimize, in what order, and what cannot be optimized away.

**Invariant**
The OS must optimize within a bounded objective hierarchy. Human rights, hard red lines, and external legitimacy cannot be traded off for local efficiency.

**Allocation**
- AI proposes objective refinements, tradeoff weights, and resource use plans.
- Human stakeholder representatives approve the beneficiary hierarchy and non-negotiables.
- Domain operators inherit objective constraints but cannot rewrite them locally.

**Protocol**
1. Maintain an explicit purpose statement.
2. Maintain a beneficiary hierarchy.
3. Maintain a ranked objective stack: survival, rights preservation, stakeholder welfare, strategic performance, local efficiency.
4. Maintain explicit non-negotiables and red lines.
5. Review the objective stack on a fixed cadence.

**Exception**
- If objectives conflict and no admissible tradeoff exists, optimization is paused and escalated to D4.
- If a proposed objective violates hard rights or external legitimacy, it is rejected without balancing.

**Metric**
- Goal coherence score
- Red-line violation count
- Objective drift frequency
- Stakeholder welfare delta
- Share of decisions with explicit objective reference

### D2. Legitimacy & Boundary

**Definition**
Defines why the OS is socially acceptable, where its authority begins and ends, and how external actors can inspect or challenge it.

**Invariant**
No institution is legitimate by performance alone. It must remain challengeable, inspectable, and justifiable to affected stakeholders.

**Allocation**
- The OS defines stakeholder classes: public, directly affected, audited, partner institutions.
- External auditors hold inspection rights.
- Affected stakeholders hold challenge rights.
- Regulatory inputs are treated as first-class governance inputs.

**Protocol**
1. Maintain boundary definitions: who is inside, outside, and affected.
2. Maintain three disclosure levels: public, stakeholder, audit.
3. Provide an external challenge channel.
4. Integrate regulatory change into governance parameters.
5. Publish legitimacy reports on a fixed cadence.

**Exception**
- If legitimacy is materially challenged, affected decisions are frozen pending review.
- If regulatory conflict emerges, D4 and D12 jointly determine a compliant fallback.

**Metric**
- External audit pass rate
- Stakeholder challenge resolution time
- Regulatory nonconformance count
- Public trust score
- Percentage of material decisions with externally intelligible rationale

### D3. Membership & Participation

**Definition**
Defines who counts as a participant, who is merely affected, what rights each class holds, and how participation is exercised.

**Invariant**
No human participant may be reduced to a passive system object. Membership implies a rights bundle and a mode of participation.

**Allocation**
- Participants are classified as operators, beneficiaries, affected workers, leadership, partners, and externally affected parties.
- Human participants hold a minimum rights bundle: exit, kill switch, benefit, transparency.
- Participation forums are assigned by stakeholder class.

**Protocol**
1. Maintain a membership registry.
2. Maintain a rights ledger for each stakeholder class.
3. Define participation channels for choice, creation, learning, and relationship.
4. Ensure rights invocation is operationally reachable, not symbolic.

**Exception**
- Conflicting claims between stakeholder classes escalate to D4.
- If a right cannot be exercised in practice, the affected process is treated as non-compliant.

**Metric**
- Rights exercise latency
- Participation rate by stakeholder class
- Unresolved rights violation count
- Percentage of members with active participation channels
- Practical availability of exit and kill switch paths

### D4. Decision Rights & Accountability

**Definition**
Defines who may decide what, under which authority, with what appeal path, and with what responsibility.

**Invariant**
No binding decision exists without explicit authority, accountable ownership, appealability, and an execution boundary.

**Allocation**
- AI and human actors are assigned authority through an explicit matrix.
- Autonomy Modes determine required human participation.
- Independent audit holds review rights over material decisions.

**Protocol**
1. All binding decisions are recorded in a decision ledger.
2. Each decision carries authority basis, accountable owner, affected parties, and appeal path.
3. Autonomy Mode is computed from trust, risk, novelty, uncertainty, and agency impact.
4. Appeals and overrides follow a fixed procedure.

**Exception**
- Conflicting authorities trigger tie-break escalation.
- Rights-impacting decisions above threshold require stronger human participation.
- Immediate kill switch invocation bypasses normal approval and is reviewed after the fact.

**Metric**
- Unowned binding decisions count
- Appeal reversal rate
- Override frequency
- Time to decision by risk class
- Share of material decisions with explicit accountable owner

### D5. Political Economy & Incentive Compatibility

**Definition**
Defines how value, cost, compute, attention, and rewards are allocated, and why humans and AI agents do not route around the OS.

**Invariant**
The OS must not rely on goodwill for compliance. Incentives must make canonical behavior cheaper and shadow behavior more expensive.

**Allocation**
- Human participants receive a minimum benefit floor.
- Compute and attention budgets are explicitly allocated.
- Contribution accounting is used for visibility, not as the sole moral basis of distribution.
- Teams and agents are rewarded for write-back, traceability, and policy compliance.

**Protocol**
1. Maintain minimum benefit guarantees.
2. Maintain compute budget allocation rules.
3. Maintain attention budget allocation rules.
4. Reward canonical write paths and penalize shadow ingress.
5. Track human and AI contribution without collapsing rights into contribution.

**Exception**
- If incentives create gaming or bypass, the affected scheme is suspended and repriced.
- If the benefit floor is violated, related allocations are treated as invalid.

**Metric**
- Shadow work ratio
- Benefit floor compliance
- Canonical write-path usage rate
- Compute budget fairness index
- Incentive gaming incident count

### D6. Social Order, Culture & Trust

**Definition**
Defines the institution as a durable social order, not just a control system.

**Invariant**
Trust, conflict resolution, and narrative coherence are first-class operating conditions, not optional side effects.

**Allocation**
- Specific bodies maintain norms, rituals, and conflict mediation.
- Informal communication space is intentionally reserved.
- Cultural memory is curated as a shared asset.

**Protocol**
1. Maintain norms and rituals.
2. Maintain conflict resolution protocols.
3. Maintain cultural memory of major successes, failures, and value shifts.
4. Protect informal human communication spaces.

**Exception**
- Trust collapse, factionalism, or unresolved conflict triggers cultural intervention.
- If informal space becomes a shadow governance path, D5 and D12 intervene.

**Metric**
- Trust index
- Conflict resolution time
- Belonging score
- Cultural memory update cadence
- Share of conflicts resolved within protocol

### D7. Human Development, Agency & Meaning

**Definition**
Defines how humans remain authors, learners, and meaningful participants rather than rubber-stamp reviewers.

**Invariant**
The institution must preserve meaningful opportunities for choice, creation, learning, and relationship.

**Allocation**
- Humans receive protected deep-work time.
- Learning budgets and apprenticeship channels are reserved.
- Human authorship and editing rights are explicitly protected where relevant.

**Protocol**
1. Maintain a skill ladder.
2. Maintain apprenticeship and mentoring modes.
3. Maintain deep-work protection and cognitive load limits.
4. Expose AI reasoning in human-comprehensible form where needed for learning.
5. Reserve meaningful participation points, not just review obligations.

**Exception**
- Deskilling signals, overload, or loss of authorship trigger reduced automation and skill restoration measures.
- If humans are reduced to unreadable approvals, the design is non-compliant.

**Metric**
- Deskilling risk index
- Deep-work hours preserved
- Learning progression rate
- Human authorship participation rate
- Cognitive overload incident count

### D8. Operating Model & Role Contracts

**Definition**
Defines how day-to-day work is actually structured: loops, cadences, handoffs, fallbacks, and role contracts.

**Invariant**
Every recurring institutional activity must have an explicit loop, an explicit handoff contract, and an explicit fallback.

**Allocation**
- Roles are assigned across human participants, AI operators, audit actors, and exception forums.
- Each workflow has a cadence owner and an exception owner.

**Protocol**
1. Organize work as loops rather than departments alone.
2. Define human/AI handoff contracts.
3. Define meeting redesign, exception handling, and manual fallback.
4. Attach service levels and escalation points to each loop.

**Exception**
- Handoff failure, role ambiguity, or exception backlog triggers fallback mode and process redesign.
- If a workflow has no accountable exception owner, it is incomplete.

**Metric**
- Loop completion rate
- Handoff failure rate
- Exception backlog size
- Manual fallback success rate
- Meeting load per participant

### D9. World Model, State & Memory

**Definition**
Defines the official ontology, state model, memory types, provenance rules, and canonical read/write surfaces.

**Invariant**
Only canonical state with provenance may drive binding decisions and actions.

**Allocation**
- Authoritative sources are assigned for state, decisions, action traces, and governance data.
- Ontology ownership is explicit.
- Private agent memory is prohibited for institutionally material state.

**Protocol**
1. Maintain official ontology and schemas.
2. Maintain a six-plane architecture: reality, semantic, memory, decision, action, governance.
3. Require provenance on all institutionally material data.
4. Define canonical write surfaces and unified retrieval surfaces.

**Exception**
- Missing provenance, schema conflict, or shadow state triggers quarantine and reconciliation.
- If two competing sources of truth exist, no binding downstream action is permitted.

**Metric**
- Provenance completeness
- Canonicalization latency
- Orphan state count
- Retrieval precision/recall for official state
- Duplicate source-of-truth incident count

### D10. Deliberation, Planning & Epistemics

**Definition**
Defines how the institution senses, interprets, reasons, compares options, handles uncertainty, and forms proposals.

**Invariant**
Every material proposal must carry assumptions, expected value, side effects, failure conditions, rollback logic, required authority, and stakeholder impact.

**Allocation**
- AI performs default sensemaking and option generation.
- Human participation is inserted according to Autonomy Mode and rights impact.
- Active Extraction is reserved for blind spots AI cannot reliably observe.

**Protocol**
1. Run the loop: Constitution Load -> Sense -> Understand -> Deliberate -> Gate.
2. Use the world model and memory as reasoning substrate.
3. Generate multiple options where material tradeoffs exist.
4. Explicitly score uncertainty, novelty, and agency impact.

**Exception**
- High uncertainty, high novelty, or high rights impact escalates to stronger human participation.
- If no rollback path exists, the proposal is treated as high-risk.

**Metric**
- Assumption validity score
- Value alignment score
- Forecast error
- Active Extraction rate
- Share of material proposals with multi-option comparison

### D11. Actuation Surface

**Definition**
Defines how decisions change the real institution: tasks, permissions, budgets, org structure, external systems, and communications.

**Invariant**
No decision is real until it is committed through a controlled actuation surface with permissions, reversibility rules, and traceability.

**Allocation**
- Tool permissions are explicitly scoped by role and agent.
- Budget, staffing, access, and communication control paths are assigned.
- Only designated write paths may modify institutional state.

**Protocol**
1. Attach a commit path to every binding decision.
2. Require canary rollout, rate limiting, kill switch, and rollback plan for material actions.
3. Record action traces and link them back to decisions and state.

**Exception**
- Unauthorized actuation is treated as an incident.
- Irreversible actions without approved safeguards are blocked.

**Metric**
- Actuation latency
- Rollback success rate
- Unauthorized actuation count
- Decision-to-action traceability rate
- Drift between approved decision and executed action

### D12. Safety, Failure, Adversary & Observability

**Definition**
Defines how the OS remains observable, stoppable, auditable, resilient, and resistant to both accidental and adversarial failure.

**Invariant**
Every critical behavior must be observable, attributable, stoppable, and recoverable.

**Allocation**
- IAM scopes define minimum privilege.
- Monitoring and incident ownership are explicit.
- Red-team and anomaly review responsibilities are assigned.

**Protocol**
1. Maintain logging, tracing, anomaly detection, and audit trails.
2. Maintain sandboxing for untrusted agents or domains.
3. Maintain incident detection, classification, containment, recovery, and postmortem flow.
4. Detect shadow ingress and off-channel binding behavior.

**Exception**
- Incidents trigger severity-based containment.
- Stop-right invocation bypasses normal flow and is reviewed after the fact.
- If observability falls below threshold, relevant automation is downgraded.

**Metric**
- Mean time to detect
- Mean time to recover
- Safety metric trend
- Stop-right exercise frequency
- Audit coverage rate

### D13. Meta-Governance & Evolution

**Definition**
Defines how the OS updates its policies, thresholds, models, and soft rules in steady state without violating hard constraints.

**Invariant**
Hard-core human rights are not amendable. Soft-shell rules may change only through an explicit review and approval process.

**Allocation**
- Proposal rights may belong to AI or humans.
- Review rights belong to an independent mixed body.
- Approval rights belong to stakeholder-authorized humans.
- Veto rights belong to affected stakeholders.

**Protocol**
1. Maintain a hard-core / soft-shell distinction.
2. Maintain a policy and model update pipeline.
3. Require intelligible explanation, peer AI review, consequence translation, and canary rollout for material changes.
4. Update trust, thresholds, and procedures only through logged review.

**Exception**
- Any change that touches hard-core rights is rejected.
- Any change without intelligible rationale is rejected.
- Structural regime-transition design is out of scope for this document.

**Metric**
- Unreviewed change count
- Policy change cycle time
- Veto rate
- Hard-core violation count
- Post-change regression rate

## Validation of 5-Element Completeness

The table below verifies that each dimension contains all required answer elements.

| Dimension | Invariant | Allocation | Protocol | Exception | Metric |
|---|---|---|---|---|---|
| D1 Objective Function | Yes | Yes | Yes | Yes | Yes |
| D2 Legitimacy & Boundary | Yes | Yes | Yes | Yes | Yes |
| D3 Membership & Participation | Yes | Yes | Yes | Yes | Yes |
| D4 Decision Rights & Accountability | Yes | Yes | Yes | Yes | Yes |
| D5 Political Economy & Incentives | Yes | Yes | Yes | Yes | Yes |
| D6 Social Order, Culture & Trust | Yes | Yes | Yes | Yes | Yes |
| D7 Human Development, Agency & Meaning | Yes | Yes | Yes | Yes | Yes |
| D8 Operating Model & Role Contracts | Yes | Yes | Yes | Yes | Yes |
| D9 World Model, State & Memory | Yes | Yes | Yes | Yes | Yes |
| D10 Deliberation, Planning & Epistemics | Yes | Yes | Yes | Yes | Yes |
| D11 Actuation Surface | Yes | Yes | Yes | Yes | Yes |
| D12 Safety, Failure, Adversary & Observability | Yes | Yes | Yes | Yes | Yes |
| D13 Meta-Governance & Evolution | Yes | Yes | Yes | Yes | Yes |

Result: `13 / 13` dimensions have all `5 / 5` required answer elements.

## Causal Validation

### Chain A: Objective Function -> Decision Rights -> Actuation Surface -> Incentives

**Claim**
The OS can only move reality coherently if objective boundaries constrain decision authority, decision authority constrains actuation, and actuation outcomes feed incentive design.

**Validation**
- D1 defines what is allowed to be optimized and what is forbidden.
- D4 defines who may authorize decisions inside those bounds.
- D11 defines how authorized decisions change institutional reality.
- D5 defines why actors continue to use those canonical paths instead of routing around them.

**Failure if missing**
- Without D1: locally efficient but illegitimate decisions.
- Without D4: action without constitutional authority.
- Without D11: decisions that never change reality.
- Without D5: shadow execution and bypass incentives.

Status: `Valid within scope`

### Chain B: Membership & Rights -> Decision Rights -> Operating Model -> Human Development -> Legitimacy

**Claim**
Human participation is not sustained by declaration alone. Rights must shape authority, authority must shape day-to-day work, and lived work must preserve agency and meaning to sustain legitimacy.

**Validation**
- D3 defines rights-bearing participants.
- D4 ensures those rights are recognized in authority design.
- D8 places participation in real loops and handoffs.
- D7 prevents participation from degrading into rubber-stamping.
- D2 converts sustained rights practice into external and internal legitimacy.

**Failure if missing**
- Symbolic rights without operational force
- Human review theater
- Deskilling and eventual legitimacy collapse

Status: `Valid within scope`

### Chain C: World Model -> Deliberation -> Decision Rights -> Actuation -> Observability -> Meta-Governance

**Claim**
Institutional intelligence requires canonical state, reasoning over that state, authority to commit, a real execution path, observation of outcomes, and governed change of the OS itself.

**Validation**
- D9 provides canonical state and provenance.
- D10 reasons over that state and generates governed options.
- D4 authorizes or restricts commitment.
- D11 executes.
- D12 observes, audits, and detects failures.
- D13 updates soft-shell rules based on evidence.

**Failure if missing**
- Model-rich but action-poor design
- Unsafe execution
- Learning without constitutional boundary

Status: `Valid within scope`

### Chain D: Legitimacy -> Objective Function -> Political Economy -> Social Order -> Legitimacy

**Claim**
Legitimacy is not only an input; it is also an output of distribution and social order.

**Validation**
- D2 sets the institution's external justification boundary.
- D1 translates that into what can be optimized.
- D5 determines who actually benefits and who bears cost.
- D6 determines whether people experience the institution as trustworthy and livable.
- The resulting legitimacy feeds back into D2.

**Failure if missing**
- A nominally justified institution that becomes socially intolerable through distribution or culture

Status: `Valid within scope`

## Completeness Audit

### Audit Criteria

1. Every dimension is defined.
2. Every dimension contains `Invariant / Allocation / Protocol / Exception / Metric`.
3. Major causal chains are explicit.
4. Verification conditions exist through metrics.
5. No first-order domain of institutional design is left unmodeled within scope.

### Audit Result

| Criterion | Result | Notes |
|---|---|---|
| 13 dimensions defined | Pass | 13 / 13 complete |
| 5 elements present in every dimension | Pass | 13 / 13 complete |
| Major causal chains explicit | Pass | 4 core chains validated |
| Verification conditions present | Pass | Every dimension has metrics |
| Scope consistency | Pass with note | Regime-transition design intentionally excluded |

### Remaining Limits

- This is a **steady-state completeness design**, not an introduction or migration design.
- Metrics prove measurability, not truth by themselves.
- Cross-dimensional contradictions can still emerge during concrete implementation and must be tested in a reference organization.
- External multi-OS protocol design is only partially represented through D2 legitimacy and boundary, not fully elaborated here.

## Conclusion

Within the user's stated scope, this specification is complete at the first-order design level:

- all 13 dimensions are defined
- all 13 dimensions have all 5 answer elements
- major causal chains are explicit
- verification conditions exist

Therefore, remaining work is no longer category discovery. It is refinement, contradiction testing, and concrete implementation.
