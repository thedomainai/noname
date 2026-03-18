# AI-native Institution / OS Module
## Governance, Human Participation, and Institutional Order (Steady-State)

## 役割

本ドキュメントは、AI-native institution / OS のうち、主に上位制度層と人間参加層を扱う詳細モジュールである。

このモジュールが正本として扱う範囲:
- D1 `Objective Function`
- D2 `Legitimacy & Boundary`
- D3 `Membership & Participation`
- D4 `Decision Rights & Accountability`
- D5 `Political Economy & Incentive Compatibility`
- D6 `Social Order, Culture & Trust`
- D7 `Human Development, Agency & Meaning`
- D8 `Operating Model & Role Contracts`
- D13 `Meta-Governance & Evolution` の平時部分

親仕様:
- `00-core-ai-native-institution-os-complete-spec.md`

主な依存:
- L1-L6, L10 の抽象定義
- D9-D12 を扱う情報・状態・可観測性モジュール

このモジュールが定義しないもの:
- 感知面・正規化・状態管理・検索面・可観測性の技術詳細
- 導入期・移行期・非常時・能力ジャンプ時の制度設計

## 1. Objective Function

### 1.1 基本原理

制度は、単に「高い成果を出すこと」を目的としてはならない。  
最適化されるべき対象には順位があり、また、そもそも最適化の対象にしてはならないものがある。

本OSでは、目的を次の5層で定義する。

1. 人間の不可譲渡な権利の保全
2. 制度の継続可能性
3. 主要ステークホルダーの福祉
4. 戦略目標の達成
5. 局所的な効率改善

この順序は、下位が上位を侵してよいことを意味しない。  
むしろ、下位の最適化は常に上位の制約の内側でのみ許容される。

### 1.2 受益者階層

受益者は一様ではない。制度が生む利益と不利益を誰が引き受けるかに応じて、明示的な beneficiary hierarchy を持つ。

最低限、次の区分を持つ。

- 組織内部の人間参加者
- 顧客・利用者
- 直接の取引先・パートナー
- 規制・監督主体
- 広義の社会

局所的な事業KPIは、この階層を飛び越えて優先されてはならない。

### 1.3 禁止事項

次の項目は、 trade-off の対象にしてはならない。

- 離脱権の否定
- 停止権の無効化
- 受益権の空洞化
- 知る権利の形骸化
- 重大な法規制違反
- 意図的な shadow governance
- 監査不能な意思決定の常態化

## 2. Legitimacy and Boundary

### 2.1 正当性の原理

制度の正当性は、内部効率ではなく、外部から見た説明可能性、 challengeability、 auditability によって支えられる。

本OSでは、正当性を次の3条件で扱う。

- 説明可能であること
- 異議申立て可能であること
- 監査可能であること

### 2.2 境界定義

制度境界は、少なくとも次の3種類で定義する。

- `membership boundary`: 誰が制度参加者か
- `authority boundary`: どの判断が制度の効力を持つか
- `responsibility boundary`: どの帰結まで制度が引き受けるか

境界が曖昧なままでは、責任も権利も正当性も空洞化する。

### 2.3 外部インターフェース

平時における外部正当性のため、制度は次を持たなければならない。

- 公開用の原理開示
- 利害関係者向けの要約開示
- 監査主体向けの完全開示
- 外部異議申立て窓口
- 規制変更を governance input として取り込む経路

## 3. Membership, Rights, and Participation

### 3.1 メンバーシップ

メンバーシップは雇用関係に限定されない。  
制度により継続的に影響を受け、権利を行使し、受益または不利益を受ける主体を membership の設計対象に含める。

少なくとも次のクラスを定義する。

- core participants
- affected workers
- beneficiaries
- external affected parties
- auditors

### 3.2 人間の4権利

人間参加者に対する不可譲渡な最低権利は次の4つである。

- `Exit right`
- `Kill switch right`
- `Benefit right`
- `Transparency right`

これらは能力に基づくものではなく、帰結の引受人であることに基づく。

### 3.3 参加形式

人間の参加を review task に還元してはならない。  
参加は少なくとも次の4形式で与える。

- `choice`: 重要な選択肢に関与する
- `creation`: AI生成物に意味を与える
- `learning`: 判断根拠や構造を学ぶ
- `relationship`: 人間同士の信頼形成に参加する

## 4. Decision Rights and Accountability

### 4.1 権威の根拠

権威の根拠は単一ではなく、次の3原理の複合で扱う。

- `beneficiary principle`
- `capability principle`
- `procedural principle`

平時の steady-state では、 beneficiary と procedural を常に維持し、 capability は委譲範囲の拡張原理として用いる。

### 4.2 判断権の構造

全ての binding decision は、次を持たなければならない。

- authority basis
- accountable owner
- affected parties
- appeal path
- execution boundary
- rollback expectation

### 4.3 Autonomy Mode

判断権の具体的な運用は、 Autonomy Mode によって制御する。

- `A1`: Full auto
- `A2`: Auto + post-audit
- `A3`: HOTL
- `A4`: HITL
- `A5`: Human-only
- `A0`: Sandbox only

