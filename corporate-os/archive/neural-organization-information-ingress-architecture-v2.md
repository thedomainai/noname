# Neural Organizationをベースとした組織の情報入口統制設計書 v2

_v2 / 2026-03-09_

## 0. この設計が解くべき問い

### 0.1 ゴールの厳密な定義

**論点**: Neural Organizationにおいて、「情報の入口を全て抑える」とは何を達成することか。

**ゴール定義**:

> 組織に流入するすべての信号（signal）を、定義された感知面（sensing surface）で受け取り、正規化（canonicalization）を経て公式状態（organizational state）へ変換し、正規化されていない情報が組織の意思決定・行動・記憶を駆動することを構造的に不可能にする。

この定義は3つの達成条件で構成される。

**条件1: 感知面の閉包性（Sensing Surface Closure）**

組織が業務目的で使用するすべてのチャネルが定義されており、定義外のチャネルでの業務利用が禁止されている。「信号を漏らさない」ためには、信号が通過しうる経路を有限に閉じる必要がある。

**条件2: 正規化の義務性（Canonicalization Obligation）**

感知面で受け取ったすべての信号のうち、組織状態に影響するもの（actionable / binding / reusable）が、定められたSLA内にTask / Decision / Knowledgeへ正規化される。正規化は任意の善行ではなく、組織義務である。

**条件3: 未正規化情報の無効性（Uncanonicalized Invalidity）**

正規化されていない情報は、組織の公式状態として効力を持たない。Task IDのない依頼、Decision IDのない方針、Knowledge ownerのない知識は、組織として「存在しない」ものとして扱われる。

**スコープ**:

この設計書が扱うのは、組織外部および内部から発生する信号の感知・正規化・状態管理・検索・統治までの全体アーキテクチャである。ツール選定や個別プロダクトの設定手順は扱わない。

**トレードオフ**:

この設計は以下のトレードオフを受け入れる。

| 受け入れるコスト | 得られる便益 |
|---|---|
| チャネル定義の管理コスト | 感知面の完全性保証 |
| 正規化の作業負荷 | 幽霊状態（ghost state）の排除 |
| チャネル制限による柔軟性の低下 | shadow ingressの構造的排除 |
| インセンティブ設計の運用コスト | 持続的な正規化行動 |

### 0.2 agi-era-organization-os.md における位置づけ

この設計書は、agi-era-organization-os.mdが定義するLevel 4（Neural Organization OS）の実装設計の一部である。

10レイヤーOSとの対応関係は以下の通りである。

| この設計書のセクション | 主に対応するOSレイヤー |
|---|---|
| 感知面の設計 | L7（認知・知識・意思決定）、L9（技術基盤・可観測性） |
| 正規化の設計 | L7（認知・知識・意思決定）、L6（仕事・役割・運用モデル） |
| 状態管理の設計 | L7（認知・知識・意思決定）、L9（技術基盤・安全） |
| 検索面の設計 | L7（認知・知識・意思決定） |
| Governance Plane | L2（憲法・権力・責任）、L10（学習・適応・メタガバナンス） |
| インセンティブ設計 | L3（経済・分配）、L4（社会・文化・信頼）、L5（人間の主体性） |

8ステップフロー（Sense → Evolve）との対応では、この設計書はStep 1（Sense）の実装基盤を中心に据えつつ、Step 2〜8が依存するデータ基盤（状態管理・検索面）と統治基盤（Governance Plane）までを射程に含む。

6面データアーキテクチャとの対応は以下の通りである。

| この設計書の構成要素 | 対応する6面 |
|---|---|
| 感知面で取得した生信号 | Reality Plane（immutable event log） |
| 正規化された公式オブジェクト | Semantic Plane + Memory Plane |
| 正規化ルータの判断履歴 | Decision Plane |
| 正規化の実行ログ | Action Plane |
| 権限・ポリシー・監査証跡 | Governance Plane |

## 1. 設計原理（5原理）

この設計は5つの原理に基づく。各原理は前の原理を前提とし、後の原理を可能にする。

### 原理1: 感知面は閉じる

**定義**: 組織が業務目的で情報を送受信するチャネルは、明示的に定義されたもの（公式チャネル）に限定する。定義外のチャネルでの業務利用は禁止する。

**根拠**: v1は「入力は多くてよい」として感知面（sensing surface）の設計を省略した。しかし「多くてよい」（許容条件）と「全てを抑える」（充足条件）は別の命題である。感知面が開いている（未定義チャネルでの業務利用が許されている）状態では、「全てを抑える」ことは論理的に不可能である。なぜなら、未定義チャネルで発生した信号は正規化フローに乗らず、組織が感知できないまま業務に影響するからである。

感知面を閉じることは、チャネル数を減らすことではない。公式チャネルの集合を有限に定義し、その外側を禁止領域とすることである。公式チャネルは必要に応じて追加できるが、追加は定義プロセスを経て行われる。

**帰結**: 公式チャネルの一覧が存在し、定義外チャネルでの業務利用を検知・是正するメカニズムが必要になる。

### 原理2: 運搬と状態を分離する

**定義**: チャット、メール、会議、ファイルは情報の運搬チャネル（carrier）であり、組織状態（organizational state）ではない。運搬チャネル上の会話・合意・指示は、正規化されるまで組織状態を構成しない。

**根拠**: 運搬チャネルと組織状態を混同すると、「Slackで決まったはず」「会議で頼んだはず」という幽霊状態（ghost state）が発生する。幽霊状態は追跡不能・検証不能・検索不能であり、組織の認知整合性を破壊する。

**帰結**: 正規化という変換層（canonicalization router）が必要になる。

### 原理3: 書き込み面は限定する

**定義**: 組織状態を書き換えてよい経路（write surface）は、公式オブジェクトの正本（authoritative source）を通じたものに限定する。

**根拠**: 感知面が閉じていても（原理1）、運搬と状態が分離されていても（原理2）、組織状態を書き換える経路が無制限であれば、正規化を迂回した状態変更が可能になる。書き込み面を限定することで、正規化を経由しない状態変更を構造的に排除する。

**帰結**: 各公式オブジェクト（Task / Decision / Knowledge）の正本が定義され、その正本への書き込み権限が制御される。

### 原理4: 検索面は統一する

**定義**: 組織状態の読み取りは、権限制御された単一の検索面（retrieval surface）から行う。

**根拠**: 書き込み面が限定されていても（原理3）、読み取りが分散していると、「どこを見ればいいか分からない」という状態が生じる。これは実質的に情報が存在しないのと等価であり、結果として人に聞く→書き戻されない→暗黙知化→感知漏れ、という退行が起きる。

**帰結**: permission-awareな横断検索の入口が1つ存在する。

### 原理5: 正規化は組織義務とする

**定義**: 感知面で受け取った信号のうち、組織状態に影響するもの（actionable / binding / reusable）を正規化することは、個人の善意ではなく組織の義務である。義務の履行はSLAで測定され、不履行はガバナンス上の逸脱として扱われる。

**根拠**: 原理1〜4が構造として完璧に設計されていても、人間が正規化を怠れば機能しない。正規化を任意の行為として設計すると、忙しいとき・面倒なときに迂回される。正規化のコストを構造的に下げつつ（インセンティブ設計）、不履行を検知・是正する仕組み（ガバナンス）を組み合わせることで、持続可能な運用を実現する。

**帰結**: 正規化SLA、不履行検知メカニズム、正規化コスト最小化のための自動化支援が必要になる。

### 5原理の論理的連鎖

```
原理1（感知面は閉じる）
  → 信号の流入経路が有限に定義される
    → 原理2（運搬と状態を分離する）
      → 運搬チャネル上の信号を状態に変換する中間層が必要になる
        → 原理3（書き込み面は限定する）
          → 状態への書き込みは正規化経路のみに限定される
            → 原理4（検索面は統一する）
              → 正規化された状態を参照する面が統一される
                → 原理5（正規化は組織義務とする）
                  → 構造の持続性を人間の行動設計で担保する
```

## 2. 感知面の設計（Sensing Surface）

原理1（感知面は閉じる）を実装する。感知面とは、組織が外界および内部から信号を受け取る接触面の総体である。

### 2.1 チャネル棚卸しの方法論

感知面を閉じるためには、まず現在使われているすべてのチャネルを可視化する必要がある。棚卸しは以下の4つの手法を組み合わせて行う。

**手法1: トップダウン列挙**

IT部門・情報システム部門が管理するすべての公式ツール・サービスの一覧を作成する。SaaS契約一覧、ネットワーク機器のログ、IDプロバイダのアプリケーション登録から抽出する。

**手法2: ボトムアップ調査**

全従業員に対して「業務で使っているツール・チャネル」を自己申告させる。この調査の目的は、IT部門が把握していない shadow IT を発見することにある。調査項目は以下の通りである。

```yaml
channel_survey:
  questions:
    - 業務上の依頼を受け取る経路は何か（複数回答）
    - 業務上の意思決定が伝えられる経路は何か（複数回答）
    - 業務上の知識・ノウハウを共有する経路は何か（複数回答）
    - 上記以外に業務目的で使用しているツール・サービスはあるか（自由記述）
    - 個人のメッセンジャー（LINE, WhatsApp等）を業務目的で使用しているか
    - 個人のクラウドストレージ（個人Google Drive, Dropbox等）に業務ファイルを保存しているか
```

**手法3: ネットワーク・ログ分析**

DNS/プロキシログ、SaaS管理ツール（CASB）のデータから、実際に業務ネットワークからアクセスされているサービスを抽出する。自己申告と突き合わせ、未申告のサービスを shadow channel として識別する。

**手法4: 情報フロー追跡**

直近の重要な意思決定・プロジェクト・インシデントを5〜10件選び、それぞれの情報がどのチャネルを経由して流れたかを時系列で追跡する。これにより、公式チャネルでは捕捉できなかった「裏の情報経路」が明らかになる。

### 2.2 公式チャネルの定義と分類

棚卸しの結果に基づき、公式チャネルを以下の分類で定義する。

**分類1: Primary Channel（主要チャネル）**

組織の中核的な情報流通を担うチャネル。正規化フローとの技術的接続が必須であり、SLA監視の対象となる。

例: 業務チャットツール（Slack, Teams等）、メール、サービスデスク、会議（定例・臨時）、プロジェクト管理ツール

