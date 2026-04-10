# SmartHR様 DD AX Mock UI/UX Specification

更新日: 2026-04-10

## 0. この文書の目的

本書は、[dd-ax-mock-release-requirements-20260409.md](/Users/yuta/workspace/projects/noname/dd/smarthr/dd-ax-mock-release-requirements-20260409.md) を補完する文書である。

前者が定義しているのは、`どの画面が必要か` と `何を満たせば release とみなすか` である。  
本書が定義するのは、`その画面をどのようなユーザー体験として構成するか`、`その画面をどのような要素で組み立てるか`、`その要素をどの位置に置くか`、`その要素をどのような見た目にするか` である。

今回の対象は、以下の5プロダクトである。

1. `Longlist Radar`
2. `QA Merge Desk`
3. `DD Navigator`
4. `IM First Pass`
5. `Projection Sentinel`

この文書では、各プロダクトについて次の順序で定義する。

1. そのプロダクトで作るべき主要なユーザー体験
2. その体験を支える画面フロー
3. その画面ごとに必要なコンポーネント
4. そのコンポーネントのレイアウト
5. そのコンポーネントのビジュアル方針

## 1. 共通方針

### 1.1 何を UI で伝えるか

Phase 00 の mock が伝えるべきことは、`AI が判断する` ことではない。  
Phase 00 の mock が伝えるべきことは、`人が判断するまでの交通整理と探索負荷の削減` である。

したがって、全プロダクトで以下を守る。

- 画面の中心には、`結論` より先に `根拠` を置く
- 画面の主役は、派手な生成体験ではなく `比較しやすさ` と `追跡しやすさ` に置く
- 1画面につき、ユーザーが下す主要判断を1つに絞る
- `AI が自動で決めた` ように見える表現を避け、`提案`、`候補`、`未確定`、`要確認` を明示する
- 既存運用の置換対象と非置換対象が、画面構成から分かるようにする

### 1.2 Product Intro と Application Mock の役割分担

既存資産を見ると、`Product Intro HTML` は editorial な構成を持っている。これは問題ない。  
一方で、`Application Mock HTML` は日常業務で毎日開く画面として設計する必要がある。

そのため、以下を分ける。

- `Product Intro HTML`
  - 企画の背景、構造、価値仮説を説明する
  - serif を含む editorial な見せ方を許容する
- `Application Mock HTML`
  - 実務担当者が画面を見ながら判断できる状態を再現する
  - Web App コンテキストとして `Instrument Sans` を基準書体にする
  - serif のヒーロー演出は使わない

### 1.3 共通 UX 原則

#### A. 画面の冒頭で、その画面が答える問いを固定する

各画面の冒頭には、ページタイトルだけでなく、`この画面で何を判断するのか` が伝わる補助文を置く。

例:

- `今週優先して追う会社を決める`
- `重複候補を統合するか、別質問として残すかを決める`
- `この論点に対する根拠資料へ最短で到達する`

#### B. 主操作の位置を固定する

主要操作ボタンは、プロダクト内で位置を揺らさない。

- 一覧画面では、`新規作成 / 取込 / 設定` は右上
- レビュー画面では、`承認 / 保留 / 除外 / 出力` は右上または右ペイン上部
- 詳細画面では、`状態変更` と `メモ` を右側または末尾にまとめる

#### C. 比較する対象は、同じ視線移動で読める形に置く

比較が本質の画面では、カードを散らさない。

- Longlist の比較は `縦積みリスト`
- 質問統合の比較は `横並び比較`
- IM 比較は `マトリクス`
- モデルアラートの比較は `キュー + 詳細`

#### D. 静的モックでも状態差分を見せる

モックでは「通常状態」だけでは足りない。  
各画面に、少なくとも `通常`, `注意`, `未確定`, `完了` の4状態を共存させる。

#### E. フローの終点は、必ず次アクションにつなげる

良い業務UXは、`分かった` で終わらない。  
各フローの終点には、少なくとも次のいずれかを置く。

- 次に見るべき対象
- 次に依頼すべき相手
- 次に送るべき成果物
- 次に保留すべき理由

#### F. 途中離脱しても、再開位置が失われない

DD 実務では、1つの画面を最後まで見切る前に Slack、会議、別案件対応で中断される。  
そのため、各主要フローには `現在位置`, `未処理件数`, `次に処理すべき対象` が残る必要がある。

### 1.4 共通レイアウトパターン

#### Pattern A. Review Workspace

対象: `Longlist Radar`, `QA Merge Desk`, `Projection Sentinel`

- 固定ヘッダー
- 左ペイン: フィルター / キュー / テーマ
- 中央: 主たる比較対象
- 右ペイン: 詳細、判断、ログ、次アクション

推奨幅:

- 左: `240–280px`
- 中央: `minmax(680px, 1fr)`
- 右: `300–360px`

#### Pattern B. Document Workbench

対象: `DD Navigator`

- 固定ヘッダー
- 上部: 案件コンテキスト + 質問バー
- 左または中央: 文書本文 / 回答 / issue bundle
- 右: citation, 版情報, 関連論点, reading path

推奨幅:

- 文書本文: `60–68%`
- 右レール: `32–40%`

#### Pattern C. Triage + Detail

対象: `IM First Pass`

- 左ペイン: Inbox / 案件キュー
- 中央: 一次メモ
- 右ペイン: 仮ラベル理由 / 次アクション

推奨幅:

- 左: `280–320px`
- 中央: `1fr`
- 右: `280–320px`

#### Pattern D. Comparison Matrix

