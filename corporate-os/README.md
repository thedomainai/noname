# corporate-os README

## 目的

このディレクトリは、AI-native institution / OS に関する文書群を、**LLM が読みやすいフラット構成**で管理するためのルートである。

基本方針は次の通り。

- 本体文書は root に置く
- 役割はディレクトリ階層ではなく、**ファイル名のプレフィックス**で表現する
- ノイズになりやすいものだけを `context/` と `archive/` に分離する

この構造により、LLM も人間も、浅いパスのまま「何が正本で、何が詳細で、何が背景か」を判断しやすくなる。

## 読み順

### 1. まず全体仕様を読む

- `00-core-ai-native-institution-os-complete-spec.md`

これは canonical core spec であり、全体の正本である。

定義しているもの:
- 10レイヤー
- 13次元
- 5要素
- 主要因果接続
- 完成度監査

### 2. 次に詳細モジュールを読む

- `10-module-governance-human-participation.md`
- `11-module-information-ingress-state-and-observability.md`

前者は主に制度・人間参加・分配・文化・運用の詳細、後者は主に情報入口・状態・検索・可観測性の詳細を扱う。

### 3. 参照実例を読む

- `40-reference-organization-profile.md`
- `41-reference-organization-instantiation.md`
- `42-reference-organization-integrity-audit.md`

これは、core spec を最初の concrete instance に落とした参照実例群である。

### 4. 背景と理由づけを読む

- `20-rationale-agi-era-organization-os.md`

これは正本ではなく、理論的背景と広域構想を与える rationale document である。

### 5. 必要に応じて補遺を読む

- `30-appendix-neural-organization-design-scope-analysis.md`
- `31-appendix-agi-era-organization-os-v2-issues.md`
- `32-appendix-agi-era-organization-os-v3-structure.md`

これらは比較分析、論点ログ、構成メモであり、正本仕様ではない。

## ファイル設計

### Root に置くもの

Root には、本体文書だけを置く。

- `00-` : canonical core
- `10-19` : detailed modules
- `20-29` : rationale
- `30-39` : appendices
- `40-49` : reference instances and audits
- `README.md` : 人間向けガイド

この番号は、読む順と役割を兼ねている。

### `context/`

外部市場や基盤モデル戦略など、OS本体ではないが背景として参照する文書を置く。

このディレクトリの文書は:
- OS仕様の正本ではない
- 環境認識を更新するための参照資料である

### `archive/`

旧版、HTML書き出し、再構築前 source を置く。

このディレクトリの文書は:
- 原則として直接編集しない
- 現行仕様の正本として扱わない
- 歴史的参照や source extraction のために保持する

## Canonical relationships

関係は次の通り。

- `00-core-ai-native-institution-os-complete-spec.md`
  - 全体仕様の正本
- `10-module-governance-human-participation.md`
  - D1-D8 と D13平時部分の詳細正本
- `11-module-information-ingress-state-and-observability.md`
  - D9-D12 の詳細正本
- `20-rationale-agi-era-organization-os.md`
  - 理由づけと広域構想
- `30-*`
  - 補遺、比較分析、論点ログ
- `40-reference-organization-profile.md`
  - concrete instance の前提となる参照組織プロフィール
- `41-reference-organization-instantiation.md`
  - core spec を参照組織に具体化した最初の実例
- `42-reference-organization-integrity-audit.md`
  - concrete instance の整合性監査
- `context/*`
  - 外部環境文脈
- `archive/*`
  - 旧版と source archive

## 編集ルール

### 1. 全体構造を変えるとき

- `00-core-...` を先に更新する

### 2. 詳細運用を変えるとき

- 対応する `10-` 台の module を更新する

### 3. なぜその設計かを更新するとき

- `20-rationale-...` を更新する

### 4. 参照実例を更新するとき

- `40-42` を一組として扱う
- 前提を変えるなら `40-`
- 具体化を変えるなら `41-`
- 整合性判定を変えるなら `42-`

### 5. 旧 source を反映したいとき

- `archive/` の文書を直接現行仕様として復活させない
- 必要な内容だけを `00-` または `10-` 台に再記述する

## 旧ファイルからの対応

| 旧ファイル | 現在の位置づけ |
|---|---|
| `ai-native-institution-os-complete-spec.md` | `00-core-ai-native-institution-os-complete-spec.md` |
| `agi-era-organization-os.md` | `20-rationale-agi-era-organization-os.md` |
| `neural-organization-information-ingress-architecture-v2.md` | `archive/` の source archive |
| `neural-organization-information-ingress-architecture.md` | `archive/` の旧版 |
| `neural-organization-docs-design-scope-analysis.md` | `30-appendix-neural-organization-design-scope-analysis.md` |
| `agi-era-organization-os-v2-issues.md` | `31-appendix-agi-era-organization-os-v2-issues.md` |
| `agi-era-organization-os-v3-structure.md` | `32-appendix-agi-era-organization-os-v3-structure.md` |
| `foundation*` / `ai-market-layer-structure.md` | `context/` の外部文脈 |
| `.html` ファイル | `archive/` の書き出し |

## なぜこの構造が LLM-native か

この構造では、情報の種類ごとに深い階層を作らない。  
代わりに、

- **浅いパス**
- **強い命名**
- **明示的な正本関係**
- **1ファイル1責務**

を優先する。

LLM は、深いディレクトリ構造よりも、

- `00-core`
- `10-module`
- `20-rationale`
- `30-appendix`

のように、ファイル名だけで役割が推定できる構造の方が扱いやすい。

一方で、`context/` と `archive/` は検索ノイズを減らすために分けている。  
つまり、**本体はフラット、ノイズだけ分離** がこのディレクトリの設計原則である。

## 今後の拡張候補

必要に応じて、次のような module を追加してよい。

- `12-module-external-legitimacy-and-inter-os.md`
- `13-module-economic-allocation-and-benefit.md`
- `14-module-human-development-and-meaning.md`

ただし、module を増やす前に、既存 module の責務分離で足りないかを先に確認すること。