**分類2: Secondary Channel（補助チャネル）**

特定の用途に限定して使用するチャネル。正規化フローへの接続は推奨だが、手動転記も許容する。

例: ビデオ会議の録画・トランスクリプト、外部パートナーとの共有ワークスペース、顧客からの問い合わせフォーム

**分類3: System Channel（システムチャネル）**

人間を介さず、システム間連携で信号が流入するチャネル。自動正規化が前提となる。

例: 監視アラート（APM, インフラ監視）、CI/CDイベント、SaaS webhook、外部API連携

**分類4: External Intake Channel（外部取込チャネル）**

組織外部からの情報を取り込むためのチャネル。取込の判断基準と取込後の正規化SLAを定義する。

例: 外部ニュースフィード、法令変更通知、業界レポート、顧客の声（VoC）

公式チャネルの定義は以下のスキーマで管理する。

```yaml
channel_definition:
  channel_id: "ch-slack-001"
  name: "Slack（全社ワークスペース）"
  classification: primary
  description: "全社員の業務コミュニケーション基盤"
  owner: "IT部門"
  signal_types:
    - task_request
    - decision_notification
    - knowledge_sharing
    - general_communication
  canonicalization_method: semi_automatic
  canonicalization_sla: same_day
  technical_integration:
    type: api
    connector: "slack-to-router"
    status: active
  review_cycle: quarterly
  last_reviewed: "2026-03-01"
  next_review: "2026-06-01"
```

### 2.3 チャネルポリシー（定義外チャネルの扱い）

**基本ポリシー**: 公式チャネル定義に含まれないチャネルでの業務利用は禁止する。

具体的な禁止事項は以下の通りである。

- 個人メッセンジャー（LINE, WhatsApp, Facebook Messenger等）での業務上の依頼・報告・意思決定
- 個人クラウドストレージ（個人Google Drive, Dropbox, iCloud等）への業務ファイルの保存
- 未承認のSaaSサービスでの業務データの入力・保存
- 口頭のみ（対面・電話）での依頼・意思決定で、正規化を伴わないもの

**例外処理**: 緊急事態（災害、システム障害等）で公式チャネルが利用不能な場合に限り、代替チャネルの使用を許容する。ただし、公式チャネル復旧後24時間以内に、代替チャネルで発生したすべての業務情報を正規化する義務を負う。

**新規チャネルの追加プロセス**: 新たなチャネルを公式チャネルとして追加する場合は、以下のプロセスを経る。

1. 申請者がチャネル定義スキーマに従って定義書を作成する
2. IT部門がセキュリティ・コンプライアンス・技術接続性を評価する
3. Governance担当が正規化フローとの接続設計をレビューする
4. 承認後、公式チャネル一覧に追加し、全従業員に通知する

### 2.4 各チャネルからの信号取得の技術接続設計

感知面から正規化ルータへ信号を流す技術接続は、チャネルの分類に応じて設計する。

**Primary Channel の接続パターン**

| チャネル | 接続方式 | 取得トリガー | 取得内容 |
|---|---|---|---|
| 業務チャット | Events API / Webhook | メッセージ投稿、リアクション、ワークフロー起動 | メッセージ本文、メタデータ、添付ファイル参照 |
| メール | メール転送ルール / API | 受信時 | 件名、本文、送受信者、添付ファイル |
| サービスデスク | Webhook / API | チケット作成・更新時 | チケット全フィールド |
| 会議 | トランスクリプト取得API | 会議終了時 | トランスクリプト、参加者、録画URL |

**System Channel の接続パターン**

| チャネル | 接続方式 | 取得トリガー | 正規化方式 |
|---|---|---|---|
| 監視アラート | Webhook | アラート発報時 | 自動でTaskを起票 |
| CI/CDイベント | Webhook | ビルド/デプロイ完了時 | 自動でログ記録、失敗時はTask起票 |
| SaaS Webhook | HTTP Endpoint | イベント発生時 | ルーティングルールに基づき自動分類 |

**External Intake Channel の接続パターン**

| チャネル | 接続方式 | 取得トリガー | 正規化方式 |
|---|---|---|---|
| ニュースフィード | RSS / API | 定期取得（日次） | AI分類 → 関連あり判定時にTask/Knowledge候補生成 |
| 法令変更通知 | メール / API | 受信時 | Decision影響評価 → Task起票 |
| 顧客の声（VoC） | CRM連携 / フォーム | 入力時 | 自動分類 → Knowledge蓄積 / Task起票 |

### 2.5 感知面の完全性検証メカニズム

感知面が閉じた状態を維持するためには、継続的な検証が必要である。

**検証1: 定期チャネル棚卸し（四半期）**

四半期ごとにセクション2.1の棚卸しを再実施する。新たに検出されたshadow channelは、公式チャネルとして追加するか、禁止を徹底するかを判断する。

**検証2: shadow channel 検知（常時）**

CASB/プロキシログの継続的分析により、未定義サービスへの業務データ流出を検知する。検知時はガバナンス逸脱として記録し、是正措置を講じる。

**検証3: 正規化漏れ検知（日次）**

公式チャネル上で発生した信号のうち、正規化SLAを超過しているものを自動検知する。具体的には以下を監視する。

- チャット上のactionable messageのうち、Task IDに紐づいていないもの
- 会議終了後に、Task/Decision/Knowledgeが生成されていないもの
- サービスデスクに到着したが未分類のまま放置されているもの

**検証4: 情報フロー監査（半期）**

セクション2.1の手法4（情報フロー追跡）を定期的に実施し、公式チャネル外での情報流通がないかを検証する。

## 3. 正規化の設計（Canonicalization）

原理2（運搬と状態を分離する）と原理5（正規化は組織義務とする）を実装する。正規化とは、感知面で受け取った生の信号（raw signal）を、組織状態を構成する公式オブジェクト（Task / Decision / Knowledge）に変換するプロセスである。

### 3.1 情報型の定義（Task / Decision / Knowledge）

組織状態を構成する公式オブジェクトは3種類である。

**Task（行動拘束オブジェクト）**

未来の行動を拘束する。「誰が、何を、いつまでに、どの優先度で行うか」を定義する。

判定基準: その信号は、誰かが何かを行う必要があるか（Actionable）。

```yaml
task:
  task_id: "TSK-2026-001234"
  title: "顧客Aの契約更新提案書を作成する"
  requester: "sales-manager@example.com"
  owner: "account-exec-01@example.com"
  due_date: "2026-03-15"
  priority: high
  status: in_progress
  autonomy_mode: A3  # HOTL: 監視者にveto window
  source_signal:
    channel: "ch-slack-001"
    message_id: "msg-20260309-5678"
    timestamp: "2026-03-09T10:23:00Z"
  linked_decisions:
    - "DEC-2026-000089"
  linked_knowledge:
    - "KNW-2026-000456"
  composite_risk:
    irreversibility: low
    financial_impact: medium
    external_exposure: high
    brand_impact: medium
  created_at: "2026-03-09T10:30:00Z"
  updated_at: "2026-03-09T14:00:00Z"
  provenance:
    created_by: "canonicalization-router"
    approved_by: "sales-manager@example.com"
```

**Decision（選択拘束オブジェクト）**

組織を拘束する選択を記録する。「何を選び、何を捨て、なぜそうしたか」を定義する。

判定基準: その信号は、組織の方針・優先順位・例外処理を決定するものか（Binding）。

```yaml
decision:
  decision_id: "DEC-2026-000089"
  title: "2026年Q2の価格改定方針"
  scope: "全プロダクト・全リージョン"
  context: "競合の価格改定と原材料コスト上昇を受けて"
  options_considered:
    - option: "現行価格維持"
      pros: "顧客離反リスクなし"
      cons: "利益率が3%低下"
    - option: "一律5%値上げ"
      pros: "利益率維持"
      cons: "中小顧客の離反リスク"
    - option: "セグメント別差別価格"
      pros: "利益率維持 + 離反リスク最小化"
      cons: "実装と運用の複雑さ"
  chosen_option: "セグメント別差別価格"
  rationale: "中小顧客の離反リスクを最小化しつつ利益率を維持するため"
  decider: "cfo@example.com"
  effective_date: "2026-04-01"
  review_date: "2026-06-30"
  status: approved
  linked_tasks:
    - "TSK-2026-001234"
    - "TSK-2026-001235"
  evidence:
    - type: meeting_transcript
      ref: "MTG-2026-0045"
    - type: analysis_report
      ref: "KNW-2026-000450"
  provenance:
    created_by: "cfo@example.com"
    recorded_by: "strategy-team@example.com"
    created_at: "2026-03-08T16:00:00Z"
```

**Knowledge（再利用知識オブジェクト）**

再利用可能な事実・手順・成果・根拠を保持する。「何が分かっているか、どうやるか、誰が管理しているか」を定義する。

判定基準: その信号は、将来の参照・再利用に値する知識か（Reusable / Evidential）。

```yaml
knowledge:
  knowledge_id: "KNW-2026-000456"
  title: "顧客セグメント別価格弾力性分析"
  summary: "過去3年の価格変更データに基づき、セグメント別の価格弾力性を分析した結果"
  owner: "data-analytics@example.com"
  audience:
    - strategy_team
    - sales_leadership
  tags:
    - pricing
    - customer_segmentation
    - elasticity
  last_reviewed_at: "2026-03-01"
  next_review_at: "2026-06-01"
  linked_decisions:
    - "DEC-2026-000089"
  linked_tasks: []
  artifacts:
    - type: spreadsheet
      ref: "shared-drive://analytics/pricing/elasticity-2026Q1.xlsx"
      owner: "data-analytics@example.com"
    - type: dashboard
      ref: "https://bi.example.com/dashboards/pricing-elasticity"
  provenance:
    created_by: "data-analytics@example.com"
    created_at: "2026-02-15T09:00:00Z"
    last_updated_by: "senior-analyst@example.com"
    updated_at: "2026-03-01T11:30:00Z"
```

### 3.2 Artifactの位置づけ

ファイル、議事録、録画、スライド、スプレッドシートなどのArtifactは、トップレベルの公式オブジェクトではない。

**原則**:

- Artifactは「容器」であり、それ自体は組織状態ではない
- Artifactは必ずTask / Decision / Knowledgeのいずれかから参照される形で存在する
- 議事録は、Task / Decision / Knowledgeを生成するための素材（source material）である
- 録画・録音は証跡（evidence）であり、正本（authoritative source）ではない
- owner, access group, review cycleを持たないArtifactは公式扱いしない

