# Neural Organizationをベースとした組織の情報入口統制設計
_Final / 2026-03-08_

## この文書の目的

この文書は、このセッションでの議論を振り返りながら、最終的なユーザーゴールである  
**「neural organizationをベースとして組織の情報の入り口を全て抑える設計」**  
を達成するための、理論として正しく、運用に落ち、かつツールまで定義可能な設計書としてまとめ直したものです。

本文書は、初期の「ツール起点・Atlassian前提」の寄りを明確に修正し、  
**原理 → 情報モデル → 統制ルール → 実装例**  
の順に再構成しています。

---

## 0. エグゼクティブサマリー

この設計の中核は、次の一文に尽きます。

> **入力は多くてよい。公式書き込みは少なく、検索は一つ。**

より厳密には、次です。

> **あらゆる生の信号を、Task・Decision・Knowledge という少数の公式オブジェクトに正規化し、  
> その正規化された状態だけが組織に効力を持つようにする。**

つまり、「情報の入口を全て抑える」とは、Slack・会議・メール・外部情報をひとつの箱に集めることではありません。  
**組織状態を書き換えてよい経路を限定すること**です。

この設計を neural organization として捉えるなら、組織は次のように振る舞います。

- 感知は分散する
- 解釈は正規化される
- 記憶は論理的に集中する
- 行動は再び分散する

この構図は、Atlassian が networked teams / single source of truth の文脈で示している「オペレーションを分散し、情報を集中する」という考え方とも整合します。Atlassian は networked teams の中核として central knowledge base を置き、SSoT を「同じ情報にアクセスできる状態」として説明しています。[^1][^2]

---

## 1. このセッションで得られた重要な修正点

このセッションを通じて、最初の案から次の4点を修正する必要があることが明確になりました。

### 1.1 ツールから入るのは誤り
最初の案は、Jira / Slack / Confluence のようなツールを軸にしすぎていました。  
しかし本来の設計順序は次です。

```text
原理
→ 情報型
→ 状態遷移
→ 統制ルール
→ ツール
```

ツールは「設計を実装する手段」であり、設計そのものではありません。

### 1.2 会議・チャット・メールは「情報型」ではない
会議、チャット、メール、DM、ファイルは、情報そのものの型ではなく  
**運搬チャネル / キャリア**です。

ここを誤ると、「会議記録」や「Slack会話」がそのまま公式状態だと誤認し、  
「会議で決まったはず」「Slackで頼んだはず」という幽霊状態が発生します。

### 1.3 external は公式オブジェクトではない
外部記事、顧客の声、市場ニュース、監視アラート、法令更新はすべて重要ですが、  
それ自体は組織状態ではありません。  
それらは **signal（信号）** であり、組織に効力を持つには正規化が必要です。

### 1.4 SSoT は「物理的に1つのDB」ではない
SSoT の正しい解釈は、  
**各オブジェクトに authoritative source（唯一参照すべき正本）があること**  
です。[^2]

したがって、
- Task の正本
- Decision の正本
- Knowledge の正本

がそれぞれ定義され、その上に permission-aware な検索面が1つあればよい。  
これは「全部をひとつのツールに入れる」よりも、はるかに頑健です。

---

## 2. 定義：この文書における neural organization

この文書では、neural organization を次のように定義します。

> **Neural organization とは、分散した入力源からの信号を規格化された経路で記憶へ統合し、  
> その記憶を人間とエージェントが共通に参照しながら再び分散的に行動する組織設計である。**

神経系になぞらえると、対応関係はこうです。

```text
外界・会話・イベント
= sensory input

ルータ・分類・正規化
= interpretation / pre-processing

Task / Decision / Knowledge
= memory / state

Search / Retrieval
= recall

人・チーム・AIエージェント
= action system
```

ここで重要なのは、**入力源の分散と、組織状態の統制は両立する**ということです。  
入力を完全に制限する必要はありません。制限すべきなのは、**効力を持つ書き込み面**です。

---

## 3. 設計命題

本設計の中心命題は次です。

### 命題
**あらゆる raw signal は、そのままでは組織状態を更新しない。  
組織状態を更新できるのは、Task / Decision / Knowledge に正規化された情報だけである。**

この命題から、運用上の結論が4つ導かれます。

1. 会話は自由でよい  
   ただし、Actionable / Binding / Reusable になった時点で正規化する。
