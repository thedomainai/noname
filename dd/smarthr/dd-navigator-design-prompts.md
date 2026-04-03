# DD Navigator Design Prompts

## Product Overview

**DD Navigator** is a web-based M&A due diligence management application built with Next.js 16 App Router. It helps investment teams manage the entire M&A pipeline from longlist screening to deal closing.

**Target Users**: M&A professionals, corporate development teams, PE/VC investors
**Core Features**: Deal management (9 phases), Q&A tracking, document repository, checklists, findings, longlist management

## Design System Summary

**Colors** (Tailwind CSS palette):
- Primary: `#4f46e5` (indigo-600)
- Success: `#059669` (emerald-600)
- Warning: `#d97706` (amber-600)
- Info: `#2563eb` (blue-600)
- Accent: `#7c3aed` (violet-600)
- Gray scale: `#f9fafb` (50) to `#111827` (900)
- Border: `rgba(229, 231, 235, 0.6)` (gray-200/60)

**Typography**:
- Headings: 24px/32px (text-2xl), bold, gray-900
- Body: 14px (text-sm), gray-500
- Meta: 12px (text-xs), gray-400

**Components**:
- Cards: white background, rounded-xl (12px), 1px border gray-200/60, hover shadow-md
- Buttons: indigo-600 background, white text, rounded-lg (8px), hover indigo-700
- Icons: 24px × 24px, stroke-width 1.75

**Layout**:
- Header: fixed, white background, 64px height
- Sidebar: 260px width, white background, border-right gray-200
- Main content: max-width 1280px, padding 32px

## Screen Flow Diagram

```
┌─────────────┐
│   Login     │ (unauthenticated)
└──────┬──────┘
       │
       v
┌─────────────────────────────────────────────────────────────┐
│                        Dashboard                            │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐│
│  │ Active Deals│ Completed   │ Companies   │ Unanswered  ││
│  │             │ Deals       │ (Longlist)  │ Q&A         ││
│  └─────────────┴─────────────┴─────────────┴─────────────┘│
│  ┌───────────────────────────────────────────────────────┐│
│  │              Pipeline View (5 columns)                ││
│  └───────────────────────────────────────────────────────┘│
│  ┌─────────────────────────┬───────────────────────────┐ │
│  │   Recent Deals          │  Upcoming Closings        │ │
│  └─────────────────────────┴───────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
       │
       ├───────────────────────────────────────────────┐
       v                                               v
┌─────────────┐                                 ┌─────────────┐
│ Deals List  │                                 │ Longlist    │
└──────┬──────┘                                 └──────┬──────┘
       │                                               │
       v                                               v
┌─────────────┐                                 ┌─────────────┐
│ New Deal    │                                 │ CSV Import  │
└─────────────┘                                 └─────────────┘
       │
       v
┌──────────────────────────────────────────────────────────────┐
│                    Deal Detail                               │
│  ┌─────┬─────┬──────────┬──────────┬──────────┬──────────┐  │
│  │基本 │Q&A  │ Findings │Documents │Checklist │          │  │
│  └─────┴─────┴──────────┴──────────┴──────────┴──────────┘  │
│  ┌────────────────────────────────┬─────────────────────┐   │
│  │ Main Content (2/3 width)       │ Sidebar (1/3 width) │   │
│  │  - Tab-specific views          │  - Deal Metrics     │   │
│  │  - Q&A list / Findings / etc.  │  - Phase Timeline   │   │
│  └────────────────────────────────┴─────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
       │
       └───────────────────────────────┐
                                       v
                                ┌─────────────┐
                                │  Settings   │
                                │  ├─ Team    │
                                │  └─Templates│
                                └─────────────┘
```

---

## Screen-by-Screen Prompts

### 01. Login Page

**Route**: `/login`
**Purpose**: Email-based Magic Link authentication
**From**: Public access
**To**: Dashboard (after email verification)