Artifactが単独で組織状態の代替になることを許すと、「議事録に書いてある」「録画を見ればわかる」が正式な参照先となり、検索不能・追跡不能な幽霊状態が増殖する。

### 3.3 正規化ルータの設計（8ステップフローとの完全対応）

正規化ルータは、感知面で受け取った生の信号をTask / Decision / Knowledgeへ変換する中間層である。v1ではルータの責務を6つ定義したが、v2ではagi-era-organization-os.mdの8ステップフロー（Sense → Evolve）との完全な対応を明示する。

**ルータのステップと8ステップフローの対応**

```
Step 0: Constitution Load
  ルータは起動時に以下をロードする:
    - 公式チャネル定義（感知面の定義）
    - 正規化ポリシー（分類ルール、SLA定義）
    - 権限ポリシー（アクセス制御ルール）
    - Autonomy Mode 算出ルール
    ↓
Step 1: Sense（信号受信）
  ルータが公式チャネルから信号を受け取る。
  信号をimmutable event logに記録する（Reality Planeへの書き込み）。
  責務: 信号のキャプチャ、タイムスタンプ付与、チャネル識別
    ↓
Step 2: Understand（文脈理解）
  ルータが信号の内容を解析し、組織の既存状態と照合する。
  責務: 分類（Actionable / Binding / Reusable / None）、
        重複排除（既存のTask/Decision/Knowledgeとの照合）、
        文脈補完（関連するエンティティ・過去の決定との紐付け）
    ↓
Step 3: Deliberate（正規化案の作成）
  ルータが正規化の候補を生成する。
  責務: 公式オブジェクトのドラフト作成、
        不足フィールドの特定（owner, due_date, scope等）、
        ルーティング先（担当チーム・キュー）の候補提示
    ↓
Step 4: Gate（自律度判定）
  ルータがAutonomy Modeを算出し、人間の介入要否を決定する。
  責務: Composite Risk算出、
        Autonomy Mode = f(Trust Score, Composite Risk, Novelty, Uncertainty, Agency Impact)、
        A0-A1なら自動正規化、A2以上なら人間のレビュー/承認を挟む
    ↓
Step 5: Act（正規化実行）
  公式オブジェクトを正本に書き込む。
  責務: Task / Decision / Knowledge の正本への書き込み、
        権限付与（access group設定）、
        通知（関係者への正規化完了通知）、
        SLA記録（正規化所要時間の計測）
    ↓
Step 6: Observe（正規化結果の観測）
  正規化の結果を観測する。
  責務: 正規化SLA達成率の計測、
        未正規化信号の検知、
        分類精度の計測（誤分類の検知）
    ↓
Step 7: Reflect（正規化品質の評価）
  正規化の品質を4軸で評価する。
    - Output accuracy: 分類は正しかったか
    - Assumption validity: 補完した情報は妥当だったか
    - Value alignment: 組織の優先順位に沿ったルーティングだったか
    - Agency preservation: 人間の判断権は適切に保持されたか
    ↓
Step 8: Evolve（ルータの改善）
  評価結果に基づき、ルータの分類ルール・ルーティングルール・Autonomy Mode算出基準を更新する。
  責務: 分類ルールの改訂提案、
        Trust Scoreの更新、
        正規化ポリシーの改訂提案
```

### 3.4 Autonomy Mode設計（タスク種別ごとのA0-A5）

正規化ルータがStep 4（Gate）で算出するAutonomy Modeは、agi-era-organization-os.mdのA0〜A5に準拠する。正規化対象の信号種別ごとに、デフォルトのAutonomy Modeと昇格条件を定義する。

**正規化におけるAutonomy Mode適用表**

| 信号種別 | デフォルトAutonomy Mode | 条件 |
|---|---|---|
| システムアラート → Task | A1（Full auto） | 事前定義されたアラートルールに合致する場合 |
| チャットの定型依頼 → Task | A2（Auto + post-audit） | フォーム経由の構造化された依頼の場合 |
| チャットの非定型依頼 → Task | A4（HITL） | 自由文からのTask抽出は人間が確認 |
| 会議の宿題 → Task | A3（HOTL） | AI抽出 + 参加者にveto window |
| 会議の意思決定 → Decision | A4（HITL） | Deciderが内容を確認・承認 |
| 外部情報 → Knowledge | A3（HOTL） | AI分類 + Domain Governorがveto可能 |
| 解決済みチケット → Knowledge | A2（Auto + post-audit） | 定型的なKB生成は自動、事後レビュー |
| 法令変更 → Decision影響評価 | A5（Human-only） | AIは影響候補を提示するのみ |

**Autonomy Mode昇格条件**: Trust Scoreが閾値を超え、過去の正規化精度がSLAを満たしている場合、Domain GovernorがAutonomy Modeを1段階引き下げる（より自律的にする）ことができる。逆に、誤分類・正規化漏れが発生した場合はAutonomy Modeが自動的に引き上がる（より人間介入を増やす）。

### 3.5 チャネル別ルーティング方針

各公式チャネルからの信号について、正規化先とSLAを定義する。

| 信号源 | 判定の第一質問 | 正規化先 | SLA | 正規化しない場合の失敗モード |
|---|---|---|---|---|
| 業務チャット（Slack / Teams等） | 誰かが何かをやる必要があるか | Task | 当日中 | 依頼が埋もれ、追跡不能になる |
| 会議（定例・臨時） | 方針・優先度・例外が決まったか | Decision + Task | 24時間以内 | 幽霊意思決定が横行する |
| メール | 依頼か、承認か、例外通知か | Task / Decision | 当日中 | 非追跡の約束が増殖する |
| ドキュメント・仕様書 | 再利用すべき知識か | Knowledge | 公開前 | 死蔵ドキュメントが増える |
| 外部情報（記事・顧客の声・市場データ） | 行動か学習に変わるか | Task / Knowledge | 48時間以内 | 情報摂取で終わり行動に繋がらない |
| システムアラート・インシデント | 即時対応が必要か | Task（自動） | 分単位 | オペレーション上の盲点が生まれる |
| サービスデスク | 誰がどのキューで処理すべきか | Task | 受付時即時 | リクエストが滞留する |

**チャネル別の補足ルール**

**チャット**: チャットは組織の神経終末であり、感知には最適である。ただしチャットはwrite surfaceではない。依頼はTask化される。スレッド上の合意はTask/Decisionに昇格する。DMでの依頼は一時信号であり、公式依頼ではない。

**会議**: 会議は「生成の場」であり「正本」ではない。会議の結果としてTask / Decision / Knowledgeが生成される。「会議で決まった」はDecision IDが付くまで暫定である。宿題はTask IDが付くまで未確定である。

**メール**: メールは外部・部門横断の入口として残りやすいが、最もshadow ingressを生む。依頼メールはintakeに転記または自動起票する。承認メールはDecisionとして記録する。メール本文は証跡であり、状態オブジェクトではない。

**ファイル**: ファイルは個人の持ち物になると組織記憶から脱落する。正式ファイルは組織管理ストレージに置く。ファイルはKnowledge / Decisionから辿れなければならない。owner, access group, review cycleを持たないファイルは公式扱いしない。

**外部情報**: 外部記事・顧客の声・市場情報・法令変更・監視イベントはすべてsignal（信号）である。行動が必要ならTask。方針変更ならDecision。参照知識ならKnowledge。どれにもならないなら、観測ノートに留める。

### 3.6 例外処理フロー

正規化フローには以下の例外が発生しうる。それぞれの処理方針を定義する。

**例外1: 分類不能な信号**

AIによる分類がActionable / Binding / Reusable / Noneのいずれにも確信度高く判定できない場合。

処理: Triage Queueに投入し、人間のSensemaker（Active Extractor）が分類する。分類結果はルータの学習データに追加される。SLA: 4時間以内。

**例外2: 正規化SLA超過**

信号がSLA内に正規化されない場合。

処理: SLA超過アラートを関連チームの責任者に通知する。超過理由を記録する。繰り返し発生する場合は、チャネル設計またはルーティングルールの見直しをトリガーする。

**例外3: 緊急信号（Critical Signal）**

通常の正規化フローを待てない緊急性の高い信号（セキュリティインシデント、法令違反の恐れ、重大な顧客影響等）。

処理: ルータがComposite Riskの閾値を超えた信号を検知した場合、通常の正規化フローを迂回してException Commander（人間の6職能の1つ）に直接エスカレーションする。同時にTaskを自動起票し、事後的に正規化を完了する。

**例外4: 複合信号**

1つの信号がTask + Decision、またはDecision + Knowledgeなど、複数のオブジェクトに分解される場合。

処理: ルータが複数のオブジェクトを生成し、相互にlinked_tasks / linked_decisions / linked_knowledgeで紐付ける。

**例外5: 不完全な信号**

正規化に必要なフィールド（owner, due_date, scope等）が不足している信号。

処理: ルータがドラフトを生成し、不足フィールドを明示した上で、発信者または関連するDomain Governorに補完を依頼する。補完SLA: 24時間以内。

## 4. 状態管理の設計（State Store）

原理3（書き込み面は限定する）を実装する。状態管理とは、正規化された公式オブジェクト（Task / Decision / Knowledge）の正本を管理し、その一貫性と完全性を保証する層である。

### 4.1 オブジェクトモデル（フィールド定義）

セクション3.1で定義した3つの公式オブジェクトに加え、すべてのオブジェクトが共通して持つべきフィールドを定義する。

**共通フィールド（全オブジェクト共通）**

```yaml
common_fields:
  id: string          # 一意識別子（TSK-YYYY-NNNNNN / DEC-YYYY-NNNNNN / KNW-YYYY-NNNNNN）
  title: string       # 人間が読めるタイトル
  status: enum        # オブジェクト型ごとに定義
  owner: string       # 責任者（個人またはグループ）
  access_groups:      # 参照権限を持つグループのリスト
    - string
  source_signal:      # 元の信号への参照
    channel: string
    ref: string
    timestamp: datetime
  provenance:         # 来歴
    created_by: string
    created_at: datetime
    last_updated_by: string
    updated_at: datetime
    approved_by: string
  linked_tasks: [string]
  linked_decisions: [string]
  linked_knowledge: [string]
  composite_risk:     # セクション3.4参照
    irreversibility: enum(low, medium, high, critical)
    financial_impact: enum(low, medium, high, critical)
    legal_regulatory: enum(low, medium, high, critical)
    brand_impact: enum(low, medium, high, critical)
    human_rights_ethics: enum(low, medium, high, critical)
    external_exposure: enum(low, medium, high, critical)
    novelty: enum(low, medium, high, critical)
    agency_impact: enum(low, medium, high, critical)
  autonomy_mode: enum(A0, A1, A2, A3, A4, A5)
```