対象: `IM First Pass`, 一部の `QA Merge Desk`

- 左端列に比較軸を固定する
- 右方向に案件または候補を並べる
- 同じ高さのセルに、同じ意味の情報を置く

このパターンでは、比較カードを横に並べるだけの構成を避ける。

### 1.5 共通ビジュアルルール

Paper デザインシステムと既存資産を踏まえ、Application Mock では以下を固定する。

#### A. タイポグラフィ

- 見出し: `18px / 600` か `24px / 600`
- 本文: `14px / 400`
- 補助情報: `12px / 400`
- バッジ・小ラベル: `11px / 600`
- 数字、日付、セル参照、類似度、スコア: `JetBrains Mono`

#### B. 色の役割

- `ink-blue / wash-blue`: 選択中、参照先、アクティブ、情報
- `ink-green / wash-green`: 完了、承認済み、解決済み
- `ink-amber / wash-amber`: 保留、注意、要確認
- `ink-red / wash-red`: エラー、重大警告、除外対象

色は意味づけにのみ使う。  
セクションを装飾的に色分けしない。

#### C. サーフェス

- 通常カード: `paper-50` または `paper-100` 背景 + `slate-200` ボーダー
- 入力・編集領域: `paper-300` 背景を使い、閲覧領域と区別する
- モーダルやスライドオーバー: `paper-50`

#### D. 余白

- 画面セクション間: `24px`
- カード間: `16px`
- カード内パディング: `16px`
- インライン要素間: `8px`

#### E. 角丸

- カード: `8px`
- 入力欄、ボタン: `6–8px`
- バッジ: `999px`

### 1.6 共通コンポーネント定義

| コンポーネント | 役割 | レイアウト原則 | ビジュアル原則 |
|---|---|---|---|
| `Page Header` | 現在の画面目的と主要操作を示す | 左にタイトル、右に主要操作 | 背景は `paper-50`、下線は 1px か 2px |
| `Context Strip` | 案件名、フェーズ、テーマ、更新時刻を示す | ヘッダー直下に横並び | Mono を混ぜて情報密度を上げる |
| `Filter Rail` | 絞り込み軸を固定する | 左ペインに縦積み | 選択中の項目は `wash-blue` |
| `Queue/List` | レビュー対象を順番に処理する | 中央または左の縦リスト | hover より選択状態の差を強くする |
| `Detail Pane` | 選択対象の根拠と判断操作を示す | 右ペインかスライドオーバー | 情報は上から `要約 → 根拠 → 操作` の順 |
| `Citation Card` | 根拠箇所へのジャンプ単位 | 縦積み | ファイル名・ページ・抜粋を一塊で置く |
| `Status Badge` | 状態を一語で示す | タイトル近く | 色と文言の両方で伝える |
| `Confidence Badge` | 類似度や信頼度を示す | 根拠の近く | Mono + small label |
| `Audit Trail` | 誰が何を判断したかを残す | 右ペイン下部か独立画面 | タイムライン形式を基本にする |
| `Resume Marker` | 中断後にどこから再開するかを示す | ヘッダー直下かキュー上部 | `未処理件数` と `次に見る対象` を短く示す |
| `Empty / Warning / Unknown` | 判断不能や不足情報を示す | コンテンツ領域上部 | グレーではなく amber を使い、見落としを防ぐ |

### 1.7 レスポンシブ方針

今回は `デスクトップ優先` で作る。  
ただし、狭幅時の崩れは放置しない。

- `1024px 以上`
  - 基本レイアウトを維持する
- `768px–1023px`
  - 左レールを折りたたみ式にする
  - 右ペインは下段へ送る
- `767px 以下`
  - 比較作業は1画面で完結させない
  - リスト → 詳細の2段階遷移に切り替える

## 2. Product 01: Longlist Radar

### 2.1 このプロダクトで作るべき体験

Longlist Radar が作るべき体験は、`候補企業の一覧を見る体験` ではない。  
Longlist Radar が作るべき体験は、`更新が止まりやすいロングリストを、少ない認知負荷で回し続ける体験` である。

したがって、UX の中心には以下を置く。

- 今週どの会社を見るべきかが、一覧の時点で分かる
- 会社を開いた瞬間に、`なぜ今見るのか` と `どう接触するのか` が分かる
- テーマ定義の変更が、候補生成と優先順位の変化に直結して見える
- 久しぶりに開いても、`何が変わったか` だけを追えばよい

### 2.2 主要画面フロー

Longlist Radar には、1本の直線フローではなく、`週次運用フロー` と `仮説更新フロー` の2本がある。

#### A. 週次運用フロー

1. `Longlist Overview`
   - デフォルトホームとして開く
2. `Weekly Changes`
   - 今週変わった会社だけに絞って確認する
3. `Company Detail Sheet`
   - 変化の意味と接触可能性を確認する
4. `Longlist Overview`
   - その会社を全体順位の中で見直す

#### B. 仮説更新フロー

1. `Thesis Config`
   - 投資仮説を定義し、重みを変更する
2. `Longlist Overview`
   - 候補生成と順位変動を確認する
3. `Company Detail Sheet`
   - 新規候補や順位上昇候補の中身を確認する

#### C. 既知企業の即時確認フロー

1. `Longlist Overview`
   - 会社名やテーマから対象を検索する
2. `Company Detail Sheet`
   - 現在の接触可能性と優先理由を確認する

`Longlist Overview` は起点画面でもあるが、実運用では `Weekly Changes` と `Thesis Config` の両方から戻ってくる合流点でもある。
また、`Company Detail Sheet` には `前の候補 / 次の候補` を持たせ、レビュー対象を連続で処理できるようにする。

