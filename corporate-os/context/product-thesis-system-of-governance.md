# Product Thesis: System of Governance — AI時代の企業基幹システム

## 位置づけ

本ドキュメントは、`corporate-os` の設計資産からプロダクトを導出するための思考過程と仮説を記録する。
正本ではなく、プロダクト設計の出発点となる思考ログである。

## 1. 技術革命の原理構造

### 1.1 共通パターン

あらゆる技術革命は同じ3段階を踏む。

1. あるコストが劇的に下がる（原理的変化）
2. そのコスト低下により、以前は不可能だった行動が可能になる（行動の変化）
3. その行動の変化に適応した組織・社会構造が生まれ、旧構造を置き換える（制度の変化）

### 1.2 学術的基盤

- **Bresnahan & Trajtenberg (1995)**: General Purpose Technologies (GPT) 理論。GPTの3条件は浸透性、技術的改善の内在的可能性、イノベーションの補完性。GPTの経済的リターンは下流セクターの補完的イノベーションとの相互作用から生まれる。
- **Paul David (1990)**: "The Dynamo and the Computer"。電力の生産性効果が実現するまで40年かかった理由は技術ではなく組織の問題。経営者は最初、蒸気エンジンをモーターに置き換えただけで工場構造を変えなかった。
- **Brynjolfsson, Rock, Syverson (2021)**: "Productivity J-Curve"。GPTは重大な補完的無形投資（プロセス再設計、労働力再訓練、組織再構築）を必要とし、これが初期の生産性停滞と後の急成長を説明する。
- **Chandler (1977)**: "The Visible Hand"。経済活動の量がある閾値を超えると市場メカニズム（見えざる手）より管理的調整（見える手）が効率的になり、専門的経営管理者という「新しい経済的種」が生まれた。
- **Coase (1937)**: "The Nature of the Firm"。企業は取引コストを最小化するために存在する。技術変化が取引コストを変えると、企業の境界が変わる。

### 1.3 各革命の構造

| 革命 | 下がったコスト | 補完投資の核心 | 生まれた基幹システム |
|---|---|---|---|
| 蒸気機関 | 物理的仕事（動力） | 工場制度、標準化 | 複式簿記、原価計算 |
| 電力 | エネルギー伝送・分割 | 工場レイアウト再設計、労働者権限委譲 | 機能別組織、管理会計 |
| コンピュータ | 計算・記録 | ERP導入、業務プロセス標準化 | ERP (SAP, 1972) |
| インターネット | 情報流通 | 顧客情報統合、サプライチェーン統合 | CRM (Salesforce, 1999) |
| クラウド | インフラ所有 | SaaS化、開発と運用の統合 | DevOps/CI-CD |
| モバイル | コンピュータアクセス | リアルタイムマッチング、常時接続 | モバイルアプリ、モバイル決済 |

### 1.4 4つの共通原理パターン

**パターン1**: GPTの生産性効果は、補完的な無形投資なしには実現しない（Brynjolfsson 2021, David 1990）。

**パターン2**: 補完投資の中核は常に「組織の再設計」である。技術導入から組織適応まで20-40年かかる。

**パターン3**: 各革命で「基幹システム」が生まれるのは、補完投資を制度化・標準化するため。基幹システムは「新技術そのもの」ではなく「新技術に適応した組織運営の仕組みをソフトウェアに固定化したもの」。

**パターン4**: 企業の境界と階層構造は取引コストの関数であり（Coase 1937）、各技術革命は異なる種類の取引コストを変え、企業の形を変える。

## 2. AI革命の原理分析

### 2.1 下がるコスト

AIが下げるのは「認知労働」のコスト。ただし精密には「調整の認知コスト」——情報の集約、状況把握、定型的判断、情報ルーティング——が下がる。

認知労働の分解:

- パターン認識・言語処理 → AIが今すでに代替できる
- 定型的判断・情報ルーティング → AIが今すでに代替できる
- 例外的判断・不確実性下の意思決定 → AIが提案可能、人間が最終判断
- 意味付与・目的設定・倫理的判断 → 当面は人間の領域
- 関係構築・信頼・交渉 → 身体性に依存、AIには限界