2. 会議は重要でよい  
   ただし、会議それ自体は公式状態ではない。
3. ファイルは存在してよい  
   ただし、owner / scope / review が付かない限り、公式知識ではない。
4. 外部情報は歓迎してよい  
   ただし、取り込まれて文脈化されない限り、組織知ではない。

---

## 4. 最小アーキテクチャ

これが、この設計の最小構成です。

```text
raw signals
(chat / email / meeting / docs / external / system event)
        ↓
canonicalization router
        ↓
organizational state
  - Task
  - Decision
  - Knowledge
        ↓
unified retrieval / search
        ↓
humans / teams / AI agents
        ↓
action + write-back
```

より鋭く言うと、設計すべき面は4つだけです。

1. **Capture surface**  
   信号を拾う面。多くてよい。
2. **Write surface**  
   組織状態を書き換える面。少なくすべき。
3. **State store**  
   正本が置かれる面。オブジェクトごとに1つ。
4. **Retrieval surface**  
   参照・検索する面。できれば1つ。

したがって、目指すべき式は次です。

```text
many capture surfaces
+ few authoritative write surfaces
+ one retrieval surface
+ zero uncaptured state changes
```

---

## 5. 公式オブジェクトモデル

組織に効力を持つ情報は、最終的に **3つの公式オブジェクト** に落ちます。

### 5.1 Task
**未来の行動を拘束するオブジェクト**

定義:
- 誰が
- 何を
- いつまでに
- どの優先度で
- どの状態で行うか

必須フィールド:
- task_id
- title
- requester
- owner
- due_date
- priority
- status
- source_signal
- linked_decision
- linked_knowledge

Task がなければ、行動は属人的な約束になります。  
したがって、**Actionable なものはすべて Task になる**のが原則です。

### 5.2 Decision
**組織を拘束する選択オブジェクト**

定義:
- 何を選んだか
- なぜそうしたか
- 何を捨てたか
- 誰が責任者か
- どこまで有効か

必須フィールド:
- decision_id
- title
- scope
- context
- options_considered
- chosen_option
- rationale
- decider
- effective_date
- review_date
- linked_tasks
- evidence

Decision がなければ、方針は「誰かがそう言っていた」で運用されます。  
したがって、**Binding なものはすべて Decision になる**のが原則です。

### 5.3 Knowledge
**再利用可能な事実・手順・成果・根拠を保持するオブジェクト**

定義:
- 何が分かっているか
- どうやるか
- 何を作ったか
- それを誰が管理しているか
- いつ見直すか

必須フィールド:
- knowledge_id
- title
- summary
- body
- owner
- last_reviewed_at
- next_review_at
- tags
- linked_decisions
- linked_tasks
- evidence / artifacts

Knowledge がなければ、組織は毎回同じことを人に聞きます。  
したがって、**Reusable / Evidential なものはすべて Knowledge になる**のが原則です。

---

## 6. Artifact・議事録・ファイルの正しい位置づけ

このセッションで非常に重要だったのは、  
**Artifact や議事録をトップレベルの公式オブジェクトにしない**  
という判断です。

理由は単純です。

- ファイルは「容器」であって意味ではない
- 議事録は「会話の記録」であって決定ではない
- レコーディングは「生データ」であって状態ではない

よって、以下の原則を置きます。

### 原則
- ファイルは、Knowledge または Decision の証拠として紐づく
- 会議議事録は、Task / Decision / Knowledge を生成するための素材である
- Artifact 単独では、組織状態の正本にならない
- 正式成果物は、必ず owner と参照文脈を持つ

これにより、「どこかに資料はある」「議事録に書いてある」「録画を見れば分かる」が、  
公式状態の代替物になることを防げます。

---

## 7. 正規化ルータ（canonicalization router）

情報の入口を抑える設計の心臓部は、Task / Decision / Knowledge そのものではなく、  
**raw signal をそこへ振り分けるルータ**です。

ルータが担うべき責務は、最低でも次の6つです。

1. **分類**  
   これは Actionable か、Binding か、Reusable か。
2. **補完**  
   owner, due date, scope, sensitivity, source など不足項目を埋める。
3. **重複排除**  
   同一依頼・同一判断・類似知識を増殖させない。
4. **権限付与**  
   どのグループが見られるかを決める。
5. **ルーティング**  
   適切な隊列・担当・テンプレートへ流す。