**Task固有フィールド**

```yaml
task_specific:
  requester: string
  due_date: date
  priority: enum(critical, high, medium, low)
  status: enum(draft, open, in_progress, blocked, review, done, cancelled)
  estimated_effort: string
  actual_effort: string
  rollback_plan: string
  parent_task: string    # 親タスクへの参照（分解されたサブタスク用）
  child_tasks: [string]  # 子タスクへの参照
```

**Decision固有フィールド**

```yaml
decision_specific:
  scope: string                  # 影響範囲の記述
  context: string                # 判断が必要になった背景
  options_considered: [option]   # 検討した選択肢のリスト
  chosen_option: string          # 採用した選択肢
  rationale: string              # 判断理由
  decider: string                # 最終判断者
  effective_date: date           # 発効日
  expiry_date: date              # 失効日（設定する場合）
  review_date: date              # 見直し予定日
  status: enum(proposed, approved, active, superseded, retired)
  superseded_by: string          # この決定を無効化した新決定への参照
  evidence: [artifact_ref]       # 証跡（議事録、分析レポート等）への参照
```

**Knowledge固有フィールド**

```yaml
knowledge_specific:
  summary: string                # 3行で分かる要約
  body: string                   # 本文
  audience: [string]             # 対象読者
  tags: [string]                 # 検索用タグ
  last_reviewed_at: date         # 最終レビュー日
  next_review_at: date           # 次回レビュー予定日
  review_cycle: enum(monthly, quarterly, semi_annual, annual)
  status: enum(draft, published, under_review, archived, deprecated)
  artifacts: [artifact_ref]      # 関連成果物（ファイル、ダッシュボード等）への参照
  source: string                 # どのTask / Decision / incident / projectから生まれた知識か
```

### 4.2 Authoritative sourceの定義

SSoT（Single Source of Truth）の正しい解釈は、「物理的に1つのDB」ではなく、「各オブジェクトにauthoritative source（唯一参照すべき正本）がある」ことである。

**正本定義の原則**

- Taskの正本は1つのシステムに置く
- Decisionの正本は1つのシステムに置く
- Knowledgeの正本は1つのシステムに置く
- Artifactの正本は組織管理ストレージに置く
- 正本が複数のシステムに分散する場合、どちらが正本かを明示的に宣言する

**正本定義のスキーマ**

```yaml
authoritative_sources:
  task:
    system: "(例: Jira, Linear, Asana等)"
    api_endpoint: "(システムのAPI)"
    id_format: "TSK-YYYY-NNNNNN"
    write_access: "正規化ルータ + 認可されたTask owner"
  decision:
    system: "(例: Confluence, Notion, SharePoint等)"
    api_endpoint: "(システムのAPI)"
    id_format: "DEC-YYYY-NNNNNN"
    write_access: "Decider + 認可されたDomain Governor"
  knowledge:
    system: "(例: Confluence, Notion, SharePoint, Wiki等)"
    api_endpoint: "(システムのAPI)"
    id_format: "KNW-YYYY-NNNNNN"
    write_access: "Knowledge owner + 認可されたDomain Governor"
  artifact:
    system: "(例: Google Shared Drives, SharePoint, Box等)"
    policy: "個人ストレージは正本にしない"
    write_access: "Artifact owner + 認可されたグループメンバー"
```

### 4.3 Write surfaceのアクセス制御

書き込み面のアクセス制御は、「誰が、どのオブジェクトに対して、どの操作を行えるか」をRole-based Access Control（RBAC）で定義する。

**Roleの定義**

| Role | 作成 | 更新 | ステータス遷移 | 削除 | 対象オブジェクト |
|---|---|---|---|---|---|
| Canonicalization Router（自動） | Task, Knowledge（A0-A2の場合） | ドラフトのみ | draft → open | 不可 | 全オブジェクト |
| Task Owner | 不可（ルータまたはrequester経由） | 自身がownerのTask | open → in_progress → done | 不可 | Task |
| Task Requester | 自身が起票したTask | 不可 | 不可 | 不可（cancelは可） | Task |
| Decider | Decision | 自身がdeciderのDecision | proposed → approved → active | 不可（retiredへの遷移は可） | Decision |
| Knowledge Owner | Knowledge | 自身がownerのKnowledge | draft → published → archived | 不可（deprecatedへの遷移は可） | Knowledge |
| Domain Governor | 全オブジェクト | 管轄ドメインの全オブジェクト | 全遷移 | 管轄ドメイン内（論理削除のみ） | 全オブジェクト |
| Purpose Owner | 不可 | 不可 | 不可 | 不可 | なし（ポリシーレベルの統制のみ） |

**書き込み禁止の明示ルール**

- 会議・チャット・メール・DMは write surface ではない
- 個人ストレージへの書き込みは、公式状態の更新として認められない
- APIを経由しない直接的なDB操作は、監査例外として記録される

### 4.4 状態遷移ルール

各オブジェクトの状態遷移を定義する。

**Task の状態遷移**

```
draft → open → in_progress → review → done
                    ↓                    ↓
                 blocked            cancelled
                    ↓
              in_progress（ブロック解除後）
```

遷移ルール:
- draft → open: ルータまたは人間がownerとdue_dateを確定した時点
- open → in_progress: ownerが着手した時点
- in_progress → blocked: 外部依存により進行不能な場合（ブロック理由の記録が必須）
- in_progress → review: 成果物が完成しレビュー待ちの場合
- review → done: requesterまたはレビュアーが承認した場合
- 任意 → cancelled: requesterまたはDomain Governorが取消した場合（取消理由の記録が必須）

**Decision の状態遷移**

```
proposed → approved → active → superseded
                        ↓
                     retired
```

遷移ルール:
- proposed → approved: deciderが内容を承認した場合
- approved → active: effective_dateに到達した場合
- active → superseded: 新しいDecisionが同一scopeで作成された場合（superseded_byの記録が必須）
- active → retired: 適用対象が消滅した場合（retired理由の記録が必須）

**Knowledge の状態遷移**

```
draft → published → under_review → published（更新版）
                        ↓
                    deprecated → archived
```

遷移ルール:
- draft → published: ownerがレビューを完了し公開した場合
- published → under_review: next_review_atに到達した場合、または内容の陳腐化が検知された場合
- under_review → published: ownerが更新を完了した場合
- under_review → deprecated: 内容が無効になった場合（代替Knowledgeへの参照が推奨）
- deprecated → archived: 参照価値もなくなった場合

## 5. 検索面の設計（Retrieval Surface）

原理4（検索面は統一する）を実装する。検索面とは、正規化された組織状態を人間およびAIエージェントが参照するための統一された入口である。

### 5.1 Permission-aware unified search

**設計要件**

1. **単一の検索入口**: Task / Decision / Knowledge / Artifactの横断検索が、1つのインターフェースから可能であること
2. **権限の尊重**: 検索結果は、検索者のアクセス権限に基づいてフィルタリングされること。元システムの権限と検索結果の権限は一貫すること
3. **検索対象の網羅性**: すべてのauthoritative source（Task store, Decision store, Knowledge store, Artifact store）が検索インデックスに含まれること
4. **メタデータの横断性**: オブジェクトのID、タイトル、本文だけでなく、owner、tags、status、linked_*フィールドも検索対象であること
5. **権限同期のリアルタイム性**: 元システムの権限変更が、検索結果に反映されるまでのラグが定義されていること（推奨: 15分以内）

**検索の3モード**

| モード | 用途 | 入力 | 出力 |
|---|---|---|---|
| Keyword Search | 既知の情報を探す | キーワード、ID、タグ | マッチする公式オブジェクトのリスト |
| Semantic Search | 概念的に近い情報を探す | 自然言語の質問 | 関連度順の公式オブジェクトのリスト |
| Graph Traversal | 関連する情報を辿る | 起点となるオブジェクトID | linked_*で接続されたオブジェクト群 |

### 5.2 検索セマンティクスの定義

検索面の一貫した振る舞いを保証するために、検索セマンティクスを定義する。

**デフォルトフィルタ**:

- status: 検索時に指定がなければ、doneやarchivedを除く有効なステータスのオブジェクトを返す
- access: 検索者の権限で参照可能なオブジェクトのみを返す

**ソート順のデフォルト**:

- Keyword Search: 関連度スコア降順
- Semantic Search: 意味的類似度降順
- Graph Traversal: リンクの深度順（浅い方が先）

**検索結果の表示要素**:

```yaml
search_result_item:
  object_type: enum(task, decision, knowledge)
  id: string
  title: string
  status: string
  owner: string
  snippet: string           # 本文からの抜粋（ハイライト付き）
  relevance_score: float
  last_updated: datetime
  linked_count:             # 関連オブジェクトの数
    tasks: int
    decisions: int
    knowledge: int
  source_system: string     # 正本が置かれているシステム名
  direct_link: url          # 正本への直リンク
```

**「Search first, ask second, write back third」の原則**:

この原則は検索面の運用ルールとして定義される。

1. Search first: 情報が必要なとき、まず統一検索面で検索する
2. Ask second: 検索で見つからない場合に限り、人に聞く
3. Write back third: 人に聞いて得た有効情報は、Task / Decision / Knowledgeとして書き戻す

この原則が機能するためには、検索面が十分な検索精度と応答速度を持っている必要がある。検索精度が低ければ、ユーザーは「検索しても見つからないから人に聞く」という行動に回帰する。

## 6. Governance Plane

v1で欠落していたGovernance Planeを設計する。Governance Planeは、agi-era-organization-os.mdの6面データアーキテクチャにおけるGovernance Plane（権限・ポリシー・Trust Score・監査証跡）に対応する。

### 6.1 権限モデル

**基本原則**