### 2.3 Screen A: Longlist Overview

#### 画面の役割

この画面の役割は、`候補会社の順位づけ` である。  
この画面では、会社を詳細に読む前に、`どの会社を先に見るか` を決められなければならない。

#### 構成要素

- `Page Header`
- `Search Bar`
- `Capacity Indicator`
- `Theme Filter Rail`
- `Status Filter Rail`
- `Summary Block`
- `Resume Marker`
- `View Toggle`
- `Sort Control`
- `Ranked Company List`
- `Latest Signals Rail`
- `Suggested Action Card`

#### レイアウト

- `Pattern A. Review Workspace` を使う
- 左レールに `Theme Filter`, `Status Filter`, `Summary Block` を縦積みする
- 中央には `Ranked Company List` を `縦積み` で置く
- 右レールには `Suggested Action Card` と `Latest Signals Rail` を置く

重要なのは、中央の会社表示を `3列グリッド` にしないことである。  
この画面の本質は装飾的なブラウズではなく、`優先順位の比較` と `理由の読み比べ` である。したがって、中央は縦積みカードか、行高のあるリストにする。

#### ビジュアル

- 背景は `paper-50`
- 選択中のテーマだけを `wash-blue` で強調する
- 会社カードは `paper-50` 背景 + `slate-200` 枠
- `Fit`, `Priority`, `Freshness`, `Next Action` は同じ位置に置く
- 会社カードのメイン見出しは `社名` ではなく `社名 + 優先理由` の組み合わせで成立させる

#### 会社カードの中身

- 1行目: `社名`, `Fit Badge`, `Priority Score`
- 2行目: `事業タグ`, `規模`, `最終更新日`
- 3行目: `なぜ今追うか`
- 4行目: `Change Signal Tags`
- 5行目: `現在ステータス`, `次アクション`

#### 静的モックで必ず見せる状態

- 上位候補
- 情報が古い候補
- 接触ルートが未設定の候補
- 名寄せが未確定の候補
- 自動生成候補だが未承認の候補

### 2.4 Screen B: Company Detail Sheet

#### 画面の役割

この画面の役割は、`この会社をどう扱うかの次アクションを決めること` である。

#### 構成要素

- `Company Header`
- `Business Snapshot`
- `Why Now`
- `Strategic Fit Breakdown`
- `Ownership / Sellability`
- `Signal Timeline`
- `Contact Route List`
- `Memo`
- `Action Footer`

#### レイアウト

- desktop では `右から出る詳細シート` を基本形とする
- 一覧画面の文脈を残したまま開けるように、全画面モーダルよりも `詳細シート` を優先する
- 上から順に `要約 → 理由 → ルート → 操作` の順で積む

#### ビジュアル

- `Why Now` は `wash-blue` の強調ボックスにする
- `Ownership / Sellability` は 2カラムで並べる
- `Signal Timeline` は日付を Mono で固定幅表示する
- `Contact Route` は `ルート種別`, `具体的接点`, `状態` を1行で読む形式にする

#### 静的モックで必ず見せる状態

- 接触ルートが複数ある会社
- 接触ルートが未設定の会社
- Signal が最近増えた会社
- 保留にすべき会社

### 2.5 Screen C: Thesis Config

#### 画面の役割

この画面の役割は、`投資仮説を構造化し、その仮説からどの候補が出てくるかを確認すること` である。

#### 構成要素

- `Theme Name`
- `Thesis Fields`
- `Exclusion Rules`
- `Weight Sliders`
- `Generated Candidate Table`
- `Approval Queue`

#### レイアウト

- 左 `40%` に設定フォーム
- 右 `60%` に候補テーブル
- 候補テーブルの上に `どの条件が候補生成に効いたか` を要約として置く

#### ビジュアル

- 入力フォームは `paper-300` 背景で編集領域だと分かるようにする
- 自動生成候補は `未承認` バッジ付きで表示する
- 承認済みと未承認を、色ではなく `状態ラベル + 行背景差` で区別する

#### 静的モックで必ず見せる状態

- 条件が厳しすぎて候補が少ない状態
- 条件が広すぎて候補が多い状態
- 候補を一部承認済みの状態

### 2.6 Screen D: Weekly Changes

#### 画面の役割

この画面の役割は、`全件を見直さずに再優先順位づけすること` である。

#### 構成要素

- `Date Selector`
- `Change Summary`
- `Change Feed`
- `Impact Label`
- `Review Check`

#### レイアウト

- 中央に時系列フィードを置く
- 右ペインに `今週見直すべき上位5社` を固定表示する

#### ビジュアル

- `Funding`, `Hiring`, `Partnership`, `Founder`, `Market` などの signal type は色付きアイコンではなく `略号 + wash` で抑制的に示す
- 既読チェックは小さく置き、主役にしない

#### 静的モックで必ず見せる状態

- 小さな変化
- 明らかに優先度を押し上げる変化
- 誤差のような変化

## 3. Product 02: QA Merge Desk

### 3.1 このプロダクトで作るべき体験

QA Merge Desk が作るべき体験は、`質問表をきれいに見せる体験` ではない。  
QA Merge Desk が作るべき体験は、`重複候補を先に絞り込み、人が統合判断だけに集中できる体験` である。

したがって、UX の中心には以下を置く。

- まず `どのクラスタを先に処理すべきか` が分かる
- 次に `なぜ重複候補とみなされたか` が分かる
- 最後に `どの質問を残し、どの質問を統合したか` を説明できる