6. **SLA監視**  
   raw signal が規定時間内に正規化されているか監視する。

ここを人手でやるのか、フォームでやるのか、サービスデスクでやるのか、  
自動化でやるのかは後の話です。  
先に必要なのは、**「ルータが存在する」という設計宣言**です。

---

## 8. チャネル別ルーティング方針

重要なのは、チャネルを禁止することではありません。  
**チャネルごとに「どのオブジェクトへ正規化されるべきか」を固定すること**です。

| Signal source | 判定の第一質問 | 正規化先 | SLA | 正規化しない場合の失敗 |
|---|---|---|---|---|
| Slack / Teams / Chat | 誰かが何かをやる必要があるか | Task | 当日 | 依頼が埋もれる |
| Meeting / 口頭 | 方針・優先度・例外が決まったか | Decision + Task | 24時間以内 | 幽霊意思決定 |
| Email | 依頼か、承認か、例外か | Task または Decision | 当日 | 非追跡の約束 |
| Draft doc / Spec / File | 再利用すべき知識か | Knowledge | 公開前 | 死蔵ドキュメント |
| External article / customer voice | 行動か学習に変わるか | Task または Knowledge | 48時間以内 | 情報摂取で終わる |
| System alert / Incident event | 即時対応が必要か | Task（自動） | 分単位 | オペレーション盲点 |

### 8.1 チャット
チャットは組織の神経終末であり、感知には最適です。  
ただし、チャットを Task system の代替にしてはいけません。

**ルール**
- 依頼はチケット化される
- スレッド上の合意は Task または Decision に昇格する
- DM での依頼は一時信号であり、公式依頼ではない

### 8.2 会議
会議は「生成の場」であって「正本」ではありません。

**ルール**
- 会議の結果として Task / Decision / Knowledge が生成される
- 「会議で決まった」は Decision ID が付くまで暫定
- 宿題は Task ID が付くまで未確定

### 8.3 メール
メールは外部・部門横断の入口として残りやすいですが、最も shadow ingress を生みます。

**ルール**
- 依頼メールは intake に転記または自動起票
- 承認メールは Decision として記録
- メール本文は証跡であり、状態オブジェクトではない

### 8.4 ファイル
ファイルは個人の持ち物になると、組織記憶から脱落します。

**ルール**
- 正式ファイルは組織管理ストレージに置く
- ファイルは Knowledge / Decision から辿れること
- owner, access group, review cycle を持たないファイルは公式扱いしない

### 8.5 外部情報
外部記事・顧客の声・市場情報・法令変更・監視イベントはすべて signal です。

**ルール**
- 行動が必要なら Task
- 方針変更なら Decision
- 参照知識なら Knowledge
- どれにもならないなら、観測ノートに留める

---

## 9. 組織ルール：この4ルールでほぼ足りる

設計を運用に落とすなら、まずはこの4ルールが最小セットです。

### ルール1
**Actionable なものは Task にする。**

### ルール2
**Binding なものは Decision にする。**

### ルール3
**Reusable / Evidential なものは Knowledge にする。**

### ルール4
**正規化されるまで、組織効力を持たせない。**

この4つだけで、組織内の曖昧な大半は解消されます。

さらに運用を強くする補助ルールは次です。

- Task ID のない依頼は「依頼したこと」にならない
- Decision ID のない方針は「決まったこと」にならない
- Knowledge owner のない記事は「公式知識」にならない
- 会議とDMは write surface ではない
- 人は記憶の終点ではなく、一時ソースである
- Search first, ask second, write back third

---

## 10. 設計上の反論とその回答

このテーマでは、よくある誤解がいくつかあります。ここをあらかじめ潰しておくと、設計がぶれません。

### 反論1: 「全部1ツールに集めればいいのでは？」
**答え:** いいえ。  
単一ツール化は実装上は魅力的ですが、移行コスト・業務適合・権限モデル・ベンダーロックインの観点で脆いです。  
必要なのは単一DBではなく、**論理的に一貫した状態モデル**です。

### 反論2: 「チャットを禁止すればよいのでは？」
**答え:** いいえ。  
それでは感知能力が落ちます。  
禁止すべきなのはチャットではなく、**チャットだけで状態が更新されること**です。