企業の管理コストの大部分は上2つが占めている。中間管理職の中核機能は情報ルーティングであり、それこそがAIが最も直接的に代替する能力。

### 2.2 過去のGPTとの質的差異

過去のGPTは物理的能力か計算能力を代替した。人間の判断・調整・管理能力は代替しなかった。結果として、技術の導入は常に「人間の管理能力」を補完し、Chandlerの「見える手」を強化した。

AIは認知能力そのものを代替する。「見える手」が代替の対象になる。ただし正確には「見える手の消滅」ではなく「見える手の媒体の交替」——管理的調整は依然として必要だが、実行主体が人間の管理者からAIシステムに変わる。

Davidの電力の例との対応:

- 代替されたもの（電力: シャフト・ベルト・プーリー → AI: 情報ルーティングのインフラ層）
- 補完されたもの（電力: 個々の労働者の自律性 → AI: エッジにいる人間の判断力）

### 2.3 Coaseの理論での分析

AIは管理コスト（企業内調整のコスト）と取引コスト（市場調整のコスト）を同時に下げるが、管理コストの低下幅の方が大きい。信頼・長期関係・不完全契約の問題は市場側に残る。したがって企業は存続し、むしろ最適規模が拡大する可能性がある。DAO/分散的未来には賭けない。

### 2.4 AIの補完投資

パターン3に従えば、AIを活かすための組織再設計が補完投資。過去のGPTでは管理構造が温存されたまま管理の対象が入れ替わったが、AIは管理構造そのものを代替する。したがって補完投資の核心は:

- 人間とAIの間の権限配分
- AIの判断の監視・停止・修正メカニズム
- AIが管理を代替した後の人間の権利・意味・成長
- 判断の正当性と追跡可能性
- AI能力変化に応じた動的更新

これは corporate-os の13次元がすでに体系化している内容そのもの。

## 3. プロダクトの位置づけ

### 3.1 新しいカテゴリ: System of Governance

企業システムの歴史は3つの波:

- **System of Record（1970s〜）**: 起きたことを記録する。ERP、会計。
- **System of Engagement（2000s〜）**: インタラクションを促進する。CRM、Slack。
- **System of Governance（2020s〜）**: AIと人間の間の判断の権限・正当性・追跡を統治する。**まだ存在しない。**

ERPが「取引の文法」を標準化したように、System of Governanceは「判断の文法」を標準化する。13次元×5要素がその文法。

### 3.2 ERPとの比較と差異

類似点: 抽象レイヤー（13次元×5要素）は標準化可能であり、具体的な値は企業ごとに異なる。SAPが導入にAccentureを必要としたように、このシステムも設計コンサルティングを必要とする。

差異: ERPは「過去の記録」（System of Record）を扱うが、このシステムは「未来の判断」（System of Governance）を扱う。「正しい記録」ではなく「正当な判断」が価値の源泉。

### 3.3 Governance-first の戦略

World Model (Intelligence) ではなく Governance から始める理由:

1. **痛みの緊急度**: 今すべての企業が「AIに何をどこまで任せていいかわからない」と感じている。World Modelの必要性はAIが深く浸透した後に感じる痛み。
2. **データ獲得の順序**: Governanceを動かすとDecision Ledgerが蓄積される。これがWorld Modelの最も価値あるデータソース。Governanceが先にあればIntelligenceのデータが自然に蓄積される。
3. **防御可能性**: World ModelはSnowflake/Databricks等と競合する赤い海。Governanceは「判断の文法」という新カテゴリで、corporate-osの知的資産が直接的な競争優位になる。

ただし最小限のWorld Modelは最初から内部コンポーネントとして持つ。外からは「判断の統治システム」に見え、内部では「組織の世界モデル」が動く。

## 4. プロダクトとコンサルティングの分担

### 4.1 ソフトウェアが「動かす」次元

- D4 Decision Rights & Accountability: Decision Ledger, Authority Matrix
- D8 Operating Model & Role Contracts: Loop管理, Handoff Contract
- D9 World Model, State & Memory: 6面構造のデータ管理
- D10 Deliberation, Planning & Epistemics: Proposal生成, Option比較
- D11 Actuation Surface: Commit Path, Rollback
- D12 Safety, Failure, Adversary & Observability: Logging, Tracing, Anomaly Detection