- 権限は個人ではなくグループ単位で付与する
- 権限付与・剥奪はIDプロバイダ（IdP）から自動反映する
- Joiner / Mover / Leaver（JML）のライフサイクルイベントに連動する
- 公式ファイルは個人所有にしない

**権限の3層構造**

| 層 | 制御対象 | 例 |
|---|---|---|
| システム層 | ツールへのアクセス権 | Jiraにログインできるか、Confluenceにアクセスできるか |
| オブジェクト層 | 公式オブジェクトの参照・編集権 | このDecisionを参照できるか、このTaskを編集できるか |
| フィールド層 | 特定フィールドの参照・編集権 | composite_riskの値を変更できるか、statusを遷移させられるか |

**グループ構造**

```yaml
access_groups:
  - group_id: "grp-engineering"
    type: functional
    source: idp_sync  # IdPから自動同期
    members_source: "IdP group: Engineering"
    default_permissions:
      task: read_write
      decision: read
      knowledge: read_write

  - group_id: "grp-leadership"
    type: governance
    source: idp_sync
    members_source: "IdP group: Leadership"
    default_permissions:
      task: read
      decision: read_write
      knowledge: read_write

  - group_id: "grp-project-alpha"
    type: project
    source: manual  # プロジェクト固有のグループ
    default_permissions:
      task: read_write  # project-alpha関連のみ
      decision: read_write  # project-alpha関連のみ
      knowledge: read_write  # project-alpha関連のみ
```

### 6.2 ポリシー管理

Governance Planeが管理するポリシーは以下の4カテゴリに分類される。

**カテゴリ1: 正規化ポリシー（Canonicalization Policy）**

正規化の義務、SLA、分類ルール、例外処理ルールを定義する。

```yaml
canonicalization_policy:
  version: "2.0"
  effective_date: "2026-04-01"
  rules:
    - rule_id: "CP-001"
      statement: "Actionable な信号は当日中にTaskに正規化する"
      sla: same_day
      violation_action: alert_to_domain_governor
    - rule_id: "CP-002"
      statement: "Binding な意思決定は24時間以内にDecisionに正規化する"
      sla: 24h
      violation_action: alert_to_domain_governor
    - rule_id: "CP-003"
      statement: "Reusable な知識は48時間以内にKnowledgeに正規化する"
      sla: 48h
      violation_action: alert_to_knowledge_owner
    - rule_id: "CP-004"
      statement: "正規化されるまで組織効力を持たせない"
      enforcement: structural
      violation_action: reject_uncanonicalized_reference
```

**カテゴリ2: チャネルポリシー（Channel Policy）**

公式チャネルの定義、定義外チャネルの禁止、新規チャネル追加プロセスを定義する。セクション2.3で設計済み。

**カテゴリ3: アクセスポリシー（Access Policy）**

権限モデル（セクション6.1）に基づく、オブジェクトへのアクセス制御ルールを定義する。

**カテゴリ4: 保持ポリシー（Retention Policy）**

各オブジェクトの保持期間、アーカイブ条件、削除条件を定義する。

```yaml
retention_policy:
  task:
    active_retention: "完了後2年"
    archive_trigger: "完了後2年経過"
    deletion: "アーカイブ後5年（法令要件に応じて延長）"
  decision:
    active_retention: "active / superseded / retiredの全期間"
    archive_trigger: "retiredから3年経過"
    deletion: "原則削除しない（法的証跡として永久保持）"
  knowledge:
    active_retention: "published / under_reviewの全期間"
    archive_trigger: "deprecatedから1年経過"
    deletion: "アーカイブ後3年"
  raw_signal:
    retention: "90日（immutable event log）"
    deletion: "90日経過後に自動削除（法令要件に応じて延長）"
```

### 6.3 監査メカニズム

**監査証跡（Audit Trail）**

すべての公式オブジェクトに対するCRUD操作は、改ざん不能な監査ログに記録する。

```yaml
audit_log_entry:
  timestamp: datetime
  actor: string           # 操作者（人間またはシステム）
  action: enum(create, read, update, status_change, delete)
  object_type: enum(task, decision, knowledge)
  object_id: string
  field_changes:           # 変更されたフィールドと変更前後の値
    - field: string
      old_value: any
      new_value: any
  context:
    channel: string        # 操作が行われたチャネル
    ip_address: string
    session_id: string
  justification: string    # 変更理由（ステータス遷移・削除時は必須）
```

**定期監査（Periodic Audit）**

| 監査種別 | 頻度 | 実施者 | 対象 |
|---|---|---|---|
| 正規化SLA監査 | 週次 | 自動 + Domain Governor | SLA超過件数、超過パターン |
| shadow channel監査 | 四半期 | IT部門 + Red Team | 定義外チャネルでの業務利用 |
| 権限棚卸し監査 | 半期 | IT部門 + Domain Governor | 不要な権限の検知・剥奪 |
| 情報フロー監査 | 半期 | Red Team / Auditor | 正規化を迂回した意思決定の検知 |
| Knowledge鮮度監査 | 月次 | 自動 + Knowledge Owner | review_dateを超過したKnowledgeの検知 |

### 6.4 コンプライアンス

この設計書の各構成要素と、一般的なコンプライアンス要件との対応を示す。

| コンプライアンス要件 | 対応する設計要素 |
|---|---|
| データの追跡可能性（Traceability） | provenance フィールド、監査ログ、linked_* によるオブジェクト間追跡 |
| アクセス制御（Access Control） | RBAC、権限の3層構造、IdP連携 |
| 保持と削除（Retention & Disposal） | 保持ポリシー、アーカイブ条件、削除条件 |
| 監査対応（Audit Readiness） | 改ざん不能な監査ログ、定期監査、情報フロー監査 |
| 変更管理（Change Management） | 状態遷移ルール、変更理由の必須記録 |
| インシデント対応（Incident Response） | 緊急信号の例外処理フロー、Exception Commander |

## 7. インセンティブ設計

v1で欠落していたインセンティブ設計を追加する。原理5（正規化は組織義務とする）を持続可能にするためには、人間の行動変容を設計の一部として扱う必要がある。

### 7.1 正規化コストの最小化

正規化を義務として課すだけでは、忙しいとき・面倒なときに迂回される。正規化の実行コストを構造的に下げることが、持続的な運用の前提条件である。

**コスト低減策1: ワンクリック正規化**

チャットツールから公式オブジェクトを作成する際のアクションを最小化する。具体的には、チャットメッセージに対するリアクション（絵文字）やショートカットから、Task / Decision / Knowledgeのドラフトを自動生成する。

**コスト低減策2: AI補完**

正規化ルータが信号の内容からフィールドを自動補完する。ユーザーは補完結果を確認・修正するだけで正規化が完了する。

**コスト低減策3: 会議自動抽出**

会議のトランスクリプトからTask（宿題）、Decision（意思決定）、Knowledge（共有された知見）の候補を自動抽出し、参加者にレビュー・承認を求める。

**コスト低減策4: テンプレートの標準化**

Task / Decision / Knowledgeのテンプレートを標準化し、フォーム入力で最小限の情報から公式オブジェクトを生成できるようにする。

**コスト低減策5: 既存ツールへの埋め込み**

正規化アクションを、ユーザーが日常的に使うツール（チャット、メール、会議ツール）のUI内に埋め込む。別のツールに切り替える必要をなくす。

### 7.2 正規化の動機付け

コスト低減に加え、正規化を行うことの正のインセンティブを設計する。

**動機付け1: 可視性の提供**

正規化された作業は組織から見える。見えない作業は評価されない。「Taskとして登録されていない作業は、工数としてカウントされない」というルールにより、正規化が自己防衛的な動機を持つ。

**動機付け2: 検索可能性の恩恵**

正規化された情報は検索面から発見可能になる。正規化する人自身が、将来の自分のために検索可能な状態を作っているという認識を育てる。

**動機付け3: 意思決定の保護**

Decisionとして正規化された意思決定は、後から「そんな決定はなかった」と覆されることがない。正規化は意思決定者自身を守る行為である。

**動機付け4: Knowledgeの貢献認知**

Knowledge記事のowner、作成者、貢献者を記録し、組織内で可視化する。知識共有への貢献がキャリア評価の一部として認知される仕組みを設ける。

**動機付け5: チームメトリクスへの組み込み**

正規化率（正規化SLA達成率）をチームの運用品質メトリクスに含める。個人の評価ではなくチーム単位で測定し、チーム内の相互支援を促す。

### 7.3 迂回の検知と是正

インセンティブが十分に機能しても、迂回は発生しうる。迂回を検知し、是正するメカニズムを設計する。

**迂回パターンと検知方法**

| 迂回パターン | 検知方法 | 是正アクション |
|---|---|---|
| チャットで依頼し、Task化しない | チャット上のactionable messageの未紐付け検知 | Bot通知 → SLA後にDomain Governorアラート |
| 会議で決定し、Decision化しない | 会議後のDecision/Task生成なし検知 | 会議organizer + 参加者への自動リマインド |
| メールで承認し、Decision化しない | 承認キーワード検知 + Decision不在 | メール送信者への正規化依頼通知 |
| 個人ストレージにファイルを保存 | CASB / DLP検知 | IT部門アラート → 組織ストレージへの移動依頼 |
| 定義外チャネルでの業務利用 | ネットワークログ分析 | IT部門アラート → チャネルポリシー違反通知 |
| Taskを起票するが最小限のフィールドしか埋めない | 必須フィールド不足検知 | Task ownerへの補完依頼 → SLA後にDomain Governorアラート |

**是正の段階**

1. **自動リマインド**: 迂回検知時にBotが該当者に通知する。これは罰則ではなく支援として設計する
2. **Domain Governor介入**: 自動リマインドで是正されない場合、Domain Governorが直接対応する
3. **ガバナンスレビュー**: 組織的・構造的に迂回が多発する場合、正規化プロセスまたはチャネル設計自体の見直しをトリガーする

**重要な設計判断**: 是正は懲罰的ではなく、構造的に行う。迂回が多発するのは、個人の怠慢ではなく、正規化コストが高すぎるか、インセンティブが不十分であるサインとして扱う。迂回データはインセンティブ設計の改善入力とする。

## 8. 組織ルール

設計原理と各設計要素を、組織が日常的に運用するルールとして定式化する。

### 8.1 4ルール + 補助ルール

**4つの基本ルール**