### 反論3: 「検索が強ければ入口は気にしなくてよいのでは？」
**答え:** いいえ。  
検索は garbage-in / garbage-out を解決しません。  
入力が非構造・未正規化・属人であれば、検索は「探しやすい混乱」を増やすだけです。

### 反論4: 「会議議事録を全部残せば十分では？」
**答え:** 不十分です。  
議事録は証跡にはなりますが、Task / Decision / Knowledge への昇格がない限り、再利用や統制に向きません。

### 反論5: 「人に聞く文化は悪いのか？」
**答え:** 悪くありません。  
悪いのは、人に聞いた答えが組織記憶へ戻らないことです。  
人は暗黙知の一時ソースとして扱い、その内容は write-back されるべきです。

---

## 11. 権限・所有・検索の設計原則

情報入口を抑える設計は、必ず権限設計とセットです。  
そうでないと、「入口は統制したが、誰にも見つからない / 見えてはいけないものが見える」が起きます。

### 11.1 権限原則
- 権限は個人ではなくグループ単位で付与する
- 権限付与・剥奪はアイデンティティ基盤から自動反映する
- 検索面は permission-aware でなければならない
- 公式ファイルは個人所有にしない

Confluence は global / space / content restriction の3層で権限を持ち、コンテンツはコンテナより広いアクセス権を持てないという構造です。[^8]  
Rovo Search は Atlassian 製品および接続されたサードパーティーアプリを横断しつつ、元システムの権限を尊重します。[^6][^7]  
Microsoft Search も、ユーザーに権限のあるコンテンツのみを結果に出します。[^15]

### 11.2 所有原則
- 個人My Drive / 個人フォルダは公式知識の正本にしない
- 組織所有ストレージを使う
- 退職・異動しても残る保存先を使う

Google Shared Drives では、ファイルは個人ではなく組織に帰属し、作成者が離職しても残ります。外部共有の統制にも Shared Drives の利用が推奨されています。[^11][^12]

### 11.3 検索原則
- 読み取り面はできる限り1つにする
- 書き込み面は少数に制限する
- 検索前提で metadata とタグを標準化する

ここでいう「検索を1つにする」は、全部のデータを1箇所へ複製する意味ではありません。  
**権限付きで横断検索できる1つの入口を用意する**という意味です。

---

## 12. ベンダー非依存の参照アーキテクチャ

まず、どのSaaSを使うにせよ必要なレイヤは同じです。

| Layer | 役割 | 必須要件 | ツール例 |
|---|---|---|---|
| Capture | 信号を拾う | チャネル多様性 | Slack, Teams, Email, Forms, Monitoring |
| Router | 正規化する | 分類・補完・SLA・重複排除 | Service desk, workflow engine, automation |
| Task store | 行動の正本 | owner / due / status / queue | Jira, Linear, Asana, Planner |
| Decision store | 判断の正本 | rationale / scope / review | Confluence, Notion, SharePoint |
| Knowledge store | 再利用知の正本 | owner / tags / review / permissions | Confluence, SharePoint, Notion, Wiki |
| Org file store | 成果物の保存 | 組織所有 / 共有統制 | Shared Drives, SharePoint, Box |
| Retrieval | 参照入口 | permission-aware 横断検索 | Rovo, Microsoft Search, Glean, Elastic |
| Identity | 権限統制 | group-based / JML automation | Okta, Entra ID, Google IAM |
| Automation | 接着層 | event-driven / idempotent | Workato, Power Automate, Okta Workflows |

**重要:**  
設計の本体はこの表の左から右への関係であって、右端の固有名詞ではありません。

---

## 13. 参考実装 A: Atlassian / Slack / Google / Okta スタック

これは「原理をどう実装するか」の一例です。  
この文書の本体はこのスタックに依存しません。

### 13.1 推奨構成
- Chat / signal capture: Slack
- Intake / router: Jira Service Management
- Decision / Knowledge: Confluence
- Unified retrieval: Rovo Search
- Formal file store: Google Shared Drives
- Identity / access: Okta
- Integration / automation: Workato または Atlassian/Okta 標準自動化