### 4.2 ソフトウェアが「保持する」次元

- D1 Objective Function: Purpose Statement, Objective Stack
- D2 Legitimacy & Boundary: Boundary Definition, Disclosure Level
- D3 Membership & Participation: Membership Registry, Rights Ledger
- D5 Political Economy & Incentive Compatibility: Benefit Floor, Budget Rules
- D13 Meta-Governance & Evolution: Hard-core / Soft-shell区分, Policy Update Pipeline

### 4.3 ソフトウェアの外にある（ただし計測はできる）次元

- D6 Social Order, Culture & Trust: Trust Index, Conflict Resolution Timeを計測
- D7 Human Development, Agency & Meaning: Deskilling Risk Index, Deep-work Hoursを計測

設計支援はコンサルティング（destination / transition / wedge）が担う。

### 4.4 ビジネスモデル

SAPとAccentureの関係と同構造:

- ソフトウェア: wedge module subscription + managed governance service
- コンサルティング: strategic design retainer + transformation program fee

ソフトウェアの利用から学んだ知見がコンサルティングの質を上げ、コンサルティングの経験がソフトウェアの設計を改善するフライホイール。

## 5. 初期のwedge

### 5.1 購買者

初期: CEO/COO直下のtransformation office、CIO/CDO/CTO
日本企業では経営企画部長が実質的な購買者になりうる。

### 5.2 売り方

「管理職を置き換える」とは言わない。「情報ルーティングを自動化し、すべての人がコンテキストを持って自律的に判断できるようにする」と言う。電力が各労働者に自分専用のモーターを与えたのと同じ構造的解放。

### 5.3 wedge moduleの候補

最も刺さるのは Decision Ledger + Autonomy Mode の組み合わせ。

- すべての重要判断を記録（authority basis, accountable owner, affected parties, appeal path, provenance）
- Composite Riskを8次元で計算し、Autonomy Mode (A0-A5) を自動判定
- AIエージェントのTrust Scoreをリアルタイム算出・更新
- 判断の追跡可能性と rollback path の保証

これだけで「AIにどこまで任せていいか」の実務的回答になる。

## 6. Blockとの比較

BlockはAI時代の組織設計の具体実装例。4層構造（Capabilities / World Model / Intelligence Layer / Interfaces）+ 3ロール（IC / DRI / Player-Coach）。

corporate-osが上回る点:

- 設計次元の網羅性: Blockが欠落しているD2（正当性）、D3（権利）、D5（政治経済）、D6（文化・信頼）、D7（人間の発達・意味）をカバー
- 検証可能性: 各次元にInvariant, Exception, Metricを持ち、因果チェーンを検証
- 安全性・可観測性: D12のprovenance要件、traceability、kill switchの明示的設計
- メタガバナンス: D13のhard-core / soft-shell区分、改定権の分権設計

Blockの設計をcorporate-osの13次元で監査すると、D1とD8-D11はカバーされているが、D2, D3, D5, D6, D7は深刻な設計空白として検出される。

## 7. 歴史的位置づけ

SAPが「コンピュータ革命の補完投資を制度化した基幹システム」であったように、
Salesforceが「インターネット革命の補完投資を制度化した基幹システム」であったように、

**このプロダクトは「AI革命の補完投資を制度化する基幹システム」になる。**

Davidのパターンに従えば、今は「電気ダイナモを蒸気エンジンの場所に入れただけ」の段階。多くの企業がAIを既存の業務に挿入しているが、組織構造は変えていない。やがて組織を根本的に再設計した企業が圧倒的な生産性優位を獲得する。

その再設計を可能にするソフトウェアが、AI時代の基幹システムである。

## 8. 次のステップ

- [ ] wedge module（Decision Ledger + Autonomy Mode）の具体仕様設計
- [ ] 参照組織を使った concrete instance での検証
- [ ] 最小プロダクトのアーキテクチャ設計
- [ ] 初期顧客候補の特定
- [ ] 名称とカテゴリの確定