### 3.2 主要画面フロー

QA Merge Desk の実務は直線ではなく、`クラスタ処理を繰り返すループ` と `送付前確認` に分かれる。

#### A. 取込と処理開始

1. `Import Queue`
   - どの質問表が取り込まれ、どの程度解析できたかを確認する
2. `Duplicate Cluster Board`
   - 先に処理すべき重複候補クラスタを選ぶ

#### B. 統合判断ループ

1. `Merge Workspace`
   - 元質問を比較し、統合・残す・保留を判断する
2. `Next Cluster Jump`
   - 同じ Workspace 内で次クラスタへ進む、または一覧へ戻る

このループを、`送付可能な状態になるまで` 繰り返す。

#### C. 送付前確認

1. `Export Preview`
   - セルサイドへ送る統合版を確認する
2. `Decision Log`
   - 監査痕跡を確認する

`Decision Log` は終端画面ではなく、`Merge Workspace` と `Export Preview` の両方から参照できる横断機能として扱う。
また、`Export Preview` で未処理クラスタが見つかった場合は、直接 `Merge Workspace` の該当クラスタへ戻せる必要がある。

### 3.3 Screen A: Import Queue

#### 画面の役割

この画面の役割は、`どのインプットが揃っていて、どの時点から重複検知を始められるかを確認すること` である。

#### 構成要素

- `Page Header`
- `Batch Status Summary`
- `Imported Sheets Table`
- `Source Module Filter`
- `Resume Marker`
- `Parse Quality Warnings`
- `Merge 開始ボタン`

#### レイアウト

- 上段に `Batch Status Summary`
- 下段は `Imported Sheets Table` を主役にした全幅構成にする
- 右上に `Merge 開始` を置く

#### ビジュアル

- 行ごとに `提出元`, `行数`, `更新日時`, `解析状態` を横並びで見せる
- 解析失敗や列名不一致は `wash-amber` で示す
- 完了状態は `wash-green` バッジで示す

#### 静的モックで必ず見せる状態

- 正常に解析済みのシート
- 列名が崩れているシート
- 更新が古いシート

### 3.4 Screen B: Duplicate Cluster Board

#### 画面の役割

この画面の役割は、`どのクラスタから処理するかを決めること` である。

#### 構成要素

- `Confidence Filter`
- `Module Filter`
- `Cluster Summary Strip`
- `Cluster Queue`
- `Queue Sort Control`
- `Risk Note`

#### レイアウト

- 左レールに `Confidence Filter` と `Module Filter`
- 中央に `Cluster Queue`
- 右ペインに `Risk Note` と `件数サマリー`

`Cluster Queue` は kanban にはしない。  
この画面で必要なのは状態の可視化より `処理順の決定` であるため、縦キューにする。

#### ビジュアル

- クラスタカードの冒頭に `信頼度`, `対象モジュール数`, `影響行数` を置く
- カード中央には `代表質問` と `差分の要点` を置く
- 右端に `統合候補あり`, `別質問の可能性あり`, `重大論点` のラベルを置く

#### 静的モックで必ず見せる状態

- ほぼ完全重複
- 表現揺れ
- 似ているが残すべき
- 重大論点なので人手判断が必要

### 3.5 Screen C: Merge Workspace

#### 画面の役割

この画面の役割は、`統合するか、別質問として残すかを決めること` である。  
この画面が QA Merge Desk の中心であり、最も情報設計を詰める必要がある。

#### 構成要素

- `Cluster Header`
- `Source Question Column`
- `Merged Draft Editor`
- `Decision Buttons`
- `Rationale Editor`
- `Traceability Panel`

#### レイアウト

- 12カラム基準で `5 / 4 / 3`
- 左 `5`: 元質問一覧
- 中央 `4`: 統合案エディタ
- 右 `3`: 対応関係パネルと判断ログ

左列では、元質問を `提出元 / シート名 / 行番号 / 原文` の順で読む。  
中央では、統合後の質問文を編集し、`統合`, `残す`, `保留` を押す。  
右列では、`どの質問がどの統合後質問に吸収されるか` を示す。

#### ビジュアル

- 左列の元質問カードはフラットな白カードにし、原文を主役にする
- 類似度は `Mono + Badge` で各カード右上に置く
- 中央のエディタは `paper-300` 背景にし、編集対象だと分かるようにする
- `統合` は黒または濃色の主ボタン、`保留` は amber、`別質問として残す` は白背景ボタンにする
- 右列の対応関係は `矢印的な文言` ではなく、`元質問 A,B,C → 統合質問 17` の対応表で見せる

#### 静的モックで必ず見せる状態

- 1つに統合できるクラスタ
- 文言は近いが2件残すべきクラスタ
- 保留中クラスタ
- 統合理由が短く、後から見ても意味が分からない悪い例

### 3.6 Screen D: Export Preview

#### 画面の役割

この画面の役割は、`セルサイドへ送る形式で品質を最終確認すること` である。

#### 構成要素

- `Outbound Sheet Preview`
- `Source-to-Output Mapping`
- `Open Questions`
- `Export Controls`

#### レイアウト

- 左 `8`: 統合後質問表プレビュー
- 右 `4`: 対応表と未処理クラスタ

#### ビジュアル

- テーブルは Excel 風だが、セルの再現を目的化しない
- ヘッダー行は `slate-100`
- 質問本文は複数行で読める高さを確保する
- 未処理クラスタがある場合は上部に amber の注意帯を出す