### 13.2 なぜこの構成がハマるか
- Slack は日常の信号を集める面として強い。Workflow Builder でワークフローを作れ、link trigger や webhook trigger を通じた開始も可能です。[^9][^10]
- Jira Service Management は request type ごとに request form と work item view を分けて設計でき、queues で triage できます。[^3][^4]
- Jira Service Management の knowledge base は Confluence と接続されます。[^5]
- Confluence は global / space / content restriction の3層権限を持ち、Decision / Knowledge の正本にしやすいです。[^8]
- Rovo Search は Atlassian と外部アプリをまたいで検索しつつ、元システムの権限を尊重します。[^6][^7]
- Google Shared Drives は組織所有ストレージとして、正式成果物の保管に適します。[^11]
- Okta Lifecycle Management は Joiner / Mover / Leaver を自動化し、手動権限運用を減らせます。[^13]
- Workato は多数のコネクタを持ち、Slack / Jira / Google Drive などを跨いだ自動化の接着層にしやすいです。[^14]

### 13.3 具体的な運用割り当て
- Slack メッセージで actionable になったもの → JSM へ起票
- Meeting で binding decision が出たもの → Confluence の Decision Record 作成
- JSM で解決した問い合わせ → KB 候補として Confluence に昇格
- 正式ファイル → Shared Drives に保存し、Confluence から参照
- 検索 → 原則 Rovo から開始
- 権限 → Okta グループで制御

### 13.4 実装スケッチ

```yaml
principle:
  effectful_write_paths:
    - task
    - decision
    - knowledge

capture:
  slack:
    allowed_as: raw_signal
    triggers:
      - workflow_form
      - link_trigger
      - webhook_trigger
      - message_action
  email:
    allowed_as: raw_signal
    route: service_desk

router:
  tool: Jira Service Management
  request_types:
    - access_request
    - onboarding_request
    - purchase_request
    - incident_report
    - policy_question
    - general_intake
  queues:
    - triage_high_priority
    - triage_operations
    - triage_people_ops
    - triage_it
  normalization_sla:
    actionable: same_day
    binding: 24h
    reusable: 48h

official_state:
  task:
    system: jira
  decision:
    system: confluence
    template: decision-record
  knowledge:
    system: confluence
    template: knowledge-article

formal_files:
  system: google_shared_drives
  policy: "No official artifact in personal drive"

retrieval:
  system: rovo
  policy: "Search first"

identity:
  system: okta
  policy:
    - group_based_access_only
    - automated_joiner_mover_leaver
```

---

## 14. 参考実装 B: Microsoft 365 / Teams / SharePoint / Entra スタック

こちらも同じ原理で実装できます。

### 14.1 推奨構成
- Chat / signal capture: Microsoft Teams
- Intake / lightweight approvals: Forms + Approvals + Power Automate
- Decision / Knowledge / file store: SharePoint
- Unified retrieval: Microsoft Search
- Identity / access: Microsoft Entra ID
- Automation: Power Automate

### 14.2 なぜ成立するか
- Teams の Approvals app は、structured / unstructured approvals に auditing, compliance, accountability を持ち込みます。[^16]
- Microsoft Forms の回答を Power Automate で approval フローへ流すテンプレートが用意されています。[^17]
- Microsoft Search は、ユーザーに権限のあるコンテンツだけを表示します。[^15]

### 14.3 注意点
- Teams / SharePoint は柔軟なので、「何でもページ化して決定と知識が混ざる」事故が起きやすい
- そのため、Task / Decision / Knowledge のテンプレートと識別子管理を先に設計する必要がある

---

## 15. 最低限必要なテンプレート定義

ここからは、そのまま導入可能なレベルでテンプレートを定義します。

### 15.1 Task Intake Form

```yaml
title: task-intake-form
required_fields:
  - request_title
  - requester
  - team
  - desired_outcome
  - business_impact
  - due_date
  - urgency
  - sensitivity
  - related_link
routing_logic:
  - if urgency == "critical" -> high_priority_queue
  - if sensitivity == "restricted" -> restricted_project
  - if category == "access" -> access_queue
  - else -> general_triage
output:
  - task_id
  - owner
  - triage_queue
```

### 15.2 Decision Record

```md
# Decision Record: <title>

- Decision ID:
- Date:
- Decider:
- Scope:
- Status: proposed / approved / superseded / retired
- Review date:

## Context
なぜこの判断が必要か。

## Options considered
検討した選択肢。

## Chosen option
採用した選択肢。

## Rationale
判断理由、期待する効果、トレードオフ。

## Consequences
何が変わるか。何がやめられるか。

## Linked tasks
実行に必要なタスク。

## Evidence
参考資料・議事録・データ。
```

### 15.3 Knowledge Article

