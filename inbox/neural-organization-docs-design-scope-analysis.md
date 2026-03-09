# neural-organization/docs の設計射程分析 — 「AGI時代の組織再設計」への回答度の構造的評価

## 本レポートの目的

[neural-organization/docs](https://github.com/thedomainai/neural-organization/tree/main/docs) は、「AGI時代の組織をどう再設計すべきか」という問いに対して、どこまで答えており、どこに空白が残っているのか。本レポートは、この問いを抽象度の高い理論枠組みから網羅的・構造的に評価したものである。

## 対象リポジトリの全体像

### 設計思想

neural-organization/docs は、単なる設計メモ集ではなく、AGI時代の組織を再設計するための体系的知識基盤である。思想、参照モデル、実装、運用、学習、意思決定履歴までが一貫して接続されている。

中核にある思想は、**「人間が実行して AI が補助する」のではなく、「AI が知的処理と実行を担い、人間が目的・価値・統治を与える」**という役割の反転である。人間は instruction giver ではなく governor であり、意味・価値・境界を注入する存在として再定義されている。

### アーキテクチャの骨格

組織を **5層の認知変換パイプライン** として捉える。

- **L0 Perception**: 外部ツールや業務システムからの信号取得
- **L1 Understanding**: 世界モデルの構築
- **L2 Reasoning**: 目的に照らしたギャップ分析・機会発見・トレードオフ判断
- **L3 Execution**: 成果物生成・外部操作
- **L4 Reflection**: 結果と人間修正を学習信号として各層に還流

これを横断する4要素が **Purpose / Governance / Memory / Orchestration** である。

### 文書群の役割分担

| 文書 | 役割 |
|---|---|
| `concept.md` | 世界観。人間役割の5類型（Governor / Sensemaker / Creator / Connector / Custodian）の定義 |
| `framework.md` | 参照モデル。5層 + 4横断要素の抽象設計 |
| `design.md` | 実装詳細。CRM・HR・Finance 等のツール接続、世界モデル例、QA とゲート |
| `philosophy/` | 各設計要素の理由づけ。`interface-design.md` が人間側設計の中心 |
| `hitl/` | Human-in-the-Loop を暗黙知抽出機構として再設計する仕組み |
| `decisions/` | アーキテクチャ進化の意思決定記録（ADR） |
| `agentic-ai-framework.md` | 他ドメインへの移植用導入手順 |
| `ax-company-design.md` | 複数プロジェクトを一つの organizational intelligence に統合するポートフォリオ構想 |

### 設計の特筆点

**Reflection が組織知能の成立条件になっている。** 出力結果や実世界の反応だけでなく、人間がどこをどう修正したかまでを高価値な学習信号として扱い、Memory・Trust・将来の自律範囲に還流させる設計になっている。

**HITL は承認機構ではなく暗黙知抽出機構である。** `information-requirements.md` では AI が見落としやすいものを Unobserved Facts / Causal Mechanisms / Stakeholder Intent / Value Priority / Upcoming Context / Judgment Override の6種に整理し、`extraction-patterns.md` では Gap Filling / Counterfactual / Forced Ranking / Premortem など10個の引き出し方を定義している。

**Governance は二重ゲート構造である。** Reasoning 段階と Execution 段階のそれぞれにゲートがあり、Trust Score に応じて自律度が変化し、不可逆性・新規性・不確実性に応じて人間介入が入る。

### 設計の進化経緯

アーカイブや ADR 群から、以前は7層ないし8層の神経系メタファーが強かった痕跡が見える。その後 ADR を通じて現在の5層 + 4横断要素へ統合された。現設計は最初から固定されたものではなく、試行錯誤の収束結果である。

### 文書間の内部整合性に関する留意点

1. **Invariant Principles の不一致**: README の quick reference（Capability Indirection / Memory Stratification / Dual Governance Filter / Reflective Closure / Purpose Primacy）と現行 `invariant-principles.md` の前面原則（Capability Indirection / Observability Primacy / Graceful Degradation / Context as Currency / Configuration and State as Data）が一致していない。設計進化に README が追随できていない可能性が高い。

2. **Memory 実装記述の差異**: `framework.md` では PostgreSQL + vector DB、`design.md` では graph DB + vector DB。矛盾というより、前者が抽象寄り、後者が世界モデル中心の具体化寄りという表現差と解釈できる。

## 評価枠組み: 3つの最上位問い

「AGI時代の組織をどう再設計すべきか」という大問は、以下の3つの最上位問いに分解できる。

1. **組織は何者か** — 社会的存在としての正当性、権力構造、利害配分
2. **組織はどう生きるか** — 制度、文化、人間の発達、日常の仕事設計
3. **組織はどう知るか** — 認知、知識管理、学習、判断のアーキテクチャ

neural-organization/docs の設計射程を一文で要約すると、こうなる。

> **「組織はどう知るか」には非常に強い。「組織はどう生きるか」には部分的。「組織は何者か」にはまだ薄い。**

この非対称を、以下の7つの層に分解して詳細に評価する。

## 層別評価

### 第1層: 社会的存在論・外部正当性

**あるもの:**
- 「人間が目的と創造性を与え、AI が知能を担う」という新しい組織観
- 人間の参与形態の5類型定義
- Purpose の Boundary による法的・倫理的制約記述

**不足しているもの:**
- 組織は誰の利益をどこまで代表するのか
- 顧客や社会はガバナンスの外部者なのか内部者なのか
- AI 中心組織の説明責任は誰が負うのか
- 社会に対する正当化原理は何か
- どの外部主体とどう共存するのか

**評価:** 現文書は「どう違反しないか」は書けているが、「どう正当化されるか」「どの外部主体とどう共存するか」はまだ薄い。かなり上流の欠落である。

### 第2層: 憲法・権力・責任

**あるもの:**
- Purpose の Why / Where / How / Boundary
- Governance Gate と二重フィルタリング
- Trust Score による自律度制御
- 最終的な human override

**不足しているもの:**
- 複数の Governor が対立したときの決着原理
- Custodian の監査独立性の保証
- 不服申立てや差し戻しの手続き
- 失敗時の法的責任と組織責任の分配
- 共有記憶や学習成果の所有権

**評価:** いまあるのは「自律度の制御」の設計であり、「権力の憲法」の設計にはまだ届いていない。「AI をどう統治するか」はあるが、「その統治者たち自身をどう統治するか」は薄い。

### 第3層: 経済・分配

**あるもの:**
- 成果指標としての顧客維持率・NPS・コスト削減
- 価値判断のトレードオフ重み（例: 顧客満足 70% / 短期収益 30%）

**不足しているもの:**
- AI が代替した生産性の果実を誰が得るのか
- 賃金・報酬・評価・持分の再設計
- 人間と AI の混成組織におけるインセンティブ整合
- near-zero marginal intelligence の世界での企業境界の再定義
- 資本配分の原理

**評価:** 現文書から見えるのは「目標関数」（何を最適化するか）であり、「分配関数」（価値をどう生み、誰にどう配るか）はまだ設計されていない。

### 第4層: 社会・文化・人間関係

**あるもの:**
- Connector の概念定義（人間同士の信頼・共感・関係性を構築する役割）
- HITL における stakeholder intent の重視
- Creator / Connector の注意予算設計

**不足しているもの:**
- 信頼をどう醸成するか
- 組織文化をどう維持・更新するか
- 非公式ネットワークや組織政治をどう扱うか
- 衝突や感情のもつれをどう解くか
- 儀礼・物語・象徴は何が担うのか

**評価:** 社会性が重要であるという認識自体はあるが、設計は概念レベルにとどまっている。`interface-design.md` で具体的な運用粒度まで設計されているのは主に Governor / Sensemaker / Custodian であり、Creator / Connector の日常的な仕事設計（創造活動の支援、信頼構築や対人調整の再設計）は同じ粒度では展開されていない。

### 第5層: 人間発達・思考・成長

**あるもの:**
- Intent over Instruction による認知負荷低減
- Ambient Presence と注意コスト設計（ALERT / GOVERNANCE / INSIGHT / DECISION / THOUGHT ごとの推定注意コストと1日上限）
- Agency Preservation（override / manual mode / explanation on demand / learning visibility / gradual delegation）による deskilling 防止
- system augments human（proactive education / context provision / pattern surfacing / decision quality feedback）

**不足しているもの:**
- 専門性をどう育てるか
- AI 時代の熟達とは何か
- 新人はどう徒弟化されるか
- 判断力や構想力はどう鍛えるか
- キャリアラダーや昇進基準をどう変えるか
- 創造性・集中・ウェルビーイングをどう守るか

**評価:** いまあるのは「能力劣化を防ぐ仕組み」であり、「能力を伸ばす制度」まではまだ立っていない。人間の認知と主体性を守る発想はかなりあるが、人をどう強くするかの体系は欠けている。

### 第6層: 仕事・オペレーティングモデル

**あるもの:**
- 営業・採用・新製品ローンチなどの E2E フロー
- サブプロジェクト間連携
- 営業担当者の等級に応じた支援度の変化（ジュニアには詳細ノート、シニアには要点のみ）

**不足しているもの:**
- 個々の担当者が1日をどう働くか（lived work design）
- 深い思考の時間をどう守るか
- 会議をどう再設計するか
- 人間と AI の handoff をどう標準化するか
- 割り込みや通知をどう抑制するか
- マネージャーの役割は監督から何へ変わるのか
- 例外処理や manual fallback を日常業務としてどう組み込むか
- 人間同士の共同制作をどう最適化するか

**評価:** 業務プロセスを AI 主体でどう回すかには答えているが、個人の日常的な働き方の設計は薄い。`ax-company-design.md` にある役割別支援は、個人の思考体系や生産性体系というより、役割適応的な支援の断片にとどまる。

### 第7層: 認知・知識・学習

**強く設計されているもの:**
- 5層の認知パイプライン（Perception → Understanding → Reasoning → Execution → Reflection）
- Purpose / Governance / Memory / Orchestration の4横断要素
- Customer エンティティのような世界モデル
- Execution の品質保証
- Reflection と Execution Trace による学習ループ
- HITL における盲点抽出と質問パターン
- 長期記憶・作業記憶・評価記憶の分解と技術スタックの具体化

**評価:** ここが本リポジトリの最強領域である。組織がどう知覚し、理解し、推論し、実行し、記憶し、学習するかが、かなりの深さで設計されている。

## 総合結論

### 一文要約

neural-organization/docs は、**「AGI時代の組織知能 OS」**としてはかなりの完成度を持つが、**「AGI時代の人間組織論」**にはまだなっていない。

### 展開

知識と判断のアーキテクチャ（第7層）は深く設計されている。しかし、その組織知能の中で人間がどう働き、成長し、報われ、関係を築くかという制度・経済・社会・成長のアーキテクチャ（第1層〜第6層）は、部分的な着手に留まっている。

設計の重心は organizational cognition / knowledge architecture 側にある。これは human operating model が完成した文書群ではなく、まず organizational intelligence architecture を作った文書群である。

この非対称の構造を踏まえると、「各担当者の思考や業務の生産性が未設計」という直感的な違和感は妥当であるが、それは単独の欠落ではなく、より大きな上位欠落（組織を "社会的・制度的・発達的存在" として設計する視点の不足）の中位レイヤーに位置する症状として理解すべきである。

## 追加すべき設計領域の提案

現リポジトリの空白を埋めるために、以下の設計領域を `docs` に追加することを提案する。

### 1. Social Legitimacy Design（社会的正当性設計）

組織は誰の利益を代表し、社会に対してどう正当化されるのか。顧客・取引先・規制当局・社会全体との関係における説明責任の所在を定義する。

### 2. Constitutional Governance Design（権力の憲法設計）

複数 Governor の対立解消、Custodian の監査独立性、不服申立て手続き、失敗時の責任分配、学習成果の所有権など、統治者自身の統治原理を定義する。

### 3. Political Economy Design（分配・経済設計）

AI が生んだ生産性果実の分配、賃金・報酬・評価・持分の再設計、人間と AI の混成組織におけるインセンティブ整合を定義する。

### 4. Social & Cultural Design（社会・文化設計）

信頼醸成、文化の維持と更新、非公式ネットワーク、衝突解決、儀礼・物語・象徴の担い手を定義する。Creator / Connector の日常仕事設計を具体化する。

### 5. Human Development Design（人間発達設計）

専門性育成、AI 時代の熟達定義、徒弟化・新人育成、判断力・構想力の鍛え方、キャリアラダー・昇進基準の再設計、創造性・集中・ウェルビーイングの保護を定義する。

### 6. Lived Work Design（日常仕事設計）

個人の1日の働き方、深い思考時間の防衛、会議再設計、AI との handoff 標準化、通知・割り込み抑制、マネージャーの役割再定義、例外処理の組み込み、人間同士の共同制作の最適化を定義する。

### 7. Human Metrics Design（人間指標設計）

単純な工数削減ではなく、判断品質、学習速度、集中破壊の少なさ、創造性、関係資本など、AGI 時代に人間の価値を測る指標体系を定義する。