#### 静的モックで必ず見せる状態

- 送付可能な状態
- 未処理クラスタが残っていて送付できない状態

### 3.7 Screen E: Decision Log

#### 画面の役割

この画面の役割は、`なぜその統合判断にしたのかを後から追えるようにすること` である。

#### 構成要素

- `Decision Timeline`
- `Reviewer Filter`
- `Cluster Reference`
- `Before / After Snapshot`

#### レイアウト

- 左にタイムライン
- 右に選択中判断の詳細

#### ビジュアル

- 誰が判断したかをアイコン化しすぎない
- `日時`, `判断`, `理由` を時系列で静かに読ませる

## 4. Product 03: DD Navigator

### 4.1 このプロダクトで作るべき体験

DD Navigator が作るべき体験は、`資料を検索できる体験` ではない。  
DD Navigator が作るべき体験は、`論点に対して、根拠付きで最短到達できる体験` である。

したがって、UX の中心には以下を置く。

- どの資料を開くべきかを、論点から逆引きできる
- 回答を見るだけでなく、その回答の根拠箇所へ即座に飛べる
- 最新版と旧版を混同しない
- 経験の浅いメンバーでも、最初の3歩が分かる

### 4.2 主要画面フロー

DD Navigator には、`経験者向けの探索フロー` と `ジュニア向けの立ち上がりフロー` の2本を用意する必要がある。

#### A. 経験者向け探索フロー

1. `Deal Home`
   - 案件全体の論点と最新更新を把握する
2. `Ask` または `Issue Lens`
   - 聞きたい問いが明確なら Ask、まだ論点を広く見たいなら Issue Lens に入る
3. `Document Viewer`
   - citation を起点に該当箇所を開く
4. `Evidence Share`
   - 根拠をチームへ渡せる形にまとめる

#### B. ジュニア向け立ち上がりフロー

1. `Deal Home`
   - 案件の現在地と主要論点を把握する
2. `Reading Path`
   - まず何を読むべきかを知る
3. `Document Viewer`
   - 指定された資料を読む
4. `Issue Lens`
   - 読んだ資料がどの論点に効くかを理解する
5. `Ask`
   - なお残る疑問を自然文で確認する
6. `Evidence Share`
   - 自分が確認した根拠を共有できる形にまとめる

重要なのは、mock の起点を `汎用ダッシュボード` に置きすぎないことである。  
このプロダクトの価値は `案件の中で迷わないこと` にあるため、release 版の mock は `案件文脈` を主役にする。
また、`Ask` は唯一の入口ではなく、`Issue Lens` と `Reading Path` を並列入口として持つ必要がある。

### 4.3 Screen A: Deal Home

#### 画面の役割

この画面の役割は、`今この案件で何を先に見るべきかを把握すること` である。

#### 構成要素

- `Deal Header`
- `Resume Marker`
- `Issue Quick Links`
- `Recent Documents`
- `New Upload Alerts`
- `Latest Q&A Updates`
- `Read First Panel`

#### レイアウト

- 上部に `Deal Header`
- 下部は `3カラム`
  - 左: `Issue Quick Links`
  - 中央: `Recent Documents` と `Latest Q&A Updates`
  - 右: `New Upload Alerts` と `Read First Panel`

#### ビジュアル

- ここでは指標カードを主役にしない
- 重要なのは `何が増えたか`, `どの論点が熱いか`, `どこから読むか` の3点である
- `Issue Quick Links` はタグ列ではなく、押せる短冊カードにする

#### 静的モックで必ず見せる状態

- 新規資料が入った案件
- 同じ論点に対して複数資料がある案件
- 読み始めの導線が明確な案件

### 4.4 Screen B: Ask

#### 画面の役割

この画面の役割は、`論点に対する答えと、その根拠へ短時間で到達すること` である。

#### 構成要素

- `Question Composer`
- `Answer Block`
- `Answer Confidence / Unknown Notice`
- `Citation Stack`
- `Related Issues`
- `Related Documents`

#### レイアウト

- 画面上部に質問バーを固定する
- 下部は `7 / 5` の2カラム
  - 左 `7`: `Answer Block` と `Related Documents`
  - 右 `5`: `Citation Stack`, `Related Issues`

回答を大きく、citation を小さく置いてはいけない。  
この画面では、回答と citation が一体で価値を持つため、右列の citation は常に視界に入る幅を確保する。

#### ビジュアル

- 回答本文は 14px 本文
- `不明` や `根拠不十分` は amber の注意帯で示す
- citation カードは `ファイル名 / ページ / 抜粋` の3段構成にする
- ページ番号や版番号は Mono で示す

#### 静的モックで必ず見せる状態

- 参照付きで答えられる質問
- 根拠不十分で断定できない質問
- 最新版資料が別にある質問

### 4.5 Screen C: Document Viewer

#### 画面の役割

この画面の役割は、`citation から本文へ飛び、前後の文脈と版情報を確認すること` である。

#### 構成要素

- `Document Header`
- `Version Switcher`
- `Document Canvas`
- `Highlighted Snippet`
- `Metadata Rail`
- `Related Citations`

#### レイアウト

- 左 `8`: 文書本文
- 右 `4`: 版情報、メタデータ、関連 citation

比較表示を見せる場合でも、`本文` を犠牲にして比較UIを広げすぎない。  
主役はあくまで原文である。

#### ビジュアル

- 文書ビューは PDF そのものの完全再現でなくてよい
- ただし、余白、ページ番号、見出しの階層はそれらしく見せる
- ハイライトは濃い黄色ではなく、淡い `wash-amber` にする
- 旧版が存在する場合は、ヘッダーで `最新版 / 旧版` を明示する

