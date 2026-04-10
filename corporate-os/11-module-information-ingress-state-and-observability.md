# AI-native Institution / OS Module
## Information Ingress, State, and Observability (Steady-State)

## 役割

本ドキュメントは、AI-native institution / OS のうち、情報の入口、正規化、状態管理、検索、観測可能性を扱う詳細モジュールである。

このモジュールが正本として扱う範囲:
- D9 `World Model, State & Memory`
- D10 `Deliberation, Planning & Epistemics` の入力基盤部分
- D11 `Actuation Surface` の状態書き込み・行動追跡部分
- D12 `Safety, Failure, Adversary & Observability`

親仕様:
- `00-core-ai-native-institution-os-complete-spec.md`

関連モジュール:
- `10-module-governance-human-participation.md`

主要な source material:
- `archive/neural-organization-information-ingress-architecture-v2.md`
- `archive/neural-organization-information-ingress-architecture.md`

このモジュールが定義しないもの:
- 人間の権利原理そのもの
- 受益権・分配原理そのもの
- 文化・意味・主体性の上位原理
- 導入期・移行期・非常時設計

## 1. Core Principle

制度に流入する情報は、そのままでは制度状態を更新してはならない。  
raw signal は、定義された sensing surface で受け取られ、 canonicalization を経て初めて institutional state に変換される。

このモジュールの中心命題は次である。

> 未正規化情報は、制度の意思決定・実行・記憶を駆動してはならない。

## 2. Five Operating Principles

### 2.1 Sensing surface must be enumerable

業務目的で使われる情報チャネルは、少なくとも制度的には有限集合として管理可能でなければならない。  
「全ての入口を抑える」とは、チャネルを一つにすることではなく、**計測可能な面に閉じる**ことである。

### 2.2 Transport and state must be separated

チャット、会議、メール、録画、ファイルは carrier であり、そのまま制度状態ではない。  
この区別が崩れると、 ghost state が増殖する。

### 2.3 Write surfaces must be limited

state を変更できる経路は、 canonical write surface に限定する。  
感知面が広くても、効力を持つ書き込み面は少なくなければならない。

### 2.4 Retrieval should be unified

制度状態の読み取りは、 permission-aware な単一 retrieval surface に集約する。  
検索面が分散すると、「存在しているが実質的に見えない」状態が常態化する。

### 2.5 Canonicalization is an obligation

正規化は善意ではなく制度義務である。  
actionable / binding / reusable な signal は、SLA 内に正規化されなければならない。

## 3. Sensing Surface

### 3.1 Channel classes

感知面は、少なくとも次の4種に分類する。

- `primary channels`: 日常業務の主要流通面
- `secondary channels`: 補助的だが制度上認識される面
- `system channels`: システム対システムのイベント流入
- `external intake channels`: 社外シグナルの取込面

### 3.2 Channel register

全チャネルは channel register に登録し、少なくとも次を持つ。

- channel id
- owner
- signal types
- canonicalization method
- integration method
- review cycle
- policy status

### 3.3 Shadow ingress control

shadow ingress を放置すると、最終的に制度は正規ルートより非公式ルートで動くようになる。  
そのため、少なくとも次を行う。

- approved / unapproved channel の明示
- CASB / network log / survey による検出
- off-channel binding behavior の監査
- 発見時の是正プロセス

## 4. Canonicalization

### 4.1 Classification standard

signal は次の問いで分類する。

- actionable か
- binding か
- reusable か
- none か

ただし、制度の公式世界モデルは Task / Decision / Knowledge の3つだけでは足りない。  
最小でも次のオブジェクト群を持つ。

- `entity`
- `relationship`
- `commitment`
- `decision`
- `policy`
- `knowledge`
- `capability`
- `skill`
- `risk`
- `artifact reference`

Task / Decision / Knowledge は presentation 上の基本オブジェクトとして残せるが、 state model 全体はより広い ontology を必要とする。

ここでいう `skill` は、単なる prompt 断片ではない。  
`skill` は、 memory に蓄積された手順・評価知・コード・テンプレートを、 workflow で再利用可能な executable capability unit として束ねた自己完結型パッケージである。

### 4.2 Canonicalization flow

標準フローは次である。

1. capture
2. classify
3. deduplicate
4. enrich
5. permission assign
6. route
7. commit
8. notify
9. measure SLA

### 4.3 Enrichment

制度上意味を持つ state にするため、少なくとも次の補完が必要である。

- ownership
- scope
- due or review timing
- sensitivity
- stakeholder impact
- provenance
- linked objects

### 4.4 Human insertion

正規化の途中で人間を入れるべきなのは、単に AI 精度が低い時だけではない。  
次の場合には人間参加を挿入する。

- 権利影響が高い
- 前例が少ない
- 暗黙知が重要
- 政治的・対人的文脈が大きい

## 5. World Model and State

### 5.1 Six-plane architecture

state は少なくとも次の6面で管理する。

- `Reality plane`
- `Semantic plane`
- `Memory plane`
- `Decision plane`
- `Action plane`
- `Governance plane`

### 5.2 Authoritative state rules

制度上の正本は、物理的に一つのDBである必要はない。  
必要なのは、各オブジェクトに authoritative source があり、その source が一意に定義されていることである。