```md
# Knowledge: <title>

- Knowledge ID:
- Owner:
- Audience:
- Tags:
- Last reviewed:
- Next review:

## Summary
3行で分かる要約。

## Body
手順、定義、背景、FAQ、判断根拠。

## Source
どの Task / Decision / incident / project から生まれた知識か。

## Related artifacts
ファイル、録画、設計書、データセット。
```

---

## 16. ガバナンスポリシーの文面サンプル

実際に導入するなら、以下のような文章をそのまま社内ポリシーにできます。

### 16.1 情報効力ポリシー
- Task ID のない依頼は、公式依頼とみなさない。
- Decision ID のない判断は、公式決定とみなさない。
- Knowledge owner と review date のない記事は、公式知識とみなさない。
- Chat / DM / Meeting / Email は信号チャネルであり、公式 write surface ではない。

### 16.2 保存ポリシー
- 正式成果物は、組織管理ストレージに保存する。
- 個人ストレージ・個人フォルダは公式正本にしない。
- すべての正式成果物は、Task / Decision / Knowledge のいずれかから辿れるようにする。

### 16.3 検索ポリシー
- 公式情報の探索は unified retrieval から開始する。
- 人に聞いて得た有効情報は、Task / Decision / Knowledge として書き戻す。

---

## 17. 導入ロードマップ（90日）

### Phase 0: 現状診断（1〜2週）
目的: shadow ingress の可視化

やること:
- いま情報が「どこで決まっているか」を棚卸しする
- DM, 会議, メール, 個人Drive, 私設Notion など非公式書き込み面を洗い出す
- 現在の task / decision / knowledge の正本候補を確認する

成果物:
- 現行 ingress map
- shadow ingress list
- 移行優先順位

### Phase 1: 公式オブジェクト定義（3〜4週）
目的: Task / Decision / Knowledge の正本定義

やること:
- テンプレートを確定する
- ID規則、owner、review cycle を定義する
- 「何がどのオブジェクトになるか」の分類ルールを定める

成果物:
- object model
- field schema
- normalization policy

### Phase 2: 入口統制（5〜8週）
目的: write surface の固定

やること:
- Task intake を一本化する
- meeting / chat / email から write surface へのルーティングを作る
- 「決定は Decision Record に残す」ルールを導入する
- 正式ファイルの保存先を組織ストレージへ寄せる

成果物:
- official write paths
- routing flows
- storage policy

### Phase 3: 検索・権限統制（9〜12週）
目的: 読み取り面の統合

やること:
- unified retrieval を導入する
- group-based permission へ寄せる
- JML 自動化を始める
- Task / Decision / Knowledge の相互リンクを整える

成果物:
- permission-aware search
- identity-linked access
- audit baseline

### Phase 4: 自動化と学習ループ（継続）
目的: 入口制御を運用ではなくシステムにする

やること:
- 解決済みチケットから Knowledge 候補を生成する
- 会議要約から Task / Decision のドラフトを生成する
- 外部 signal から change review を起票する
- KPI をレビューし、shadow ingress を削減する

---

## 18. KPI / 監視指標

この設計の成否は、次の指標で見ます。

### 18.1 Official write path coverage
組織状態変更イベントのうち、公式 write path を通った比率。

### 18.2 Normalization SLA compliance
raw signal が規定時間内に Task / Decision / Knowledge へ正規化された比率。

### 18.3 Decision traceability
主要な変更・例外・方針のうち、Decision ID で追跡できる比率。

### 18.4 Orphan work ratio
決定にも依頼にも辿れない「出所不明の仕事」の比率。

### 18.5 Knowledge reuse rate
再質問せずに、検索または KB で自己解決できた比率。

### 18.6 Shadow ingress incident count
「Slackだけで決めた」「会議だけで決めた」「個人Driveにしかない」案件数。

### 18.7 Access automation ratio
アクセス権付与・剥奪のうち、自動処理された比率。

---

## 19. 成功判定のための7つの質問

この設計が実際に効いているかを、次の質問でチェックできます。

1. その依頼は Task ID を持っているか
2. その方針変更は Decision ID を持っているか
3. その再利用情報は Knowledge owner を持っているか
4. その正式ファイルは組織所有ストレージにあるか
5. その情報は permission-aware な検索から辿れるか
6. その担当者が退職・異動しても情報は残るか
7. 人に聞いて得た有効知は書き戻されているか