#### 静的モックで必ず見せる状態

- 該当箇所ハイライト
- 最新版あり
- 旧版との差分あり

### 4.6 Screen D: Issue Lens

#### 画面の役割

この画面の役割は、`論点ごとに資料束を読み、何が分かっていて何が未確定かを整理すること` である。

#### 構成要素

- `Issue Selector`
- `Evidence Bundle`
- `Known Facts`
- `Open Questions`
- `Recommended Next Read`

#### レイアウト

- 左 `Issue Selector`
- 中央 `Evidence Bundle`
- 右 `Known Facts / Open Questions / Recommended Next Read`

#### ビジュアル

- `Evidence Bundle` はカードグリッドではなく縦束にする
- 1枚ずつ `資料名`, `該当箇所`, `論点への効き方` を示す
- `Known Facts` と `Open Questions` は色ではなく見出しで分ける

#### 静的モックで必ず見せる状態

- 根拠が豊富な論点
- 根拠が不足する論点
- Q&A 回答で補完されている論点

### 4.7 Screen E: Reading Path

#### 画面の役割

この画面の役割は、`経験の浅い担当者が、どの順番で何のために読むかを理解すること` である。

#### 構成要素

- `Path Header`
- `Step Cards`
- `Goal of Each Step`
- `Expected Output`
- `Estimated Reading Time`

#### レイアウト

- 全幅の縦ステップ構成にする
- 各 step card の中で `読む資料`, `なぜ読むか`, `読み終えたら何が分かるか` を並べる

#### ビジュアル

- ステップは numbered list として見せる
- 色で順番を伝えず、番号と余白で伝える
- `30分`, `15分`, `10分` のような時間情報は Mono で示す

### 4.8 Screen F: Evidence Share

#### 画面の役割

この画面の役割は、`見つけた根拠を、他者がすぐ使える形にまとめること` である。

#### 構成要素

- `Selected Evidence`
- `Issue Summary`
- `Key Citations`
- `Open Questions`
- `Share Format Tabs`
- `Copy / Export Actions`

#### レイアウト

- 左 `8`: `Issue Summary` と `Key Citations`
- 右 `4`: `Open Questions`, `Share Format Tabs`, `Copy / Export Actions`

#### ビジュアル

- 単なる export ダイアログではなく、`何が分かっていて何が未確定か` がそのまま共有できる形にする
- citation は短く削りすぎず、第三者が再訪できる粒度を残す

#### 静的モックで必ず見せる状態

- すぐ共有できる根拠セット
- 根拠はあるが未確定事項も残るケース

## 5. Product 04: IM First Pass

### 5.1 このプロダクトで作るべき体験

IM First Pass が作るべき体験は、`IM を要約する体験` ではない。  
IM First Pass が作るべき体験は、`投資仮説に照らして、初見レビューの型を揃える体験` である。

したがって、UX の中心には以下を置く。

- `合う理由`, `懸念点`, `未確定事項` が混ざらない
- `Go / Watch / Pass / Unknown` が、仮ラベルとして自然に扱える
- 面談前に何を聞けば判断が進むかが分かる
- 複数案件を同じ物差しで比較できる

### 5.2 主要画面フロー

IM First Pass の実務は、`単案件の一次判断フロー` と `複数案件の比較フロー` に分かれる。

#### A. 単案件の一次判断フロー

1. `IM Inbox`
   - どの案件を先にレビューするかを決める
2. `First Pass Memo`
   - 一次評価メモを読む
3. `Decision Handoff` または `Next Questions`
   - 判断が固まるなら Decision Handoff、判断保留なら Next Questions に進む
4. `Decision Handoff`
   - `Go / Watch / Pass / Unknown` の仮ラベルと次アクションを確定する
5. `IM Inbox`
   - 次の案件へ戻る

#### B. 複数案件の比較フロー

1. `IM Inbox`
   - 比較対象案件を選ぶ
2. `Comparison Matrix`
   - 複数案件を同じ軸で比較する
3. `Decision Handoff`
   - 仮ラベルと次アクションを揃えて出す

`Comparison Matrix` は必須の終端画面ではなく、判断に迷う案件を並べて比較するための補助フローとして扱う。
また、`Next Questions` は全案件で必須ではなく、`判断を進めるための追加情報が必要な案件` にだけ差し込む分岐とする。

### 5.3 Screen A: IM Inbox

#### 画面の役割

この画面の役割は、`流入案件を捌く優先順位を決めること` である。

#### 構成要素

- `Inbox Filter`
- `Resume Marker`
- `Channel Tags`
- `Received Date`
- `Temporary Label`
- `Selected Preview`
- `Thesis Reminder`

#### レイアウト

- `Pattern C. Triage + Detail`
- 左に案件キュー
- 中央に選択中案件のプレビュー
- 右に `Thesis Reminder` と `ラベル理由の短い要約`

#### ビジュアル

- 一覧はカードではなく、行高のある inbox 形式の一覧を基本にする
- 各行で `案件名`, `受領日`, `チャネル`, `仮ラベル`, `資料充足度` を読む
- `Unknown` と `資料不足` は別ラベルにする

#### 静的モックで必ず見せる状態

- Go 仮説
- Watch 仮説
- Pass 仮説
- Unknown
- 資料不足

### 5.4 Screen B: First Pass Memo

#### 画面の役割

この画面の役割は、`この案件をどう見るべきかの一次見立てを揃えること` である。