### 5.3 Provenance

全ての制度上重要な状態は provenance を持つ。

最低限必要な provenance:

- created by
- created at
- source signal
- authority basis
- last updated by
- update reason

### 5.4 Private memory prohibition

agent が制度上重要な判断根拠や状態を私有メモリに保持してはならない。  
重要な記憶は shared institutional memory に外部化され、監査可能でなければならない。

### 5.5 Skill assets

skill は、 memory と workflow の中間に置かれる制度資産である。  
memory が「知っていること」を保持し、 workflow が「回す流れ」を保持するのに対し、 skill は「再利用可能に実行できるやり方」を保持する。

制度は、少なくとも次の3層で skill を管理する。

- `Skill taxonomy`: skill のカテゴリ、タグ、利用条件
- `Skill relation graph`: skill 間の意味的・運用的関係
- `Skill package library`: 実際に配布・実行される package

最低限の relation type:

- `similar_to`
- `belong_to`
- `compose_with`
- `depend_on`

skill は、 knowledge や artifact reference の特殊ケースではなく、 version・ provenance・ approval state を持つ独立オブジェクトとして扱う。

## 6. Retrieval Surface

### 6.1 Unified retrieval

retrieval surface は一つでよいが、背後の storage は複数でよい。  
利用者が「どこを見るか」に迷わないことが重要である。

### 6.2 Permission awareness

検索は role / rights / need-to-know に応じて permission-aware でなければならない。  
単なる全文検索は、制度検索としては不十分である。

### 6.3 Retrieval semantics

最低限、検索は次の3モードを持つ。

- `state lookup`: 現在有効な状態を引く
- `decision trace`: なぜそうなったかを辿る
- `evidence retrieval`: 根拠となる知識・artifact を引く
- `skill discovery`: relevant skill の候補を引く

skill discovery は全文検索では足りない。  
少なくとも metadata、 relation graph、 permission、 version state を踏まえて、 activation 候補を返す必要がある。

## 7. Deliberation Input Layer

本モジュールは deliberation そのものの全体を定義しないが、 deliberation の入力条件は定義する。

material deliberation は、少なくとも次の入力を要求する。

- current state snapshot
- linked prior decisions
- relevant policy constraints
- risk view
- stakeholder view
- provenance-complete evidence
- relevant skill candidates

relevant skill が存在する場合、 deliberation はその skill の利用条件、 relation、 version、 failure history を参照しなければならない。  
新規性が高く skill が存在しない場合にのみ、 zero-base の探索を正当化できる。

この条件を満たさない deliberation は、制度的には低品質とみなす。

## 8. Actuation State Contract

### 8.1 State change as a contract

actuation は単なる API call ではなく、制度状態の変更契約である。  
全ての action は次を持つ。

- linked decision
- linked state objects
- execution identity
- permission scope
- rollback plan
- observable trace

### 8.2 Commit semantics

決定と actuation のあいだには、 commit semantics が必要である。

- proposed
- approved
- committed
- observed
- confirmed
- rolled back

この遷移を持たない actuation は、制度的には不完全である。

## 9. Safety and Observability

### 9.1 Minimum controls

最低限必要な安全制御は次の通りである。

- IAM
- logging / tracing
- sandboxing
- anomaly detection
- kill switch
- rollback
- incident pipeline

加えて、 reusable skill に対しては activation 前の評価ゲートが必要である。  
最低限、次の軸で評価する。

- `safety`
- `completeness`
- `executability`
- `maintainability`
- `cost-awareness`

未評価 skill、低評価 skill、新規生成 skill は、少なくとも sandbox か human-reviewed mode に制限する。

### 9.2 Observability classes

観測は次の4種類に分ける。

- `performance observability`
- `decision observability`
- `safety observability`
- `agency observability`

### 9.3 Failure classes

最低限、 failure は次に分類する。

- misclassification
- state drift
- unauthorized write
- hidden off-channel agreement
- degraded retrieval
- blind execution
- audit gap
- poisoned skill activation
- stale skill reuse
- broken skill composition

## 10. Metrics

このモジュールの状態は、少なくとも次で監視する。

- sensing surface coverage
- shadow ingress detection rate
- canonicalization SLA attainment
- provenance completeness
- duplicate source-of-truth count
- retrieval success rate
- decision-to-action traceability rate
- mean time to detect
- mean time to recover
- rollback success rate
- agency-impact incident count
- skill evaluation pass rate
- skill reuse rate
- stale skill package count

## 11. Canonical Relationships

このモジュールは、次の位置づけで読む。

- `core spec` が全体の正本
- 本モジュールが D9-D12 の詳細正本
- `10-module-governance-human-participation.md` が D1-D8 と D13 平時部分の詳細正本
- 旧 `neural-organization-information-ingress-architecture-v2.md` は source archive として保持する

## 12. Validation Hooks

このモジュールの妥当性は、次を満たしているかで検証する。

- 制度的に重要な全 signal class が sensing register に入っているか
- 未正規化 signal が binding action を駆動していないか
- private memory が制度 state を隠し持っていないか
- retrieval surface が state / trace / evidence を一貫して返せるか
- actuation trace が decision と rollback plan に接続されているか
- shadow ingress と unauthorized write が監査上検出できるか