**UI Elements**:
- Centered white card (400px width) on light gray background (#f9fafb)
- Logo or app name at top
- Email input field (full width, 44px height)
- "Send Magic Link" button (indigo-600, full width, 44px height)
- Helper text below: "We'll send you a link to sign in"

**Google Stitch Prompt**:
```
A clean, minimalist login screen for a professional M&A due diligence web application. The layout features a centered white card (400px width, rounded corners 12px, subtle shadow) on a light gray background (#f9fafb). At the top of the card, display "DD Navigator" in bold dark gray text (24px). Below, show a single email input field with a light border, placeholder text "your.email@company.com", 44px height. Below the input, place a full-width button with indigo-600 background, white text "Send Magic Link", rounded corners 8px, 44px height. At the bottom of the card, include small gray helper text "We'll send you a link to sign in". The overall style should be clean, corporate, and trustworthy, similar to modern SaaS applications.
```

---

### 02. Dashboard

**Route**: `/`
**Purpose**: High-level pipeline overview and recent activity
**From**: Login, Header navigation
**To**: Deals list, Deal detail, Longlist

**UI Elements**:
- Page title "ダッシュボード" (24px bold) + subtitle (14px gray-500)
- **SummaryCards**: 4 cards in grid (1 column mobile, 2 tablet, 4 desktop)
  - Card 1: Active Deals (blue icon background #eff6ff, briefcase icon)
  - Card 2: Completed Deals (emerald icon background #d1fae5, checkmark icon)
  - Card 3: Longlist Companies (violet icon background #f5f3ff, building icon)
  - Card 4: Unanswered Q&A (amber icon background #fef3c7, question mark icon)
  - Each card: white bg, rounded-xl, 1px gray-200/60 border, icon (24px in 40px circle), value (32px bold), label (14px gray-500), change badge (+2 今月, emerald-50 bg)
- **PipelineView**: 5-column kanban board showing deals by phase
- **Recent Deals**: Left column, list of 5 recent deal cards
- **Upcoming Closings**: Right column, list of deals with closing dates < 90 days

**Google Stitch Prompt**:
```
A modern dashboard view for an M&A pipeline management application. At the top, display 4 summary cards in a horizontal grid. Each card is white with rounded corners (12px), subtle border (gray-200/60), and contains: a circular icon area (40px) with colored background (blue/emerald/violet/amber), a large number (32px bold dark gray), a label below (14px gray text), and a small badge in the top-right showing "+2 今月" on emerald-50 background. The 4 cards show: (1) Active Deals with briefcase icon on blue-50 background, (2) Completed Deals with checkmark icon on emerald-50, (3) Longlist Companies with building icon on violet-50, (4) Unanswered Q&A with question mark icon on amber-50.

Below the summary cards, show a 5-column pipeline view with columns labeled "Longlist", "LOI/NDA", "Due Diligence", "Final Negotiation", "Closing". Each column contains 2-3 mini deal cards (white, rounded, with company initial in colored circle and deal name).

At the bottom, display two side-by-side sections: "Recent Deals" (left) and "Upcoming Closings" (right). Each section has a heading and 3-4 compact deal cards showing company name, phase badge, and days until closing. The overall color scheme uses indigo-600 as primary, with emerald, amber, and violet accents. Background is light gray (#f9fafb), cards are white with subtle shadows on hover.
```

---

### 03. Deals List

**Route**: `/deals`
**Purpose**: Browse and filter all M&A deals
**From**: Dashboard, Header navigation
**To**: Deal detail, New deal form

**UI Elements**:
- Header: "案件管理" title + "新規案件作成" button (indigo-600)
- Filter tabs: All / Phase filters (clickable pills)
- Deal cards grid: 3 columns (1 mobile, 2 tablet, 3 desktop)
  - Each card: white bg, rounded-xl, company initial in indigo-50 circle (40px), deal name (14px bold), target company (12px gray), phase badge (top-right), description (12px, 2 lines max), industry tag, days until closing
- Hover state: shadow-md, border-gray-300/60

**Google Stitch Prompt**:
```
A deal list view for an M&A pipeline application, showing a grid of deal cards. At the top, display a heading "案件管理" (24px bold) with a "新規案件作成" button on the right (indigo-600 background, white text, with a "+" icon). Below, show 9 deal cards arranged in a 3-column grid (responsive: 1 column mobile, 2 tablet, 3 desktop).

Each deal card is a white rectangle with rounded corners (12px), subtle gray-200/60 border, and contains: (1) A 40px circular avatar on indigo-50 background with company initial "A" in indigo-600, (2) Deal name "アクメ社買収案件" (14px bold dark gray) next to avatar, (3) Target company name "株式会社アクメ" (12px gray-500) below deal name, (4) Phase badge in top-right corner with pill shape (rounded-full) showing phase like "LOI/NDA" on blue-50 background with blue-700 text, (5) A 2-line description in 12px gray-500 text, (6) At bottom: an industry tag "IT・ソフトウェア" with tag icon and "あと45日" in small gray text.

The layout should feel spacious with 16px gap between cards. On hover, cards should have a subtle shadow and darker border. Background is light gray (#f9fafb). Use indigo-600 as primary color for buttons and avatars.
```

---

### 04. New Deal Form

**Route**: `/deals/new`
**Purpose**: Create a new M&A deal
**From**: Deals list "新規案件作成" button
**To**: Deal detail (after creation)

**UI Elements**:
- Centered form card (max-width 640px)
- Page title "新規案件作成"
- Form fields (vertical stack):
  - Deal name (text input, required)
  - Target company (text input, optional)
  - Description (textarea, 3 rows)
  - Industry (select dropdown with common industries)
  - Phase (select dropdown: 7 phases from Longlist to Closing)
  - Expected deal value (number input with ¥ prefix)
  - Expected closing date (date picker)
- Two buttons at bottom: "キャンセル" (gray), "作成" (indigo-600)

**Google Stitch Prompt**:
```
A centered form view for creating a new M&A deal, displayed as a white card (max-width 640px, rounded-xl, shadow-sm) on light gray background. At the top, show heading "新規案件作成" (24px bold). The form contains 7 vertically stacked fields:

1. "案件名" label with required asterisk, text input below (full width, 44px height, gray-200 border, rounded-lg)
2. "対象企業名" label (optional), text input
3. "概要" label, textarea input (3 rows, gray-200 border)
4. "業界" label, select dropdown showing "IT・ソフトウェア ▼"
5. "フェーズ" label, select dropdown showing "LOI/NDA ▼"
6. "想定取引金額" label, number input with "¥" prefix icon on left
7. "想定クロージング日" label, date input showing "2024-12-31"

At the bottom, display two buttons side by side: "キャンセル" (gray background, gray-700 text, rounded-lg) and "作成" (indigo-600 background, white text, rounded-lg). Both buttons are 44px height. Form has 24px padding inside the white card. Labels are 14px gray-700, inputs have focus ring in indigo-600.
```

---

### 05. Deal Detail (Overview Tab)

**Route**: `/deals/[id]`
**Purpose**: View comprehensive deal information
**From**: Deals list, Dashboard
**To**: Q&A tab, Findings tab, Documents tab, Checklist tab

**UI Elements**:
- Deal header: company initial avatar (48px), deal name (20px bold), target company, phase badge
- Tab navigation: 基本情報 | Q&A | Findings | Documents | Checklist (active tab underlined indigo-600)
- Two-column layout:
  - **Left (2/3 width)**: Overview content
    - Deal description
    - Key dates section (created, updated, expected closing)
    - Transaction details (industry, deal value, status)
  - **Right (1/3 width)**: Sidebar
    - **Deal Metrics** card: 4 metrics (Q&A count, findings count, docs count, checklist progress)
    - **Phase Timeline** card: vertical timeline showing progression through 7 phases with dates

**Google Stitch Prompt**:
```
A deal detail page with tabbed navigation and two-column layout. At the top, show a header with a 48px indigo-50 circular avatar containing initial "A", deal name "アクメ社買収案件" (20px bold) next to it, target company "株式会社アクメ" (14px gray-500) below, and a phase badge "Due Diligence" (blue-50 background, blue-700 text, rounded-full pill) on the right.

Below the header, display a horizontal tab navigation with 5 tabs: "基本情報" (active, indigo-600 underline), "Q&A", "Findings", "Documents", "Checklist". All inactive tabs are gray-500 with no underline.

The main content area uses a 2/3 + 1/3 column layout:

**Left column (2/3 width)**: White card with rounded-xl corners containing deal overview. Display sections: (1) "概要" heading with description text, (2) "重要日程" heading with 3 rows showing Created/Updated/Expected Closing dates, (3) "取引詳細" heading with industry tag, deal value "¥500M", and status badge.

**Right sidebar (1/3 width)**: Stack of two white cards. First card labeled "案件メトリクス" shows 4 metrics in 2×2 grid: "Q&A: 23件", "Findings: 8件", "ドキュメント: 45件", "チェックリスト: 67%". Second card labeled "フェーズ進捗" shows a vertical timeline with 7 phases, current phase (Due Diligence) highlighted in indigo-600, previous phases in emerald-600 with checkmarks, future phases in gray-300.

Background is light gray, cards are white with subtle shadows. Use indigo-600 as primary color.
```

---

### 06. Deal Q&A Tab

**Route**: `/deals/[id]/qa`
**Purpose**: Manage due diligence Q&A
**From**: Deal detail tabs
**To**: Same page (Q&A interactions)

**UI Elements**:
- Same header and tabs as Deal Detail
- **Q&A Form** (top):
  - Question textarea (3 rows)
  - Category select (Legal, Financial, HR, IT, etc.)
  - "質問を追加" button (indigo-600)
  - Duplicate detection indicator (amber banner if similar Q found)
- **Category Filter** (left sidebar, 200px width):
  - "All" + category pills with counts
- **Q&A List** (main area):
  - Each Q&A item: white card with question (bold), category badge, answer (if exists), timestamp, "回答する" button

**Google Stitch Prompt**:
```
A Q&A management interface for due diligence, showing tabbed navigation at top (same as previous screen, "Q&A" tab active with indigo-600 underline). The layout has three sections:

**Top section**: A white card form with heading "新しい質問を追加". Contains: (1) textarea input labeled "質問内容" (3 rows, gray-200 border), (2) select dropdown labeled "カテゴリー" showing "Legal ▼", (3) indigo-600 button "質問を追加" on the right. If duplicate is detected, show amber-50 banner with warning icon and text "類似の質問が見つかりました".

**Left sidebar (200px)**: Category filter section with heading "カテゴリー". Display pills: "All (23)" in indigo-600 background (active), "Legal (8)", "Financial (7)", "HR (4)", "IT (3)", "Other (1)" in gray-100 background. Each pill has rounded-full shape with count in parentheses.

**Main area**: Scrollable list of Q&A items. Each item is a white card with: (1) Question text "デューデリジェンス期間中の情報開示範囲について" (14px bold dark gray), (2) Category badge "Legal" (blue-50 background, blue-700 text, rounded-full pill), (3) Answer section (if answered): light gray background box with answer text, (4) Timestamp "2日前" in small gray text, (5) If unanswered: indigo-600 link button "回答する". Cards have 16px vertical gap between them.

Background is light gray, sidebar has white background with border-right.
```

---

### 07. Deal Findings Tab

**Route**: `/deals/[id]/findings`
**Purpose**: Track due diligence findings and issues
**From**: Deal detail tabs
**To**: Same page (Finding interactions)

**UI Elements**:
- Same header and tabs as Deal Detail
- **Finding Form** (right sidebar, 300px):
  - Title input
  - Description textarea
  - Severity select (Critical, High, Medium, Low)
  - "ファインディングを追加" button (indigo-600)
- **Findings List** (main area):
  - Grouped by severity
  - Each finding: white card with severity badge, title (bold), description, date
  - Severity colors: Critical (red-600), High (orange-600), Medium (amber-600), Low (blue-600)

**Google Stitch Prompt**:
```
A findings management interface with tabbed navigation at top ("Findings" tab active with indigo-600 underline). The layout has two sections:

**Right sidebar (300px)**: White card form with heading "新しいファインディング". Contains: (1) text input labeled "タイトル", (2) textarea labeled "詳細" (4 rows), (3) select dropdown labeled "重要度" showing "High ▼", (4) indigo-600 button "ファインディングを追加" at bottom. Form has white background with border-left.

**Main area (remaining width)**: Findings list grouped by severity. Show 4 severity groups with headings:
- "Critical (2件)" in red-600 text
- "High (5件)" in orange-600 text
- "Medium (8件)" in amber-600 text
- "Low (3件)" in blue-600 text

Each finding is a white card containing: (1) Severity badge in top-left (rounded-full pill, colored background matching severity: red-50/orange-50/amber-50/blue-50 with corresponding text color), (2) Finding title "契約書に競業避止義務条項なし" (14px bold dark gray), (3) Description text in gray-600 (2 lines max), (4) Timestamp "3日前" in small gray text at bottom-right.

Cards have 12px vertical gap within severity groups, 24px gap between groups. Background is light gray.
```

---

### 08. Deal Checklist Tab

**Route**: `/deals/[id]/checklist`
**Purpose**: Track checklist items for due diligence process
**From**: Deal detail tabs
**To**: Same page (Checklist interactions)

**UI Elements**:
- Same header and tabs as Deal Detail
- **Checklist Progress** (top): progress bar showing completion %
- **Template Selector** (top-right): dropdown "テンプレート適用 ▼"
- **Checklist Items** (main area):
  - Grouped by category (Legal, Financial, HR, IT, etc.)
  - Each item: checkbox, item text, assignee avatar (if assigned), due date
  - Completed items: strikethrough text, emerald-600 checkmark

**Google Stitch Prompt**:
```
A checklist management interface with tabbed navigation at top ("Checklist" tab active with indigo-600 underline). At the top, show a progress section:

**Progress bar**: Full-width bar with gray-200 background, indigo-600 filled portion showing 67% completion. Above the bar, display "進捗: 24/36 完了 (67%)" in 14px gray-700 text. To the right, show a select dropdown "テンプレート適用 ▼" (gray-200 border, rounded-lg).

**Main area**: Checklist items grouped by category. Each category has a heading with icon:
- "Legal (8/12)" with scale icon
- "Financial (10/12)" with currency icon
- "HR (4/8)" with users icon
- "IT (2/4)" with laptop icon

Each checklist item is a row with: (1) Checkbox (24px, indigo-600 when checked with white checkmark inside), (2) Item text next to checkbox (14px, dark gray for uncompleted, gray-400 with strikethrough for completed), (3) Small circular avatar (32px) with initials on the right if assigned, (4) Due date in small gray text "期限: 3/31".

Completed items have emerald-600 checkmark in checkbox and strikethrough text. Uncompleted items have empty gray-300 border checkbox. Items have 8px vertical gap within categories, 20px gap between categories. Background is light gray, checklist area is white card with rounded-xl corners.
```

---

### 09. Longlist

**Route**: `/longlist`
**Purpose**: Browse and manage potential acquisition targets
**From**: Dashboard, Header navigation
**To**: Longlist import, Deal creation (from company)

**UI Elements**:
- Header: "ロングリスト" title + "CSV インポート" button (indigo-600)
- Filter bar: Industry, stage, fit score filters
- Company cards grid: 3 columns
  - Each card: company avatar (violet-50, 48px), name (16px bold), industry tag, description (2 lines), fit score (5 stars), "案件化" button (white bg, gray border)
- Pagination at bottom

**Google Stitch Prompt**:
```
A longlist management view showing potential acquisition targets. At the top, display heading "ロングリスト" (24px bold) with "CSV インポート" button on the right (indigo-600 background, white text, with upload icon).

Below the header, show a filter bar with 3 dropdowns side by side: "業界: All ▼", "ステージ: All ▼", "フィットスコア: All ▼" (each gray-200 border, rounded-lg). On the right of filter bar, show count "全 47社".

Main area displays a 3-column grid of company cards (responsive: 1 column mobile, 2 tablet, 3 desktop). Each card is a white rectangle with rounded-xl corners, containing:
1. Top section: 48px circular avatar on violet-50 background with company initial "A" in violet-600, company name "株式会社アルファ" (16px bold) next to it
2. Industry tag below: "IT・ソフトウェア" with tag icon (small gray-500 text)
3. Description text: 2 lines maximum, 12px gray-600
4. Fit score: 5 stars (3.5 filled in amber-400, rest in gray-300), with numerical score "3.5" next to stars
5. At bottom: white button with gray border "案件化" (rounded-lg, hover shadow)

Cards have 16px gap between them. Show 9 cards total with pagination at bottom: "← 1 2 3 →" centered. Background is light gray (#f9fafb).
```

---

### 10. Settings Hub

**Route**: `/settings`
**Purpose**: Access all settings sections
**From**: Header navigation
**To**: Team settings, Template settings

**UI Elements**:
- Page title "設定"
- Settings cards grid: 2×2
  - Card 1: "チーム管理" with users icon (blue-600)
  - Card 2: "テンプレート管理" with document icon (violet-600)
  - Card 3: "通知設定" with bell icon (amber-600)
  - Card 4: "アカウント" with user icon (emerald-600)
- Each card: white bg, icon in colored circle, title, description, arrow →

**Google Stitch Prompt**:
```
A settings hub page with heading "設定" (24px bold) at the top. Below, display a 2×2 grid of large settings cards (2 columns on desktop, 1 column on mobile).

Each card is a white rectangle with rounded-xl corners, hover shadow, and contains:
1. Top-left: Colored circular icon area (56px) with white icon inside (24px)
   - Card 1: Blue-600 background with users icon
   - Card 2: Violet-600 background with document icon
   - Card 3: Amber-600 background with bell icon
   - Card 4: Emerald-600 background with user icon
2. Title below icon: 18px bold dark gray
   - "チーム管理" / "テンプレート管理" / "通知設定" / "アカウント"
3. Description text: 14px gray-500, 2 lines
   - "メンバーの追加・削除、権限管理"
   - "チェックリストテンプレートの作成・編集"
   - etc.
4. Bottom-right: Gray arrow → indicating it's clickable

Cards have 20px gap between them. Background is light gray. Each card is clickable with cursor pointer and hover state showing shadow-md.
```

---

### 11. Deal Documents Tab

**Route**: `/deals/[id]/documents`
**Purpose**: Manage deal-related documents and files
**From**: Deal detail tabs
**To**: Same page (Document upload/download)

**UI Elements**:
- Same header and tabs as Deal Detail
- **Upload Zone** (top): drag-drop area or file picker, indigo-600 dashed border
- **Document List** (main area):
  - Each document: file type icon (PDF/Excel/Word), filename, size, upload date, uploaded by (avatar), "ダウンロード" button
  - File type colors: PDF (red), Excel (green), Word (blue), Other (gray)

**Google Stitch Prompt**:
```
A document management interface with tabbed navigation at top ("Documents" tab active with indigo-600 underline). The layout has two sections:

**Top section**: Upload zone - a dashed border box (indigo-600 dashed 2px, rounded-xl) with centered content: upload cloud icon (48px gray-400), text "ファイルをドラッグ＆ドロップ" (16px gray-600), "または" (12px gray-400), "ファイルを選択" button (indigo-600 background, white text, rounded-lg). Height 200px.

**Main area**: Document list table with 5 columns:
1. File type icon (32px): PDF icon in red-50 circle, Excel icon in green-50 circle, Word icon in blue-50 circle
2. Filename (14px dark gray, bold): "財務諸表_2023.pdf"
3. Size (12px gray-500): "2.4 MB"
4. Upload date (12px gray-500): "2024-03-15"
5. Uploaded by: small avatar (24px) with initials "YN" on indigo-50 background
6. Action: "ダウンロード" link button (indigo-600 text, 12px)

Show 8-10 document rows with alternating white background (no zebra striping, just consistent white). Table header has gray-100 background with 12px uppercase gray-500 text. Each row has 12px vertical padding and subtle gray-200 bottom border. Background is light gray, table is white card with rounded-xl corners.
```

---

### 12. CSV Import

**Route**: `/longlist/import`
**Purpose**: Import company data from CSV
**From**: Longlist "CSV インポート" button
**To**: Longlist (after successful import)

**UI Elements**:
- Page title "ロングリストのインポート"
- **Format Instructions** box: sample CSV format with column names
- **File Upload** area: file input or drag-drop zone
- **Preview Table** (after file selected): shows first 5 rows with column mapping
- Two buttons: "キャンセル", "インポート" (indigo-600)

**Google Stitch Prompt**:
```
A CSV import interface with heading "ロングリストのインポート" (24px bold) at top. The page has 3 sections:

**Section 1**: Format instructions - a light blue-50 box with rounded-xl corners containing:
- Heading "CSV フォーマット" (14px bold)
- Bullet points showing required columns: "会社名, 業界, 説明, フィットスコア (1-5), ステージ"
- Example row in monospace font (12px gray-600): "株式会社アルファ,IT・ソフトウェア,クラウドSaaS企業,4.5,Series B"

**Section 2**: File upload - centered white card with dashed indigo-600 border (rounded-xl), containing:
- Upload icon (48px gray-400)
- Text "CSV ファイルを選択" (16px gray-600)
- Or drag-drop instruction "ドラッグ＆ドロップでアップロード" (12px gray-400)
- File input button (gray border, rounded-lg)

**Section 3**: Preview table (shown after file selected) - white card with heading "プレビュー (最初の5行)". Display a table with 5 columns matching CSV format, showing 5 sample rows with Japanese company data. Header has gray-100 background, rows have subtle gray-200 borders.

At bottom: two buttons side by side - "キャンセル" (gray background) and "47社をインポート" (indigo-600 background, white text). Background is light gray.
```

---

### 13. Team Settings

**Route**: `/settings/team`
**Purpose**: Manage team members and permissions
**From**: Settings hub
**To**: Same page (Member management)

**UI Elements**:
- Breadcrumb: 設定 > チーム管理
- Page title "チーム管理"
- **Invite Form** (top): email input + role select (Admin/Member/Viewer) + "招待" button (indigo-600)
- **Member List** (main area):
  - Table columns: Avatar, Name, Email, Role badge, Status, Actions (remove icon)
  - Role badges: Admin (red-50), Member (blue-50), Viewer (gray-50)
  - Status: Active (emerald-600), Pending (amber-600)

**Google Stitch Prompt**:
```
A team management interface with breadcrumb navigation at top: "設定 > チーム管理" (14px gray-500). Below, show heading "チーム管理" (24px bold).

**Top section**: Invite form - a white card with 3 inline elements:
1. Email input (flex-1, gray-200 border, rounded-lg, placeholder "email@company.com")
2. Role select dropdown (200px width, showing "Member ▼")
3. "招待" button (indigo-600 background, white text, rounded-lg)

**Main area**: Member list table with 6 columns:
1. Avatar: 40px circle with initials on colored background (e.g., "YN" on indigo-50)
2. Name: 14px bold dark gray, e.g., "中林 優太"
3. Email: 14px gray-500, e.g., "yuta@company.com"
4. Role: Pill badge with colored background - "Admin" (red-50 bg, red-700 text), "Member" (blue-50 bg, blue-700 text), "Viewer" (gray-50 bg, gray-700 text)
5. Status: Dot + text - "Active" (emerald-600 dot and text) or "Pending" (amber-600 dot and text)
6. Actions: Remove icon button (trash can, gray-400, hover red-600)

Show 5-6 team members with diverse roles and statuses. Table header has gray-100 background with 12px uppercase gray-500 text. Each row has 16px vertical padding and hover gray-50 background. Background is light gray, table is white card with rounded-xl corners.
```

---

### 14. Template Management

**Route**: `/settings/templates`
**Purpose**: Manage checklist templates
**From**: Settings hub
**To**: Template edit (future)

**UI Elements**:
- Breadcrumb: 設定 > テンプレート管理
- Page title "チェックリストテンプレート"
- "新規テンプレート作成" button (indigo-600)
- **Template List** (main area):
  - Each template: white card with name, description, item count, "編集" button
  - Default templates: "Standard DD", "Tech DD", "Legal DD"

**Google Stitch Prompt**:
```
A template management interface with breadcrumb at top: "設定 > テンプレート管理" (14px gray-500). Below, show heading "チェックリストテンプレート" (24px bold) with "新規テンプレート作成" button on right (indigo-600 background, white text, "+" icon).

**Main area**: List of template cards (single column). Each template is a white card with rounded-xl corners, containing:
1. Template name at top (18px bold dark gray): "Standard DD Checklist"
2. Description below (14px gray-500, 2 lines max): "基本的なデューデリジェンスチェックリスト。法務・財務・人事の主要項目をカバー。"
3. Item count badge (12px gray-500): "36 items" with list icon
4. "編集" button on right (white background, gray border, rounded-lg, hover shadow)

Show 3 template cards:
- "Standard DD Checklist" (36 items)
- "Tech DD Checklist" (24 items)
- "Legal DD Checklist" (18 items)

Cards have 16px vertical gap between them. Background is light gray. Each card has hover state with shadow-md.
```

---

## Notes on Design Consistency

1. **Card hover state**: Always use `shadow-md` + `border-gray-300/60` on hover
2. **Button sizing**: Primary actions are 44px height, secondary actions 36px
3. **Icon sizing**: 24px for main icons, 16px for inline icons, 48px for hero icons
4. **Border radius**: rounded-xl (12px) for cards, rounded-lg (8px) for inputs/buttons
5. **Badge pills**: Use `rounded-full` for all badge/pill elements
6. **Avatar initials**: Always use colored background (indigo/violet/blue/emerald-50) with matching text color (600)
7. **Spacing**: Use 16px for card gaps, 24px for section gaps, 8px for inline elements

---

*End of DD Navigator Design Prompts*