#### 構成要素

- `Deal Snapshot`
- `Fit Reasons`
- `Concerns`
- `Unknowns`
- `Temporary Label Panel`
- `Memo Metadata`

#### レイアウト

- 上段に `Deal Snapshot`
- 中段は `3カラム`
  - 左: `Fit Reasons`
  - 中央: `Concerns`
  - 右: `Unknowns`
- 右上に `Temporary Label Panel`

この画面では、`Fit`, `Concern`, `Unknown` を縦積みしない。  
3つは比較されるべき並列情報であるため、同じ高さのカラムで並べる。

#### ビジュアル

- `Fit Reasons` は白背景
- `Concerns` は `wash-amber` を薄く使う
- `Unknowns` は `paper-300` 背景で未確定性を示す
- `Temporary Label Panel` では、ラベルより理由文を大きく置く

#### 静的モックで必ず見せる状態

- Go だが懸念もある案件
- Watch で未確定事項が多い案件
- Pass だが資料は整っている案件

### 5.5 Screen C: Next Questions

#### 画面の役割

この画面の役割は、`次回面談で何を聞けば判断が進むかを確認すること` である。

#### 構成要素

- `Question List`
- `Why This Matters`
- `Linked Unknown`
- `Decision Impact`

#### レイアウト

- 単純な箇条書きではなく、`4列テーブル` にする
- 列は `質問`, `この質問が効く理由`, `対応する未確定事項`, `答えによる判断への影響`

#### ビジュアル

- 質問文を最も太く、大きくする
- `Decision Impact` は `Go 側に寄る`, `Pass 側に寄る`, `Unknown を解消` のように短く明示する

#### 静的モックで必ず見せる状態

- 面談で必ず聞くべき質問
- あれば判断が進むが必須ではない質問

### 5.6 Screen D: Comparison Matrix

#### 画面の役割

この画面の役割は、`複数案件を同じ型で比較すること` である。

#### 構成要素

- `Comparison Header`
- `Criteria Column`
- `Deal Columns`
- `Label Row`
- `Key Concern Row`
- `Unknown Row`
- `Next Step Row`

#### レイアウト

- `Pattern D. Comparison Matrix`
- 左端に評価軸を固定する
- 右に3件前後の案件列を並べる

この画面は比較カードの横並びにしない。  
案件ごとにカードを分けると、比較軸が視線移動ごとに失われるためである。

#### ビジュアル

- 行見出しは `slate-100`
- 案件列の見出し部分に `仮ラベル` を置く
- `合う理由`, `懸念点`, `未確定` はセルの背景を少し変えるが、原色は使わない

### 5.7 Screen E: Decision Handoff

#### 画面の役割

この画面の役割は、`仮ラベルを次アクションにつなげること` である。

#### 構成要素

- `Temporary Decision`
- `Decision Reason`
- `Owner`
- `Next Action`
- `Needed by When`
- `Share Summary`

#### レイアウト

- 左に `Decision Reason`
- 右に `Temporary Decision`, `Owner`, `Next Action`
- 画面下部に `Share Summary`

#### ビジュアル

- `Go / Watch / Pass / Unknown` は大きなラベルで示す
- ただし、主役はラベルではなく `Decision Reason` に置く
- `Next Action` は自然文ではなく、`NDA 打診`, `面談設定`, `追加資料待ち`, `見送り連絡` のように操作単位で示す

#### 静的モックで必ず見せる状態

- Go で NDA 打診に進む案件
- Watch で追加資料待ちにする案件
- Pass で見送りにする案件
- Unknown で事業部確認に回す案件

## 6. Product 05: Projection Sentinel

### 6.1 このプロダクトで作るべき体験

Projection Sentinel が作るべき体験は、`スプレッドシートをきれいに表示する体験` ではない。  
Projection Sentinel が作るべき体験は、`レビュー対象を危険箇所から絞り込む体験` である。

したがって、UX の中心には以下を置く。

- まず `どのアラートから見るべきか` が分かる
- 次に `そのアラートが構造エラーか、意味上の警告か` が分かる
- 最後に `どのセルが、どのセルへ影響しているか` が分かる

### 6.2 主要画面フロー

Projection Sentinel には、`レビュー開始フロー` と `ルール補正フロー` の2本が必要である。

#### A. 決定論的エラーの高速処理フロー

1. `Workbook Overview`
   - 決定論的エラーの件数を把握する
2. `Alert Review Queue`
   - `構造 / 計算` エラーに絞って優先度順に見る
3. `Cell Trace View`
   - 元セル、参照元、影響先を確認する
4. `Resolve / Dismiss`
   - `対応済み`, `誤検知`, `要確認` を付ける
5. `Alert Review Queue`
   - 次のアラートへ戻る

#### B. 推論的警告のレビューフロー

1. `Workbook Overview`
   - 意味や前提の警告件数を把握する
2. `Alert Review Queue`
   - `意味 / 前提` の警告に絞って見る
3. `Cell Trace View`
   - 警告理由と周辺セルを確認する
4. `Resolve / Dismiss`
   - 一時保留、誤検知、要確認を付ける
5. `Alert Review Queue`
   - 次の警告へ戻る

#### C. ルール補正フロー

1. `Workbook Overview`
   - モデル構造の解釈に違和感がないか確認する
2. `Rule Config`
   - 案件固有ルールを設定する
3. `Alert Review Queue`
   - ルール反映後のアラートを見直す

`Rule Config` は最後に一度だけ触る画面ではない。  
シート構造の解釈がずれている場合に、レビュー前またはレビュー途中で差し込む補正フローとして扱う。