自律度の問いは「AIにどこまで任せるか」ではなく、「どこで人間の参加を挿入するか」として扱う。

### 4.4 責任の帰属

責任は次の3層に分けて記録する。

- `constitutional responsibility`: この判断権を誰が制度上与えたか
- `operational responsibility`: 実際に誰が実行責任を持つか
- `review responsibility`: 誰が事後検証を担うか

## 5. Political Economy and Incentive Compatibility

### 5.1 分配原理

分配は後工程ではなく、制度の正統性そのものの一部である。

平時の制度では、少なくとも次を明示する。

- 最低受益保証
- 追加分配の原理
- compute budget 配分原理
- attention budget 配分原理
- 高価値資源の優先順位

### 5.2 迂回を防ぐ設計

OSが使われ続けるためには、 canonical path の方が安く、速く、評価され、 shadow path の方が不利でなければならない。

従って、次の設計を取る。

- 正規ルートの write-back を評価に組み込む
- shadow ingress を監査対象にする
- state を書き換えられる経路を制限する
- 検索と参照の利便性を正規ルートに集中させる

### 5.3 contribution accounting の位置づけ

人間とAIの contribution は追跡する。  
ただし、 contribution は visibility のために使い、 rights や最低受益の根拠そのものにはしない。

## 6. Social Order, Culture, and Trust

### 6.1 社会秩序としての制度

制度は control plane だけでは成立しない。  
継続的な所属、信頼、物語、儀礼が必要である。

### 6.2 文化設計

最低限、次を持つ。

- norms and rituals
- conflict resolution protocol
- cultural memory
- informal communication space

### 6.3 trust loop

信頼は宣言ではなくループで維持される。

1. 判断根拠が見える
2. 異議申立てができる
3. 修正が反映される
4. その履歴が共有される

このループがない制度は、効率的でも長期的には敵対の対象になる。

## 7. Human Development, Agency, and Meaning

### 7.1 意味の4機会

人間が制度の中で意味を保つため、少なくとも次の4機会を制度的に保証する。

- 選択の機会
- 創造の機会
- 学習の機会
- 関係の機会

### 7.2 deskilling 防止

平時であっても、 deskilling は静かに進行する。  
そのため、次を必須要素とする。

- skill ladder
- apprenticeship mode
- deep work protection
- cognitive load control
- AI reasoning の理解可能な提示

### 7.3 参加の質

人間を「AIの提案を読む係」にしてはならない。  
人間参加の品質は、 review 回数ではなく、 meaningful intervention の質で評価する。

## 8. Operating Model and Role Contracts

### 8.1 ループ起点設計

制度運用は部署起点ではなく loop 起点で設計する。

平時の標準 loop:

1. Constitution Load
2. Sense
3. Understand
4. Deliberate
5. Gate
6. Act
7. Observe
8. Reflect
9. Evolve

### 8.2 role contract

各 loop は次を明示する。

- who initiates
- who can veto
- who is accountable
- who reviews after the fact
- what fallback exists

### 8.3 例外処理

平時の制度でも例外は必ず起きる。  
例外は「通常フローの失敗」ではなく、独立した設計対象として扱う。

各 loop には次が必要である。

- exception owner
- escalation path
- manual fallback
- recovery condition

## 9. Meta-Governance and Evolution

### 9.1 hard-core / soft-shell

平時におけるメタガバナンスは、 hard-core と soft-shell を分けることで成立する。

`hard-core`:
- 人間の4権利
- hard-core 自体の改定禁止

`soft-shell`:
- threshold
- parameter
- process
- evaluation rule
- authority ratio

### 9.2 改定権の分離

改定権は少なくとも次の4つに分離する。

- proposal
- review
- approval
- veto

これらを単一主体に集中させると、制度改定が自己正当化へ流れる。

### 9.3 平時における進化

平時の進化は、次の順でのみ許容する。

1. 観測
2. 評価
3. 変更案生成
4. 影響説明
5. 審査
6. 限定適用
7. 定着またはロールバック

## 10. Canonical Relationships

このモジュールは、次の関係で読む。

- `core spec` が全体の正本
- 本モジュールが D1-D8 と D13 平時部分の詳細正本
- `11-module-information-ingress-state-and-observability.md` が D9-D12 の詳細正本
- `20-rationale-agi-era-organization-os.md` は理論的背景
- `30-appendix-neural-organization-design-scope-analysis.md`、`31-appendix-agi-era-organization-os-v2-issues.md`、`32-appendix-agi-era-organization-os-v3-structure.md` は論点ログと分析補助

## 11. Validation Hooks

このモジュールの妥当性は、少なくとも次で検証する。

- rights exercise latency が制度上の許容範囲に収まっているか
- decision ledger に authority / accountability / appeal が欠けていないか
- benefit floor が実効的に守られているか
- deep work と learning の機会が実際に残っているか
- shadow governance が文化層や informal space に侵入していないか
- soft-shell の変更が hard-core を実質的に侵食していないか