**ルール1**: Actionable なものは Task にする。

誰かが何かを行う必要がある信号は、Task IDを持つ公式オブジェクトに正規化する。Task IDのない依頼は「依頼したこと」にならない。

**ルール2**: Binding なものは Decision にする。

組織の方針・優先順位・例外処理を決定する信号は、Decision IDを持つ公式オブジェクトに正規化する。Decision IDのない判断は「決まったこと」にならない。

**ルール3**: Reusable / Evidential なものは Knowledge にする。

将来の参照・再利用に値する知識は、Knowledge IDとownerを持つ公式オブジェクトに正規化する。Knowledge ownerのない記事は「公式知識」にならない。

**ルール4**: 正規化されるまで、組織効力を持たせない。

Task / Decision / Knowledgeに正規化されていない情報は、組織の公式状態として効力を持たない。チャットの発言、会議の合意、メールの依頼は、正規化されるまで「暫定」である。

**補助ルール**

- 会議とDMは write surface ではない
- 人は記憶の終点ではなく、一時ソースである。人に聞いて得た有効知は書き戻す
- Search first, ask second, write back third
- 正式成果物（Artifact）は組織管理ストレージに保存する
- 個人ストレージ・個人フォルダは公式正本にしない
- 公式チャネル定義に含まれないチャネルでの業務利用は禁止する
- 正規化SLAを超過した場合はガバナンス逸脱として記録する

### 8.2 ガバナンスポリシー文面

以下は、そのまま社内ポリシーとして導入可能な文面である。

**情報効力ポリシー**

1. Task ID のない依頼は、公式依頼とみなさない。依頼者は公式チャネルを通じてTask化する義務を負う。
2. Decision ID のない判断は、公式決定とみなさない。意思決定者はDecision Recordを作成する義務を負う。
3. Knowledge owner と review date のない記事は、公式知識とみなさない。著者は公開前にownerとreview cycleを設定する義務を負う。
4. Chat、DM、Meeting、Emailは信号チャネルであり、公式write surfaceではない。これらのチャネル上の合意・指示・決定は、正規化されるまで暫定として扱う。

**チャネルポリシー**

1. 業務目的での情報の送受信は、公式チャネルとして定義されたツール・サービスに限定する。
2. 個人メッセンジャー、個人クラウドストレージ、未承認SaaSの業務利用を禁止する。
3. 新たなチャネルの業務利用が必要な場合は、公式チャネル追加プロセスに従い申請する。
4. 緊急時の代替チャネル使用は許容するが、公式チャネル復旧後24時間以内に正規化する義務を負う。

**保存ポリシー**

1. 正式成果物は、組織管理ストレージに保存する。
2. 個人ストレージ・個人フォルダは公式正本にしない。
3. すべての正式成果物は、Task / Decision / Knowledge のいずれかから辿れるようにする。
4. 組織管理ストレージに保存されたファイルは、owner / access group / review cycleを持つ。

**検索ポリシー**

1. 公式情報の探索は、統一検索面から開始する。
2. 検索で見つからない場合に限り、人に聞く。
3. 人に聞いて得た有効情報は、Task / Decision / Knowledge として書き戻す。

**正規化SLAポリシー**

1. Actionable な信号は、発生から当日中にTaskに正規化する。
2. Binding な意思決定は、発生から24時間以内にDecisionに正規化する。
3. Reusable な知識は、発生から48時間以内にKnowledgeに正規化する。
4. SLA超過はガバナンス逸脱として記録し、Domain Governorに通知する。

## 9. 設計上の反論とその回答

### 反論1: 「全部1つのツールに集めればいいのでは？」

**回答**: いいえ。単一ツール化は実装上は魅力的だが、移行コスト・業務適合・権限モデル・ベンダーロックインの観点で脆い。必要なのは単一DBではなく、論理的に一貫した状態モデルと、それを横断する検索面である。各オブジェクトにauthoritative sourceがあり、その上にpermission-awareな検索面が1つあればよい。

### 反論2: 「チャットを禁止すればよいのでは？」

**回答**: いいえ。チャットの禁止は感知能力を破壊する。チャットは組織の神経終末であり、信号の感知には最適である。禁止すべきなのはチャットではなく、チャットだけで状態が更新されること、すなわちチャットをwrite surfaceとして使うことである。

### 反論3: 「検索が強ければ入口は気にしなくてよいのでは？」

**回答**: いいえ。検索はgarbage-in / garbage-outを解決しない。入力が非構造・未正規化・属人であれば、検索は「探しやすい混乱」を増やすだけである。検索面の品質は、その入力（正規化された公式オブジェクト）の品質に依存する。

### 反論4: 「会議議事録を全部残せば十分では？」

**回答**: 不十分である。議事録は証跡にはなるが、Task / Decision / Knowledgeへの昇格がない限り、再利用・統制・検索に向かない。議事録は「何が話されたか」の記録であり、「何が決まり、誰が何をするか」の状態ではない。

### 反論5: 「人に聞く文化は悪いのか？」

**回答**: 悪くない。悪いのは、人に聞いた答えが組織記憶へ戻らないことである。人は暗黙知の一時ソースとして重要な役割を持つ。agi-era-organization-os.mdの人間の6職能における「Sensemaker / Active Extractor」は、まさにこの機能を担う。ただし、抽出された知識はKnowledgeに書き戻されなければならない。

### 反論6: 「チャネルを閉じると、感知能力が下がるのでは？」

**回答**: 「感知面を閉じる」とは、チャネル数を減らすことではない。公式チャネルの集合を有限に定義し、その外側を禁止領域とすることである。公式チャネルは必要に応じて追加できる。重要なのは、未定義チャネルでの業務利用を禁止することで、「どこかで起きたが組織が感知できなかった」という盲点を構造的に排除することである。実際には、公式チャネルの数は組織のニーズに応じて十分に多くなりうる。

### 反論7: 「正規化を義務化すると、現場の負荷が増えるのでは？」

**回答**: 正規化コストが高い場合はその通りである。だからこそ、インセンティブ設計（セクション7）で正規化コストの最小化を設計の一部に含めている。ワンクリック正規化、AI補完、会議自動抽出、テンプレート標準化により、正規化の限界コストを十分に下げる。また、正規化しないことの隠れたコスト（情報の再確認、幽霊状態への対応、重複作業）は、正規化のコストよりも大きい。

### 反論8: 「Autonomy Modeの算出は複雑すぎないか？」

**回答**: 初期導入時は、信号種別ごとにデフォルトのAutonomy Modeを固定する（セクション3.4の適用表）ことで、算出の複雑さを回避できる。Composite Riskに基づく動的な算出は、成熟度が上がった段階で段階的に導入する。

### 反論9: 「この設計はAGI前提だが、現在のAI能力で実装できるのか？」

**回答**: この設計のうち、構造・ポリシー・ルール・テンプレート・ワークフローは、現在の技術で完全に実装できる。AI自動分類・AI補完・会議自動抽出の精度は発展途上だが、これらはAutonomy Mode A3〜A5（人間のレビュー・承認を伴う）で運用することで、AI能力の限界を安全に吸収できる。AI能力の向上に伴い、Autonomy Modeを段階的に引き下げる設計になっている。

## 10. KPI / 監視指標

この設計の成否を測定するKPIと監視指標を定義する。

### 10.1 感知面の完全性

**KPI: Official channel coverage**

定義: 組織内で発生する業務関連の情報流通のうち、公式チャネルを通過した比率。

測定方法: ネットワークログ分析 + 定期サーベイ + shadow channel監査の結果を総合する。

目標: 95%以上（初年度）、99%以上（3年目）

### 10.2 正規化の達成度

**KPI: Normalization SLA compliance**

定義: 感知面で受け取った信号のうち、正規化SLA内にTask / Decision / Knowledgeへ正規化された比率。

測定方法: 正規化ルータのログから自動計測する。

目標: 80%以上（初年度）、95%以上（3年目）

**KPI: Official write path coverage**

定義: 組織状態変更イベントのうち、公式write pathを通った比率。

測定方法: 公式オブジェクトの作成・更新ログと、shadow ingress検知の結果を照合する。

目標: 90%以上（初年度）、98%以上（3年目）

### 10.3 状態の追跡可能性

**KPI: Decision traceability**

定義: 主要な変更・例外・方針のうち、Decision IDで追跡できる比率。

測定方法: 四半期の主要な組織的意思決定をサンプリングし、Decision Recordの存在を確認する。

目標: 70%以上（初年度）、90%以上（3年目）

**KPI: Orphan work ratio**

定義: 実施された作業のうち、TaskにもDecisionにも辿れない「出所不明の仕事」の比率。

測定方法: 工数実績とTask登録の照合、作業者へのサンプリング調査。

目標: 20%以下（初年度）、5%以下（3年目）

### 10.4 知識の再利用

**KPI: Knowledge reuse rate**

定義: 情報を必要とした場面のうち、人に聞かずに検索またはKBで自己解決できた比率。

測定方法: 検索ログ + サービスデスク起票数 + 定期サーベイ。

目標: 50%以上（初年度）、75%以上（3年目）

**KPI: Knowledge freshness**

定義: published状態のKnowledgeのうち、review_dateを超過していないものの比率。

測定方法: Knowledge storeから自動計測。

目標: 80%以上

### 10.5 ガバナンスの健全性

**KPI: Shadow ingress incident count**

定義: 「チャットだけで決めた」「会議だけで決めた」「個人Driveにしかない」等のshadow ingress案件数。

測定方法: 迂回検知メカニズム（セクション7.3）+ 情報フロー監査の結果。

目標: 月間10件以下（初年度）、月間2件以下（3年目）

**KPI: Access automation ratio**

定義: アクセス権付与・剥奪のうち、IdP連携により自動処理された比率。

測定方法: IdPのプロビジョニングログから計測。

目標: 80%以上（初年度）、95%以上（3年目）

### 10.6 正規化コストの効率性

**KPI: Average canonicalization time**

定義: 信号受信から正規化完了までの平均所要時間。

測定方法: 正規化ルータのログから自動計測。

目標: Taskは2時間以内、Decisionは8時間以内、Knowledgeは24時間以内。

**KPI: Auto-canonicalization ratio**

定義: 正規化のうち、人間の介入なしに完了した比率（A0-A2で正規化されたもの）。

測定方法: 正規化ルータのログから自動計測。