### 6.3 Screen A: Workbook Overview

#### 画面の役割

この画面の役割は、`モデル全体のどこが危ないかを俯瞰すること` である。

#### 構成要素

- `Workbook Header`
- `Severity Summary`
- `Alert Type Summary`
- `Sheet Health Table`
- `Recent Review Panel`

#### レイアウト

- 上段に `Workbook Header` と要約指標
- 下段は `8 / 4`
  - 左: `Sheet Health Table`
  - 右: `Recent Review Panel`

#### ビジュアル

- 要約指標は 4つ以内に留める
- `構造`, `計算`, `意味`, `前提` の分類を固定表示する
- `重大度` と `信頼度` は分離して表示する

#### 静的モックで必ず見せる状態

- 決定論的エラーが多いモデル
- 推論的警告が多いモデル
- レビュー未着手のシート

### 6.4 Screen B: Alert Review Queue

#### 画面の役割

この画面の役割は、`どのアラートを先に潰すかを決めること` である。

#### 構成要素

- `Alert Type Filter`
- `Resume Marker`
- `Severity Filter`
- `Confidence Filter`
- `Alert Queue`
- `Selected Alert Summary`
- `Review Actions`

#### レイアウト

- 左 `320px`: `Alert Queue`
- 中央 `1fr`: 選択中アラートの要約とスプレッドシート断片
- 右 `320px`: `Review Actions`

この画面は全幅テーブルにしない。  
レビューでは `一覧を見る行為` と `1件を深く確認する行為` が往復するため、一覧と詳細が同時に見える構成にする。

#### ビジュアル

- `構造エラー` は白背景 + 赤枠
- `推論的警告` は `wash-amber` 背景 + amber ラベル
- `誤検知として除外済み` は色を薄くし、主役から下げる

#### 静的モックで必ず見せる状態

- 即対応が必要なアラート
- 要確認アラート
- 誤検知として閉じたアラート

### 6.5 Screen C: Cell Trace View

#### 画面の役割

この画面の役割は、`なぜこのセルが危ないのかを構造的に理解すること` である。

#### 構成要素

- `Cell Reference Header`
- `Formula Panel`
- `Spreadsheet Viewport`
- `Precedent Cells`
- `Dependent Cells`
- `Warning Reason`

#### レイアウト

- 上段に `Cell Reference Header` と `Formula Panel`
- 中段は `Spreadsheet Viewport`
- 下段は `Precedent Cells` と `Dependent Cells` の2カラム

#### ビジュアル

- セル座標、数式、参照範囲は Mono で示す
- スプレッドシート断片は実物の複製に寄せるが、情報を詰めすぎない
- 問題セル、参照元、影響先は、塗り色を変えるのではなく枠線とラベルで区別する

#### 静的モックで必ず見せる状態

- SUM 範囲ずれ
- シナリオ列への反映漏れ
- 二重計上の疑い

### 6.6 Screen D: Rule Config

#### 画面の役割

この画面の役割は、`案件固有のモデル構造を、レビューエンジンが誤解しないように教えること` である。

#### 構成要素

- `Quarter Column Config`
- `Scenario Column Config`
- `Color Meaning Config`
- `Ignore Rules`
- `Validation Preview`

#### レイアウト

- 左に設定フォーム
- 右に `Validation Preview`

#### ビジュアル

- 設定項目はコード風にしない
- `この色は入力セル`, `この列は四半期`, `この列はベースケース` のように日本語で読める形にする
- `Validation Preview` では、ルール設定の結果どのセルが入力として解釈されたかを見せる

## 7. 画面ごとの実装優先順位

HTML/CSS mock を金曜までに見せる前提では、各プロダクトで最初に作るべき画面を以下とする。

### 7.1 優先順位 A

- `Longlist Radar`
  - `Longlist Overview`
  - `Company Detail Sheet`
- `QA Merge Desk`
  - `Duplicate Cluster Board`
  - `Merge Workspace`
- `DD Navigator`
  - `Ask`
  - `Document Viewer`

### 7.2 優先順位 B

- `Longlist Radar`
  - `Weekly Changes`
- `QA Merge Desk`
  - `Export Preview`
- `DD Navigator`
  - `Issue Lens`
  - `Reading Path`
- `IM First Pass`
  - `IM Inbox`
  - `First Pass Memo`
- `Projection Sentinel`
  - `Alert Review Queue`
  - `Cell Trace View`

### 7.3 理由

- `A群` は、初見で価値が伝わる中心体験を担う
- `B群` は、中心体験の説得力を上げる
- `IM First Pass` と `Projection Sentinel` は価値が高いが、ダミーデータと文言精度の要求が高いため、画面品質を下げて急ぐより後ろに置く方が良い

## 8. この仕様で避けるべきこと

- ダッシュボード的な指標カードを画面の主役にすること
- 色数を増やして論点を区別した気になること
- AI の自動判定を、根拠より大きく見せること
- 比較すべき情報を、カードの分割で逆に比較しづらくすること
- 既存運用を全部置き換える前提に見える UI にすること

## 9. 次に実装へ落とすときの単位

この文書の次に必要なのは、各プロダクトについて以下を切ることである。

1. `画面ごとのダミーデータ定義`
2. `画面ごとの DOM セクション構成`
3. `共通 CSS token と component class`
4. `静的状態切替のための最小 JavaScript`

この順序で落とせば、`mock の業務理解` と `HTML/CSS の実装品質` を両方維持しやすい。
