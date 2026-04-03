# Longlist Radar Design Prompts

## Product Overview

**Longlist Radar** is a single-page M&A pipeline tracking application for managing potential acquisition targets (longlists) based on investment thesis themes. It provides real-time signal detection, status tracking, and company detail views to help dealmakers prioritize outreach.

**Target Users**: M&A professionals, corporate development teams
**Core Features**: Thesis-based filtering, signal detection, company profiles with ownership/sellability analysis, contact route tracking

## Design System Summary

**Colors** (CSS custom properties):
```css
--ink-1000: #000
--ink-900: #1a1a1a
--ink-800: #2d2d2d
--ink-700: #404040
--ink-600: #525252
--ink-500: #6b6b6b
--ink-400: #8a8a8a
--ink-300: #a3a3a3
--ink-200: #c4c4c4
--ink-100: #e0e0e0
--ink-50: #f0f0f0

--slate-600: #475569
--slate-500: #64748b
--slate-400: #94a3b8
--slate-300: #cbd5e1
--slate-200: #e2e8f0
--slate-100: #f1f5f9
--slate-50: #f8fafc

--paper-white: #fdfdfc
--paper-cream: #faf9f7
--paper-warm: #f5f4f0
--paper-kraft: #eeedea

--ink-blue: #2563eb
--ink-green: #16a34a
--ink-amber: #d97706
--ink-red: #dc2626

--wash-blue: #dbeafe
--wash-green: #dcfce7
--wash-amber: #fef3c7
--wash-red: #fee2e2
```

**Typography**:
- Font family: Instrument Sans (sans-serif)
- Monospace: JetBrains Mono
- Headings: 18px (header h1), 14-16px (section titles)
- Body: 13px (standard text), 12px (meta info), 11px (small labels)
- Font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

**Layout**:
- 3-column layout: 260px left sidebar | flexible main | 300px right sidebar
- Header: 53px height, sticky position
- Cards: rounded-lg (8px), 1px border, white background
- Spacing: 24px section gaps, 16px card gaps, 8-12px inline elements

**Design Language**:
- Paper Design System aesthetic (muted colors, soft borders, subtle shadows)
- Emphasis on data density and information hierarchy
- Signal-based UI with color-coded badges and timestamps