目標: 30%以上（初年度）、60%以上（3年目）

## 11. 成功判定

この設計が実際に機能しているかを判定する7つの質問と、追加の検証質問を定義する。

**基本の7つの質問（v1から継承）**

1. その依頼は Task ID を持っているか
2. その方針変更は Decision ID を持っているか
3. その再利用情報は Knowledge owner を持っているか
4. その正式ファイルは組織所有ストレージにあるか
5. その情報は permission-aware な検索から辿れるか
6. その担当者が退職・異動しても情報は残るか
7. 人に聞いて得た有効知は書き戻されているか

**v2で追加した検証質問**

8. その信号は公式チャネルを通って到達したか（感知面の閉包性）
9. 正規化はSLA内に完了したか（正規化の義務性）
10. 正規化を迂回した意思決定は検知・是正されているか（Governance Planeの機能）
11. 正規化コストは許容範囲にあるか（インセンティブ設計の妥当性）
12. 正規化ルータのAutonomy Modeは適切に設定されているか（8ステップフローとの整合）
13. Composite Riskの評価は正規化プロセスに反映されているか（リスク統制）

1つでも恒常的にNoが多い項目があれば、該当する設計要素の見直しが必要である。

## 12. 導入ロードマップ

### 12.1 前提条件チェックリスト

導入開始前に、以下の前提条件が満たされていることを確認する。

```yaml
prerequisites:
  organizational:
    - item: "経営層が情報入口統制の必要性を認識し、投資を承認していること"
      check: "経営会議の議事録にDecision IDが付いた承認記録がある"
    - item: "Domain Governorに相当する役割を担う人材が各部門にいること"
      check: "各部門から1名以上の担当者がアサインされている"
    - item: "正規化ポリシーを組織のルールとして導入することが合意されていること"
      check: "ポリシー文面のレビューと承認が完了している"

  technical:
    - item: "IdP（Identity Provider）が導入されていること"
      check: "全従業員がIdPでSSOログインしている"
    - item: "業務チャットツールが統一されていること"
      check: "1つのチャットツールに全従業員が参加している"
    - item: "組織管理ストレージが利用可能であること"
      check: "Shared Drive / SharePoint等の組織ストレージがセットアップされている"

  data:
    - item: "現行の情報フローが可視化されていること"
      check: "セクション2.1のチャネル棚卸しが完了している"
    - item: "shadow ingress（非公式な情報経路）が特定されていること"
      check: "shadow ingress listが作成されている"
```

### 12.2 Phase 0: 現状診断（2〜3週間）

**目的**: shadow ingressの可視化と移行計画の策定

**実施内容**:

1. セクション2.1の4手法でチャネル棚卸しを実施する
2. いま情報が「どこで決まっているか」を棚卸しする
3. DM、会議、メール、個人Drive、非公式ツールなどの非公式write surfaceを洗い出す
4. 現在のTask / Decision / Knowledgeに相当する正本候補を確認する
5. 移行の優先順位を決定する（最もshadow ingressが多い領域から着手）

**成果物**:

- 現行ingress map（チャネル一覧とその利用状況）
- shadow ingress list（非公式情報経路の一覧）
- 公式チャネル定義のドラフト
- 移行優先順位表

### 12.3 Phase 1: 感知面の定義と基本ルールの導入（3〜4週間）

**目的**: 感知面を閉じ、基本ルールを導入する

**実施内容**:

1. 公式チャネル定義を確定する（セクション2.2のスキーマに従って全チャネルを定義）
2. チャネルポリシーを全従業員に通知する
3. 4つの基本ルール（セクション8.1）を社内ポリシーとして導入する
4. Task / Decision / Knowledgeのテンプレートを確定する
5. ID規則、owner、review cycleを定義する
6. 「何がどのオブジェクトになるか」の分類ルールを定める
7. 正規化SLAを定義する

**成果物**:

- 公式チャネル定義書
- チャネルポリシー（全社通知済み）
- 公式オブジェクトモデル（フィールドスキーマ確定）
- 正規化ポリシー（SLA含む）
- Task / Decision / Knowledge テンプレート

### 12.4 Phase 2: 書き込み面の固定と正規化フローの構築（4〜6週間）

**目的**: write surfaceの固定と、正規化ルータの導入

**実施内容**:

1. Task intake（依頼受付）を公式経路に一本化する
2. サービスデスクまたはワークフローエンジンでintakeフローを構築する
3. 会議 → Task / Decision生成のフローを構築する
4. チャット → Task化のフロー（ワンクリック正規化）を構築する
5. メール → intake転記のフローを構築する
6. 「Decision は Decision Record に残す」ルールを導入する
7. 正式ファイルの保存先を組織管理ストレージへ統一する
8. 正規化SLA監視を開始する

**成果物**:

- 公式write pathの定義書
- intakeフローの実装
- チャネル別ルーティングフローの実装
- 正規化SLA監視ダッシュボード

### 12.5 Phase 3: 検索面の統合とGovernance Planeの構築（4〜6週間）

**目的**: 読み取り面の統合と、統治基盤の確立

**実施内容**:

1. permission-aware横断検索を導入する
2. group-basedアクセス制御に統一する
3. IdP連携によるJML自動化を実装する
4. Task / Decision / Knowledgeの相互リンク（linked_*フィールド）を整備する
5. 監査ログの取得を開始する
6. 定期監査のスケジュールを確定する
7. 迂回検知メカニズムを導入する

**成果物**:

- 統一検索面の実装
- 権限モデルの実装（IdP連携）
- 監査ログの取得設定
- 定期監査スケジュール
- 迂回検知の実装

### 12.6 Phase 4: 自動化と学習ループ（継続）

**目的**: 正規化コストの継続的低減と、設計の進化

**実施内容**:

1. AI自動分類の精度向上（分類結果のフィードバックループ）
2. 解決済みチケットからKnowledge候補の自動生成
3. 会議トランスクリプトからTask / Decision / Knowledgeの自動抽出
4. 外部signal（ニュース、法令変更）からの自動取込と正規化
5. KPIの定期レビューとshadow ingressの継続的削減
6. Autonomy Modeの段階的引き下げ（Trust Score向上に伴い）
7. 正規化ポリシーの定期改訂（Evolveステップ）

**継続的な運用リズム**:

- 毎日: 正規化SLA超過の確認、迂回検知アラートの処理
- 毎週: KPIダッシュボードのレビュー、Domain Governorによるポリシー微調整
- 毎月: Knowledge鮮度監査、正規化ルータの分類精度レビュー
- 四半期: チャネル棚卸しの再実施、shadow channel監査、成功判定質問の全項目チェック
- 半期: 権限棚卸し監査、情報フロー監査、Autonomy Mode見直し

## 13. ベンダー非依存の参照アーキテクチャ

この設計のレイヤー構成は、どのSaaS/ツールスタックを選んでも同一である。

```
┌──────────────────────────────────────────────────────────────────┐
│                     Governance Plane                             │
│  権限モデル / ポリシー管理 / 監査メカニズム / Trust Score         │
│  (Identity Provider, Policy Engine, Audit Log)                   │
├──────────────────────────────────────────────────────────────────┤
│                     Retrieval Surface                            │
│  Permission-aware 横断検索                                       │
│  (Enterprise Search Engine)                                      │
├──────────────────────────────────────────────────────────────────┤
│                     State Store                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐            │
│  │  Task Store  │  │Decision Store│  │Knowledge Store│           │
│  │ (Work Mgmt)  │  │(Decision Mgmt)│ │(Knowledge Mgmt)│          │
│  └─────────────┘  └─────────────┘  └──────────────┘            │
│                    ┌──────────────┐                              │
│                    │ Artifact Store│                              │
│                    │(Org File Store)│                             │
│                    └──────────────┘                              │
├──────────────────────────────────────────────────────────────────┤
│                  Canonicalization Router                          │
│  分類 / 補完 / 重複排除 / 権限付与 / ルーティング / SLA監視       │
│  (Service Desk, Workflow Engine, AI Classification)              │
├──────────────────────────────────────────────────────────────────┤
│                     Sensing Surface                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌──────────┐  │
│  │ Chat │ │Email │ │Meeting│ │Forms │ │Alerts  │ │External  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘ └────────┘ └──────────┘  │
│  (公式チャネルとして定義されたもののみ)                           │
├──────────────────────────────────────────────────────────────────┤
│                    Automation Layer                               │
│  イベント駆動 / 冪等性 / コネクタ                                │
│  (Integration Platform, iPaaS)                                   │
├──────────────────────────────────────────────────────────────────┤
│                    Identity Layer                                │
│  グループベースアクセス制御 / JML自動化                           │
│  (Identity Provider)                                             │
└──────────────────────────────────────────────────────────────────┘
```

**レイヤー別の必須要件**

| レイヤー | 役割 | 必須要件 |
|---|---|---|
| Sensing Surface | 信号を受け取る | 公式チャネルの定義、チャネルポリシーの強制、技術接続 |
| Canonicalization Router | 信号を正規化する | 分類・補完・重複排除・SLA監視・Autonomy Mode判定 |
| State Store (Task) | 行動の正本 | owner / due / status / priority / source_signal / provenance |
| State Store (Decision) | 判断の正本 | rationale / scope / review / decider / options / provenance |
| State Store (Knowledge) | 再利用知の正本 | owner / tags / review cycle / audience / provenance |
| State Store (Artifact) | 成果物の保存 | 組織所有 / 共有統制 / access group / owner |
| Retrieval Surface | 参照入口 | permission-aware横断検索、3モード検索 |
| Governance Plane | 統治基盤 | 権限モデル、ポリシー管理、監査ログ、コンプライアンス |
| Automation Layer | 接着層 | イベント駆動、冪等性、コネクタ |
| Identity Layer | 認証・認可基盤 | group-based RBAC、JML自動化、SSO |

## 14. 参考実装例

以下は、設計原理をどのツールスタックで実装するかの例である。この文書の本体はいかなるツールスタックにも依存しない。

### 14.1 参考実装A: Atlassian / Slack / Google / Okta スタック

**構成**