1つでも恒常的に No が多いなら、入口統制はまだ完成していません。

---

## 20. 最終結論

このセッションを経て、最も正しく、最もシャープで、最も実装可能な定義は次です。

> **Neural organization における「情報の入口を全て抑える設計」とは、  
> あらゆる生の信号を、Task・Decision・Knowledge という少数の公式オブジェクトに正規化し、  
> その正規化された状態だけが組織に効力を持つようにする設計である。**

さらに短く言えば、

> **入力は多くてよい。公式書き込みは少なく、検索は一つ。**

これが、理論としても、設計としても、運用としても、もっとも強い形です。

---

## 参考リンク

[^1]: Atlassian, “How to create and maintain a single source of truth”  
https://www.atlassian.com/blog/confluence/how-to-create-and-maintain-a-single-source-of-truth

[^2]: Atlassian, “Building a true Single Source of Truth (SSoT) for your team”  
https://www.atlassian.com/work-management/knowledge-sharing/documentation/building-a-single-source-of-truth-ssot-for-your-team

[^3]: Atlassian Support, “Customize a request type | Jira Service Management Cloud”  
https://support.atlassian.com/jira-service-management-cloud/docs/customize-the-fields-of-a-request-type/

[^4]: Atlassian Support, “Use queues to triage requests for your agents / What are queues? | Jira Service Management Cloud”  
https://support.atlassian.com/jira-service-management-cloud/docs/triage-customer-requests-for-your-agents-with-queues/  
https://support.atlassian.com/jira-service-management-cloud/docs/what-are-queues/

[^5]: Atlassian, “Knowledge Management in Jira Service Management”  
https://www.atlassian.com/software/jira/service-management/product-guide/getting-started/knowledge-management

[^6]: Atlassian Support, “What is Rovo? / Search | Rovo”  
https://support.atlassian.com/rovo/docs/what-is-rovo/  
https://support.atlassian.com/rovo/docs/search/

[^7]: Atlassian Support, “Manage Rovo connectors / How Rovo connector permissions are kept in sync”  
https://support.atlassian.com/organization-administration/docs/manage-rovo-connectors/  
https://support.atlassian.com/organization-administration/docs/how-connector-permissions-are-kept-in-sync/

[^8]: Atlassian Support, “Confluence permissions structure / Manage permissions at the content level”  
https://support.atlassian.com/confluence-cloud/docs/what-are-confluence-cloud-permissions-and-restrictions/  
https://support.atlassian.com/confluence-cloud/docs/manage-permissions-on-the-page-level/

[^9]: Slack Help Center, “Guide to Slack Workflow Builder / Build a workflow: Create a workflow in Slack”  
https://slack.com/help/articles/360035692513-Guide-to-Slack-Workflow-Builder  
https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

[^10]: Slack Developer Docs / Help Center, “Using triggers / Create a workflow that starts outside of Slack / Creating webhook triggers”  
https://api.slack.com/automation/triggers  
https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack  
https://api.slack.com/automation/triggers/webhook

[^11]: Google Workspace Admin Help, “Set up shared drives for your organization / What are shared drives?”  
https://support.google.com/a/answer/7337469  
https://support.google.com/a/users/answer/7212025

[^12]: Google Workspace Admin Help, “Manage external sharing for your organization”  
https://support.google.com/a/answer/60781

[^13]: Okta, “Lifecycle Management and App Provisioning Software”  
https://www.okta.com/products/lifecycle-management/

[^14]: Workato, “Integration Library / Slack connector / Jira connector / Google Drive connector”  
https://www.workato.com/integrations  
https://docs.workato.com/connectors/slack.html  
https://docs.workato.com/connectors/jira.html  
https://docs.workato.com/connectors/google-drive.html

[^15]: Microsoft Learn, “Microsoft Search Overview”  
https://learn.microsoft.com/en-us/microsoftsearch/overview-microsoft-search

[^16]: Microsoft Learn, “Manage the Approvals app in Microsoft Teams”  
https://learn.microsoft.com/en-us/microsoftteams/approval-admin

[^17]: Microsoft Learn, “Common ways to use a form in a flow / Create an approval from the approvals app”  
https://learn.microsoft.com/en-us/power-automate/forms/popular-scenarios  
https://learn.microsoft.com/en-us/power-automate/teams/create-approval-from-teams-app