## Screen Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                          HEADER (fixed)                        │
│  Longlist Radar | [Search: ノンネーム照合] | Capacity | Sync  │
└────────────────────────────────────────────────────────────────┘
┌──────────────┬──────────────────────────────────┬──────────────┐
│ LEFT SIDEBAR │         MAIN CONTENT             │RIGHT SIDEBAR │
│              │                                  │              │
│ ┌──────────┐ │ ┌──────────────────────────────┐ │ ┌──────────┐│
│ │ Thesis   │ │ │  [Welcome Banner (dismissible)│ │ │ Suggested││
│ │ Filters  │ │ └──────────────────────────────┘ │ │ Action   ││
│ │ - All    │ │                                  │ └──────────┘│
│ │ - Full-  │ │ ┌──────────────────────────────┐ │ ┌──────────┐│
│ │   Suite  │ │ │  View Tabs:                  │ │ │ Latest   ││
│ │ - Vert.  │ │ │  [List] [Today's Changes]    │ │ │ Signals  ││
│ │   Entry  │ │ └──────────────────────────────┘ │ │ (7)      ││
│ │ - etc.   │ │                                  │ │          ││
│ └──────────┘ │ ┌──────────────────────────────┐ │ │ - Signal ││
│              │ │ LIST VIEW                    │ │ │   Items  ││
│ ┌──────────┐ │ │  Sort: Priority|Fit|Fresh   │ │ │ - (8 max)││
│ │ Status   │ │ │  Result: 13社                │ │ │          ││
│ │ Filters  │ │ ├──────────────────────────────┤ │ └──────────┘│
│ │ - All    │ │ │ ┌──────────────────────────┐ │ │            │
│ │ - Unrevi │ │ │ │ Company Card (3-col grid)│ │ │            │
│ │ - Resear │ │ │ │ - Thesis pills           │ │ │            │
│ │ - Outrea │ │ │ │ - Name + Fit badge       │ │ │            │
│ │ - Met    │ │ │ │ - Priority score (95)    │ │ │            │
│ │ - Hold   │ │ │ │ - Reason box             │ │ │            │
│ └──────────┘ │ │ │ - Signal tags            │ │ │            │
│              │ │ │ - Status badge           │ │ │            │
│ ┌──────────┐ │ │ └──────────────────────────┘ │ │            │
│ │ Summary  │ │ │ (9 cards shown)              │ │            │
│ │ - 13社   │ │ └──────────────────────────────┘ │            │
│ │ - High:9 │ │                                  │            │
│ │ - New:10 │ │ OR                               │            │
│ │ - Stale:2│ │                                  │            │
│ └──────────┘ │ ┌──────────────────────────────┐ │            │
│              │ │ DIGEST VIEW (Today's Changes)│ │            │
│              │ │ ┌──────────────────────────┐ │ │            │
│              │ │ │ Today (3件)              │ │ │            │
│              │ │ │ [HR] クロノスHR          │ │ │            │
│              │ │ │ ✓ Series B 15億円調達    │ │ │            │
│              │ │ │ [FO] ペイフロー          │ │ │            │
│              │ │ │ □ 創業者が統合志向公言   │ │ │            │
│              │ │ └──────────────────────────┘ │ │            │
│              │ │ ┌──────────────────────────┐ │ │            │
│              │ │ │ 昨日 (2件)               │ │ │            │
│              │ │ │ ...                      │ │ │            │
│              │ │ └──────────────────────────┘ │ │            │
│              │ └──────────────────────────────┘ │            │
└──────────────┴──────────────────────────────────┴──────────────┘

User clicks on company card → Opens modal overlay:

┌────────────────────────────────────────────────────────────────┐
│                   DETAIL PANEL (modal overlay)                 │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │ [×] Close                                                  │ │
│ │                                                            │ │
│ │ Company Name: クロノスHR                                   │ │
│ │ Description: 中堅企業向け勤怠管理SaaS...                   │ │
│ │ Since last check: 2件の変化                                │ │
│ │                                                            │ │
│ │ ┌──────────┬──────────┬──────────┐                        │ │
│ │ │Fit: 92/100│Priority:95│ARR:12億円│ (3-col stat grid)   │ │
│ │ └──────────┴──────────┴──────────┘                        │ │
│ │                                                            │ │
│ │ Why Now: [reason box in blue wash background]             │ │
│ │                                                            │ │
│ │ Ownership: 創業者45% / GB 25% / JAFCO 20%...              │ │
│ │ Sellability: 中 — Series B直後でファンドの...             │ │
│ │                                                            │ │
│ │ Change Signals: [NEW] Series B 15億円調達 ✓               │ │
│ │                 建設・物流で導入加速 (older signal)       │ │
│ │                                                            │ │
│ │ Contact Routes:                                            │ │
│ │ ┌────────────────────────────────────────────────────────┐│ │
│ │ │ [取引銀行] みずほ銀行A部長経由  [Pending]             ││ │
│ │ │ [仲介] MAVIS 別担当が接点あり    [Active]              ││ │
│ │ └────────────────────────────────────────────────────────┘│ │
│ │                                                            │ │
│ │ Timeline: 03/28 Series B, 03/10 新機能, 01/20 ARR 10億... │ │
│ │                                                            │ │
│ │ Memo: [textarea for internal notes]                       │ │
│ │                                                            │ │
│ │ [Status: 調査中 ▼] [+ルート追加] [レポート出力]          │ │
│ └────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## Screen-by-Screen Prompts

### 01. Main View (List Mode)

**Purpose**: Browse and filter longlisted companies by investment thesis and status
**From**: App entry point
**To**: Digest view (tab switch), Company detail modal (card click)

**Layout**: 3-column layout with fixed header
- **Header** (53px height, sticky): Logo "Longlist Radar", search bar (400px max-width), capacity indicator (3/5 live deals), last sync time, "テーマ作成" button
- **Left Sidebar** (260px): Thesis filters (4 themes + "All"), Status filters (6 statuses), Summary stats
- **Main Area**: Welcome banner (dismissible), view tabs (List/Digest), sort bar, company card grid (3 columns)
- **Right Sidebar** (300px): Suggested action box, Latest signals list (8 max)

**UI Elements Detail**:

**Header Components**:
- Logo + title: 18px bold ink-900
- Search bar: gray-200 border, ink-300 placeholder, focus → blue border + blue shadow
- Capacity indicator: slate-50 background, 48px progress bar (green/amber/red fill), mono font
- Last sync: 11px mono, ink-400
- Primary button: ink-900 background, white text, 6px radius

**Thesis Filters** (expandable theme cards):
- Active state: wash-blue background, ink-blue border, ink-blue text
- Inactive: white background, ink-100 border, ink-600 text
- Hover: slate-50 background, ink-200 border
- Count badge: 11px mono, ink-300 (or ink-blue when active)
- Dot indicator: 8px square, colored by thesis theme

**Theme Detail Panel** (opens below active thesis):
- Slate-50 background, slate-200 border, 6px radius
- Title: 13px semibold ink-900
- Description: 12px ink-600
- Metrics: 2-column grid (候補社数, 高フィット, 陳腐化, 打診中)

**Status Filters**:
- Active: wash-blue background, ink-blue text, 500 weight
- Inactive: transparent, ink-600 text
- Hover: slate-50 background
- Dot: 8px circle, colored by status (slate-400 for all, ink-blue for researching, etc.)
- Count: 12px mono, ink-300

**Welcome Banner**:
- Wash-blue background, blue-200 border (#bfdbfe), 8px radius
- Icon: 14px bold "i" in ink-blue
- Title: 14px semibold ink-900
- Actions: 12px buttons on white bg with blue-200 border, hover → wash-blue bg + ink-blue border
- Dismiss: 12px underlined ink-400, cursor pointer

**Company Cards**:
- White background, ink-100 border, 8px radius
- Hover: ink-300 border, box-shadow
- Stale cards (≥14 days old): opacity 0.65, dashed border
- Thesis pills: 10px text, paper-kraft background, ink-500 text, 8px radius
- Company name: 15px semibold ink-900
- Fit badge: 11px semibold, rounded-full
  - High: wash-green bg, ink-green text
  - Mid: wash-amber bg, ink-amber text
  - Low: wash-red bg, ink-red text
- Priority score: 20px bold mono, ink-900, right-aligned
- Reason box: 13px ink-700, slate-50 background, 4px radius
- Signal tags: 11px, wash-blue background (or wash-green if new), ink-blue/ink-green text, 10px radius
  - Trigger signals: 600 weight, uppercase 10px label prefix
- Status badge: 12px medium, ink-200 border, white bg, ink-600 text, 4px radius
- Freshness: 11px mono
  - Recent (≤3 days): ink-green
  - Stale (≥14 days): ink-red
  - Normal: ink-400

**Google Stitch Prompt**:
```
A sophisticated M&A pipeline tracking application with Paper Design System aesthetic. The interface uses a 3-column layout with muted, professional colors.

**Header (53px height, sticky, white background)**:
- Left: "Longlist Radar" logo (18px bold #1a1a1a) with "M&A Pipeline" subtitle (13px #8a8a8a)
- Center: Search bar (max-width 400px) with "/" icon, placeholder "ノンネーム照合: 業種・規模・地域で検索...", gray-200 border, focus → blue border + blue-50 shadow
- Right: Capacity indicator (slate-50 background, contains "ライブ案件" label, 48px×6px progress bar with amber fill at 60%, "3/5" in mono font), "sync 03-30 09:15" (11px mono gray-400), "テーマ作成" button (ink-900 bg, white text, rounded 6px)

**Left Sidebar (260px width, white background, border-right gray-100)**:

*Thesis Filters Section*:
- Heading: "投資仮説テーマ" (11px uppercase semibold #8a8a8a, letter-spacing 0.08em)
- Active filter "すべて": wash-blue background (#dbeafe), ink-blue border/text (#2563eb), 8px dot on left, count "13" on right (11px mono)
- 4 inactive thesis filters below:
  - "人事労務フルスイート化" with blue dot, count "3"
  - "業界特化HR展開" with green dot, count "4"
  - "バックオフィス統合基盤" with amber dot, count "3"
  - "タレマネ・育成強化" with violet dot, count "2"
  Each inactive filter: white bg, gray-100 border, hover → slate-50 bg

*Expanded Theme Detail* (below active thesis):
- Slate-50 background box with slate-200 border, 6px radius, 12px padding
- Title: "人事労務フルスイート化" (13px semibold #111827)
- Description: Multi-line explanation text (12px #525252)
- 2×2 metrics grid: "候補社数: 3", "高フィット: 2", "陳腐化: 0", "打診中: 1" (11px, bold values in mono font)

*Status Filters Section*:
- 6 status items with colored dots (8px circle):
  - "すべて" (gray-400 dot, active state)
  - "未確認" (slate-400 dot)
  - "調査中" (ink-blue dot)
  - "紹介打診中" (ink-amber dot)
  - "面談済" (ink-green dot)
  - "保留" (ink-300 dot)
  Each with count badge on right

*Summary Section*:
- Heading: "サマリー"
- Stats in 13px ink-600: "13 社をトラック中", "高フィット: 9", "今週の変化: 10" (ink-blue), "情報陳腐化: 2" (ink-red)

**Main Content Area (flexible width, padding 20px, background #f9fafb)**:

*Welcome Banner* (dismissible):
- Wash-blue background, blue-200 border, 8px radius, flex layout
- "i" icon (14px bold ink-blue)
- Body: "前回確認（3/23）から **10件** の変化があります" (14px semibold), explanation below (13px)
- Action buttons: "変化を確認する", "リストを見る" (white bg, blue-200 border, 12px text)
- Dismiss "×" on right

*View Tabs*:
- "リスト" tab (active: ink-900 text, 2px bottom border)
- "今週の変化" tab with blue badge "7"

*Sort Bar*:
- Label "並び替え:" (12px #8a8a8a)
- Buttons: "接触優先度" (active: ink-900 bg, white text), "戦略フィット", "情報鮮度", "変化あり"
- Right side: "13 社" count + "Export 上位10社" button

*Company Card Grid* (3 columns, 10px gap):
Each card is white with rounded-lg corners, gray-200/60 border, hover shadow-md:
- Top: Small gray pills "人事労務フルスイート化"
- Row: Company name "クロノスHR" (15px semibold), fit badge "高フィット" (wash-green bg, ink-green text, rounded-full pill), priority score "95" (20px bold mono) on right
- Meta row: "勤怠管理SaaS" | "ARR 12億円" | "Series B" | "2日前更新" (12px gray-500)
- Reason box: Gray-50 background with 13px text explaining strategic fit
- Signal tags row: "NEW: Series B 15億円調達" (wash-green, ink-green, semibold), "建設・物流で導入加速" (wash-blue, ink-blue)
- Bottom: Status badge "調査中" (white bg, ink-blue border/text)

Show 9 company cards total in 3×3 grid.

**Right Sidebar (300px width, white background, border-left gray-100)**:

*Suggested Action Box*:
- Paper-cream background, paper-kraft border, 8px radius
- Title: "おすすめアクション" (11px uppercase semibold amber-600)
- Text: Recommendation with bold company name and actionable insight (12px ink-700)

*Latest Signals Section*:
- Heading: "最新シグナル" with blue badge "7"
- 8 signal items (slate-50 bg, slate-200 border, 6px radius):
  Each shows: type label (10px uppercase, colored: HIRING/FUNDING/EXPANSION), company name (13px semibold), signal detail (12px ink-600), date (11px mono gray-300)
  Type colors: hiring → ink-green, funding → ink-blue, expansion → ink-amber

The overall aesthetic is clean, data-dense, and professional with Paper Design System's muted palette. Use #fdfdfc (paper-white) for cards, Instrument Sans font throughout.
```

---

### 02. Digest View (Today's Changes)

**Purpose**: Review new signals grouped by date since last check
**From**: View tab switch from List mode
**To**: List mode (tab switch), Company detail modal (signal click)

**Layout**: Same 3-column layout as List mode, but main area shows digest items instead of company cards

**UI Elements**:
- Top bar: Label "前回確認（3/23）以降の変化シグナル", "すべて確認済みにする" button (12px)
- Date groups: "今日" / "昨日" / "3/28（2日前）" format
  - Heading: 12px semibold uppercase ink-400, 0.05em letter-spacing, bottom border gray-100
- Digest items (each):
  - Type icon (32px square, rounded-lg, colored background with 2-letter code in bold mono)
    - HR (hiring): wash-green bg, ink-green text
    - FD (funding): wash-blue bg, ink-blue text
    - EX (expansion): wash-amber bg, ink-amber text
    - PR (product): #f3e8ff bg, #7c3aed text (purple)
    - PT (partnership): #e0f2fe bg, #0284c7 text (cyan)
    - CA (capital): wash-red bg, ink-red text
    - FO (founder): purple
    - MK (market): amber
  - Body: Company name (14px semibold ink-900), signal text (13px ink-700), meta row (11px ink-400)
  - Check button: 24px square, gray-200 border, hover → ink-blue border + wash-blue bg, checked → ink-blue bg + white checkmark

**Google Stitch Prompt**:
```
A digest view showing chronological change signals for M&A pipeline companies, using the same 3-column layout as the list view. The left and right sidebars remain identical to the previous screen. The main content area shows a different view:

**Main Content Area (Digest View active tab)**:

*Top Bar*:
- Left: "前回確認（3/23）以降の変化シグナル" (13px ink-600)
- Right: "すべて確認済みにする" button (12px, gray-200 border, rounded-lg)

*Date Groups*:

**Today Group**:
- Heading: "今日" (12px semibold uppercase ink-400, letter-spacing 0.05em, bottom border gray-100)
- 3 digest items:

Item 1:
- Type icon: 32px rounded-lg square, wash-green background, "HR" text (11px bold mono ink-green)
- Company name: "クロノスHR" (14px semibold ink-900)
- Signal: "Series B 15億円調達完了 — Post 60億円" (13px ink-700)
- Meta: "勤怠管理SaaS" | fit badge "高フィット" (10px on wash-green) (11px ink-400)
- Check button: 24px square, gray-200 border, empty, hover shows blue border

Item 2:
- Type icon: wash-blue background, "FD" text (ink-blue)
- Company: "ペイフロー"
- Signal: "創業者がプラットフォーム統合志向を公言"
- Check button: unchecked

Item 3:
- Type icon: wash-amber background, "EX" text (ink-amber)
- Company: "サイトコネクト"
- Signal: "ゼネコン上位10社の7社が導入 — 市場支配的地位"
- Check button: unchecked

**Yesterday Group**:
- Heading: "昨日"
- 2 digest items similar format

**03/28 Group**:
- Heading: "03/28（2日前）"
- 2 digest items

Each digest item is a white card with rounded-lg corners, gray-200 border, 12px padding, 6px vertical gap between items. Items have cursor pointer and hover → gray-300 border + shadow-sm.

Some items show checked state: blue background checkbox with white checkmark, "Done" text inside.

Background is #f9fafb (light gray), cards are white.
```

---

### 03. Company Detail Modal

**Purpose**: View comprehensive company information and track contact routes
**From**: Company card click (List view) or Digest item click (Digest view)
**To**: Close → returns to previous view

**Layout**: Centered modal overlay on semi-transparent backdrop
- Modal: 760px max-width, white background, rounded-xl (12px), 28-32px padding, shadow-xl
- Close button: top-right, 28px square, slate-100 bg, hover → slate-200

**UI Elements**:
- **Header Section**:
  - Company name: 22px bold ink-900
  - Description: 14px ink-600, line-height 1.5
  - "Since last check" badge: 12px ink-blue text on wash-blue bg, 4px radius

- **3-Column Stat Grid**:
  - 3 stat boxes: slate-50 bg, 6px radius, 12px padding
  - Label: 11px uppercase semibold ink-400, 0.05em letter-spacing
  - Value: 16px semibold ink-900, mono font
  - Stats: "戦略フィット: 92/100", "接触優先度: 95/100", "売上規模: ARR 12億円"

- **"Why Now" Reason Box**:
  - Wash-blue background, 6px radius
  - 14px ink-800 text, line-height 1.5

- **Ownership & Sellability** (2-column grid):
  - Each: slate-50 bg, 6px radius
  - Label: 13px semibold ink-700
  - Content: 13px ink-700, line-height 1.6

- **Integration Scenario**:
  - Wash-blue background, 6px radius
  - 13px ink-700 text

- **Change Signals**:
  - Pills similar to company cards
  - New signals: no special background treatment, just badge
  - Old signals: slate-100 bg, ink-500 text
  - Trigger labels: 10px uppercase semibold prefix

- **Contact Routes**:
  - List of route items: slate-50 bg, 6px radius
  - Type badge: 11px semibold, paper-kraft bg, ink-600 text, 4px radius, min-width 72px
  - Route text: 13px ink-700, flex-1
  - Status badge: 11px medium, rounded-full
    - Pending: wash-amber bg, ink-amber text
    - Active: wash-blue bg, ink-blue text
    - Done: wash-green bg, ink-green text

- **Timeline**:
  - Vertical list with date + text
  - Date: 12px mono ink-400, 60px width
  - Text: 13px ink-700

- **Memo**:
  - Textarea: full width, 60px min-height, gray-200 border, 6px radius, 12px padding
  - Placeholder: ink-300

- **Actions** (bottom bar, border-top ink-100):
  - Status select dropdown: 13px medium, gray-200 border, white bg, 6px radius
  - "+ ルート追加" button: gray border, 6px radius
  - "レポート出力" button: gray border, 6px radius

**Google Stitch Prompt**:
```
A detailed company profile modal overlay for an M&A pipeline application, displayed as a centered white panel (760px max-width, rounded-xl 12px, shadow-2xl) on a semi-transparent dark backdrop (rgba(0,0,0,0.3)).

**Modal Header**:
- Close button: top-right corner, 28px square, slate-100 background, "×" symbol (16px ink-500), hover → slate-200
- Company name: "クロノスHR" (22px bold #1a1a1a)
- Description: "中堅企業向け勤怠管理SaaS。独自の勤務パターン学習で、シフト最適化と労務コンプライアンスを自動化。建設・物流・小売の3業界に強み。" (14px #525252, line-height 1.5)
- Since badge: "前回確認以降の変化: 2件" (12px white text on #2563eb background, 4px radius, inline-block)

**3-Column Stat Grid** (10px gap):
- Stat 1: slate-50 background, 12px padding, rounded 6px
  - Label: "戦略フィット" (11px uppercase semibold #8a8a8a)
  - Value: "92 / 100" (16px semibold mono #1a1a1a)
- Stat 2: "接触優先度" → "95 / 100"
- Stat 3: "売上規模" → "ARR 12億円"

**Section: "なぜ今この会社を追うべきか"** (13px semibold #404040):
- Blue wash background box (#dbeafe, 6px radius, padding 12-16px):
  "勤怠管理で中堅企業シェア急拡大中。SmartHRの勤怠モジュールを買収で一気に補完できる最有力候補" (14px #2d2d2d)

**2-Column Grid**:
- Left: "株主構成" heading (13px semibold #404040)
  - Slate-50 box: "創業者45% / GB 25% / JAFCO 20% / その他10%" (13px #404040)
- Right: "売却可能性" heading
  - Slate-50 box: "中 — Series B直後でファンドの出口圧力は低い。ただし創業者は将来的なIPO/M&Aに柔軟な姿勢" (13px #404040)

**Section: "統合シナリオ"**:
- Wash-blue box: "勤怠データ×SmartHRの人事DBを統合。給与計算への自動連携で人事労務フルスイートが完成" (13px #404040)

**Section: "変化シグナル"**:
- Pill badges horizontal row:
  - Green pill (wash-green bg, ink-green text): "NEW: Series B 15億円調達完了 — Post 60億円" with "資金調達" prefix (10px uppercase semibold)
  - Gray pill (slate-100 bg, ink-500 text): "建設・物流・小売の3業界で導入加速" (older signal)

**Section: "接触ルート"**:
- Route item 1 (slate-50 bg, 6px radius, flex row, 8-12px padding):
  - Type badge: "取引銀行" (11px semibold, paper-kraft bg #eeedea, ink-600 text, 4px radius, 72px min-width, center-aligned)
  - Text: "みずほ銀行 — A部長経由で接触可能性あり" (13px ink-700)
  - Status: "未着手" (amber pill, wash-amber bg, ink-amber text, rounded-full)
- Route item 2:
  - Type: "仲介"
  - Text: "MAVIS — 別担当が同社と接点あり"
  - Status: "進行中" (blue pill, wash-blue bg, ink-blue text)

**Section: "タイムライン"**:
- Timeline items (vertical list, 8px gap):
  - Row 1: "03/28" (12px mono #8a8a8a, 60px width) | "Series B 15億円調達（グローバルブレイン、JAFCO）" (13px #404040)
  - Row 2: "03/10" | "建設業界向け新機能リリース"
  - Row 3: "01/20" | "ARR 10億円突破"

**Section: "メモ"**:
- Textarea (full width, 60px min-height, gray-200 border, 6px radius, 8-12px padding, 13px font, placeholder "社内メモを記録..." in ink-300 color)

**Actions Bar** (top border ink-100, padding-top 16px, flex row, 8px gap):
- Status select: "調査中 ▼" (gray-200 border, white bg, 6px radius, 6-10px padding)
- "+ ルート追加" button (gray border, 6px radius)
- "レポート出力" button (gray border, 6px radius)

Use Paper Design System colors: #fdfdfc (white), #f8fafc (slate-50), #dbeafe (wash-blue), Instrument Sans font.
```

---

## Notes on Design Consistency

1. **Signal Type Icons**: Always use 32px square in digest, 2-letter codes in bold mono font
2. **Badge Pills**: Use `rounded-full` for all status/category badges, `rounded-lg` (8px) for cards
3. **Hover States**: Cards use border color change + shadow-md, buttons use background color shift
4. **Border Opacity**: Main borders use `gray-200/60` semi-transparent, sidebar borders use solid `gray-100`
5. **Spacing Rhythm**: 4px (tight), 8px (inline), 12px (card padding), 16px (card gaps), 24px (section gaps)
6. **Color-Coded Signals**: Funding (blue), Hiring (green), Expansion (amber), Capital (red), Product (purple), Founder (purple), Market (amber)
7. **Freshness Indicators**: Recent ≤3 days (green), Normal 4-13 days (gray), Stale ≥14 days (red + dashed border)
8. **Mono Font Usage**: Counts, timestamps, scores, dates always use JetBrains Mono
9. **Modal Backdrop**: Always `rgba(0,0,0,0.3)` with centered modal, click backdrop to close
10. **Uppercase Labels**: Section headings and small labels use 11px uppercase with 0.05-0.08em letter-spacing

---

*End of Longlist Radar Design Prompts*