| レイヤー | ツール |
|---|---|
| Sensing Surface (Chat) | Slack |
| Sensing Surface (Meeting) | Google Meet + 録画・トランスクリプト |
| Sensing Surface (Email) | Gmail |
| Canonicalization Router | Jira Service Management（intake + triage + routing） |
| State Store (Task) | Jira |
| State Store (Decision) | Confluence（Decision Recordテンプレート） |
| State Store (Knowledge) | Confluence（Knowledge Articleテンプレート） |
| State Store (Artifact) | Google Shared Drives |
| Retrieval Surface | Rovo Search |
| Governance Plane | Okta（権限管理）+ Confluence（ポリシー管理）+ 監査ログ |
| Automation Layer | Workato / Atlassian Automation |
| Identity Layer | Okta |

**技術接続の具体例**

- Slackのactionable message → Slack Workflow Builderでフォーム入力 → Jira Service Managementに自動起票[^9][^10]
- Jira Service Managementのrequest typeごとにフォームとwork item viewを分離[^3][^4]
- Jira Service ManagementのKBはConfluenceと接続[^5]
- Confluenceのglobal / space / content restriction 3層権限で Decision / Knowledgeのアクセス制御[^8]
- Rovo SearchがAtlassian製品と外部アプリを横断検索（元システムの権限を尊重）[^6][^7]
- Google Shared Drivesで組織所有ストレージを実現（ファイルは個人ではなく組織に帰属）[^11][^12]
- Okta Lifecycle ManagementでJML自動化[^13]
- Workatoで Slack / Jira / Google Driveを跨いだ自動化[^14]

**実装スケッチ**

```yaml
sensing_surface:
  channels:
    - id: "ch-slack-001"
      tool: slack
      classification: primary
      integration: slack_events_api
    - id: "ch-gmail-001"
      tool: gmail
      classification: primary
      integration: gmail_api
    - id: "ch-gmeet-001"
      tool: google_meet
      classification: primary
      integration: transcript_api
    - id: "ch-jsm-portal-001"
      tool: jira_service_management
      classification: primary
      integration: native

canonicalization_router:
  tool: jira_service_management
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

state_store:
  task:
    system: jira
    authoritative: true
  decision:
    system: confluence
    template: decision-record
    authoritative: true
  knowledge:
    system: confluence
    template: knowledge-article
    authoritative: true
  artifact:
    system: google_shared_drives
    policy: "No official artifact in personal drive"

retrieval_surface:
  system: rovo_search
  policy: "Search first, ask second, write back third"

governance_plane:
  identity: okta
  policy_store: confluence
  audit_log: atlassian_audit_log + okta_system_log
  access_control: okta_groups + confluence_restrictions + jira_permissions

automation_layer:
  system: workato
  patterns:
    - slack_message_to_jsm_ticket
    - meeting_transcript_to_task_decision_draft
    - resolved_ticket_to_knowledge_candidate
    - file_upload_to_shared_drive
```

### 14.2 参考実装B: Microsoft 365 / Teams / SharePoint / Entra スタック

**構成**

| レイヤー | ツール |
|---|---|
| Sensing Surface (Chat) | Microsoft Teams |
| Sensing Surface (Meeting) | Microsoft Teams（録画・トランスクリプト） |
| Sensing Surface (Email) | Outlook |
| Canonicalization Router | Microsoft Forms + Approvals + Power Automate |
| State Store (Task) | Microsoft Planner / Azure DevOps |
| State Store (Decision) | SharePoint（Decision Recordテンプレート） |
| State Store (Knowledge) | SharePoint（Knowledge Articleテンプレート） |
| State Store (Artifact) | SharePoint / OneDrive for Business（組織管理） |
| Retrieval Surface | Microsoft Search |
| Governance Plane | Entra ID（権限管理）+ SharePoint（ポリシー管理）+ 監査ログ |
| Automation Layer | Power Automate |
| Identity Layer | Microsoft Entra ID |

**技術接続の具体例**

- TeamsのApprovals appで構造化された承認フローを構築（監査・コンプライアンス・説明責任を担保）[^16]
- Microsoft Formsの回答をPower Automateでapprovalフローへ接続[^17]
- Microsoft Searchがユーザーに権限のあるコンテンツのみを結果に表示[^15]

**注意点**

- Teams / SharePointは柔軟であるがゆえに、「何でもページ化して決定と知識が混ざる」事故が起きやすい。Task / Decision / Knowledgeのテンプレートと識別子管理を先に設計し、コンテンツタイプで強制する
- SharePointのサイト構造を、State Storeの論理構造（Task / Decision / Knowledge / Artifact）に対応させる

### 14.3 テンプレート

ツールスタック非依存で利用可能なテンプレートを定義する。

**Task Intake Form**

```yaml
title: task-intake-form
required_fields:
  - request_title
  - requester
  - team
  - desired_outcome
  - business_impact
  - due_date
  - urgency: enum(critical, high, medium, low)
  - sensitivity: enum(public, internal, restricted, confidential)
  - related_links: [url]
routing_logic:
  - if urgency == critical -> high_priority_queue
  - if sensitivity == restricted or confidential -> restricted_project
  - if category == access -> access_queue
  - else -> general_triage
output:
  - task_id
  - owner
  - triage_queue
  - autonomy_mode
```

**Decision Record Template**

```markdown
# Decision Record: <title>

- Decision ID:
- Date:
- Decider:
- Scope:
- Status: proposed / approved / active / superseded / retired
- Effective date:
- Review date:
- Autonomy Mode:
- Composite Risk: (irreversibility / financial / legal / brand / ethics / external / novelty / agency)

## Context
なぜこの判断が必要になったか。背景と制約。

## Options Considered
検討した選択肢。各選択肢のpros / cons / 前提条件。

## Chosen Option
採用した選択肢。

## Rationale
判断理由、期待する効果、受け入れたトレードオフ。

## Consequences
何が変わるか。何がやめられるか。副作用と二次影響の予測。

## Rollback Plan
この決定が誤りだった場合の撤回手順。

## Linked Tasks
この決定の実行に必要なタスク。

## Evidence
参考資料・議事録・データ・分析結果。

## Provenance
- Created by:
- Created at:
- Approved by:
- Source signal:
```

**Knowledge Article Template**

```markdown
# Knowledge: <title>

- Knowledge ID:
- Owner:
- Audience:
- Tags:
- Last reviewed:
- Next review:
- Review cycle: monthly / quarterly / semi-annual / annual
- Status: draft / published / under_review / archived / deprecated

## Summary
3行で分かる要約。

## Body
手順、定義、背景、FAQ、判断根拠。

## Source
どの Task / Decision / incident / project から生まれた知識か。

## Related Artifacts
ファイル、録画、設計書、データセット。

## Provenance
- Created by:
- Created at:
- Last updated by:
- Updated at:
- Source signal:
```

## 参考リンク

[^1]: Atlassian, "How to create and maintain a single source of truth"
https://www.atlassian.com/blog/confluence/how-to-create-and-maintain-a-single-source-of-truth

[^2]: Atlassian, "Building a true Single Source of Truth (SSoT) for your team"
https://www.atlassian.com/work-management/knowledge-sharing/documentation/building-a-single-source-of-truth-ssot-for-your-team

[^3]: Atlassian Support, "Customize a request type | Jira Service Management Cloud"
https://support.atlassian.com/jira-service-management-cloud/docs/customize-the-fields-of-a-request-type/

[^4]: Atlassian Support, "Use queues to triage requests for your agents / What are queues? | Jira Service Management Cloud"
https://support.atlassian.com/jira-service-management-cloud/docs/triage-customer-requests-for-your-agents-with-queues/
https://support.atlassian.com/jira-service-management-cloud/docs/what-are-queues/

[^5]: Atlassian, "Knowledge Management in Jira Service Management"
https://www.atlassian.com/software/jira/service-management/product-guide/getting-started/knowledge-management

[^6]: Atlassian Support, "What is Rovo? / Search | Rovo"
https://support.atlassian.com/rovo/docs/what-is-rovo/
https://support.atlassian.com/rovo/docs/search/

[^7]: Atlassian Support, "Manage Rovo connectors / How Rovo connector permissions are kept in sync"
https://support.atlassian.com/organization-administration/docs/manage-rovo-connectors/
https://support.atlassian.com/organization-administration/docs/how-connector-permissions-are-kept-in-sync/

[^8]: Atlassian Support, "Confluence permissions structure / Manage permissions at the content level"
https://support.atlassian.com/confluence-cloud/docs/what-are-confluence-cloud-permissions-and-restrictions/
https://support.atlassian.com/confluence-cloud/docs/manage-permissions-on-the-page-level/

[^9]: Slack Help Center, "Guide to Slack Workflow Builder / Build a workflow: Create a workflow in Slack"
https://slack.com/help/articles/360035692513-Guide-to-Slack-Workflow-Builder
https://slack.com/help/articles/17542172840595-Build-a-workflow--Create-a-workflow-in-Slack

[^10]: Slack Developer Docs / Help Center, "Using triggers / Create a workflow that starts outside of Slack / Creating webhook triggers"
https://api.slack.com/automation/triggers
https://slack.com/help/articles/360041352714-Build-a-workflow--Create-a-workflow-that-starts-outside-of-Slack
https://api.slack.com/automation/triggers/webhook

[^11]: Google Workspace Admin Help, "Set up shared drives for your organization / What are shared drives?"
https://support.google.com/a/answer/7337469
https://support.google.com/a/users/answer/7212025

[^12]: Google Workspace Admin Help, "Manage external sharing for your organization"
https://support.google.com/a/answer/60781

[^13]: Okta, "Lifecycle Management and App Provisioning Software"
https://www.okta.com/products/lifecycle-management/

[^14]: Workato, "Integration Library / Slack connector / Jira connector / Google Drive connector"
https://www.workato.com/integrations
https://docs.workato.com/connectors/slack.html
https://docs.workato.com/connectors/jira.html
https://docs.workato.com/connectors/google-drive.html

[^15]: Microsoft Learn, "Microsoft Search Overview"
https://learn.microsoft.com/en-us/microsoftsearch/overview-microsoft-search

[^16]: Microsoft Learn, "Manage the Approvals app in Microsoft Teams"
https://learn.microsoft.com/en-us/microsoftteams/approval-admin

[^17]: Microsoft Learn, "Common ways to use a form in a flow / Create an approval from the approvals app"
https://learn.microsoft.com/en-us/power-automate/forms/popular-scenarios
https://learn.microsoft.com/en-us/power-automate/teams/create-approval-from-teams-app
