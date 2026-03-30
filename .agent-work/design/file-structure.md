# ファイル構造設計

DD Navigator のディレクトリ構造とファイル配置を定義します。Next.js 16 App Router の規約に従い、Feature-based コロケーションを採用します。

## ディレクトリツリー

```
dd-navigator/
├── .agent-work/               # Agent作業ディレクトリ（Git管理外）
│   ├── design/                # 設計書
│   └── specs/                 # 要件定義書
├── .github/
│   └── workflows/             # GitHub Actions
│       └── ci.yml
├── public/                    # 静的ファイル
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # 認証関連（Route Group）
│   │   │   ├── layout.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/       # メインアプリ（Route Group）
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx       # ダッシュボード
│   │   │   ├── deals/         # 案件管理
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── qa/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── documents/
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── findings/
│   │   │   │       │   └── page.tsx
│   │   │   │       └── checklist/
│   │   │   │           └── page.tsx
│   │   │   ├── longlist/      # ロングリスト
│   │   │   │   ├── page.tsx
│   │   │   │   └── import/
│   │   │   │       └── page.tsx
│   │   │   └── settings/      # 設定
│   │   │       ├── page.tsx
│   │   │       ├── team/
│   │   │       │   └── page.tsx
│   │   │       └── templates/
│   │   │           └── page.tsx
│   │   ├── api/               # API Routes
│   │   │   ├── auth/
│   │   │   │   └── callback/
│   │   │   │       └── route.ts
│   │   │   ├── dashboard/
│   │   │   │   └── route.ts
│   │   │   ├── longlist/
│   │   │   │   ├── route.ts
│   │   │   │   ├── import/
│   │   │   │   │   └── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── deals/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts
│   │   │   │       ├── phase/
│   │   │   │       │   └── route.ts
│   │   │   │       ├── qa/
│   │   │   │       │   ├── route.ts
│   │   │   │       │   ├── check-duplicate/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── export/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── [qaId]/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── documents/
│   │   │   │       │   ├── route.ts
│   │   │   │       │   └── [docId]/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── findings/
│   │   │   │       │   ├── route.ts
│   │   │   │       │   └── [findingId]/
│   │   │   │       │       └── route.ts
│   │   │   │       └── checklist/
│   │   │   │           ├── apply-template/
│   │   │   │           │   └── route.ts
│   │   │   │           └── [itemId]/
│   │   │   │               └── route.ts
│   │   │   └── teams/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           ├── route.ts
│   │   │           └── members/
│   │   │               └── route.ts
│   │   ├── layout.tsx         # Root Layout
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/            # React Components
│   │   ├── ui/                # shadcn/ui コンポーネント
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── table.tsx
│   │   │   └── toast.tsx
│   │   ├── layout/            # レイアウトコンポーネント
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── DealNav.tsx
│   │   └── features/          # Feature-based コンポーネント
│   │       ├── longlist/
│   │       │   ├── index.ts
│   │       │   ├── CompanyList.tsx
│   │       │   ├── CompanyCard.tsx
│   │       │   ├── CompanyForm.tsx
│   │       │   ├── ImportForm.tsx
│   │       │   └── FitScoreInput.tsx
│   │       ├── deal/
│   │       │   ├── index.ts
│   │       │   ├── DealList.tsx
│   │       │   ├── DealCard.tsx
│   │       │   ├── DealForm.tsx
│   │       │   ├── DealDetail.tsx
│   │       │   ├── PhaseBadge.tsx
│   │       │   ├── PhaseTimeline.tsx
│   │       │   └── DealMetrics.tsx
│   │       ├── qa/
│   │       │   ├── index.ts
│   │       │   ├── QAList.tsx
│   │       │   ├── QAItem.tsx
│   │       │   ├── QAForm.tsx
│   │       │   ├── DuplicateWarning.tsx
│   │       │   ├── QAExport.tsx
│   │       │   └── CategoryFilter.tsx
│   │       ├── document/
│   │       │   ├── index.ts
│   │       │   ├── DocumentList.tsx
│   │       │   ├── DocumentCard.tsx
│   │       │   ├── DocumentUpload.tsx
│   │       │   └── CategoryFilter.tsx
│   │       ├── finding/
│   │       │   ├── index.ts
│   │       │   ├── FindingList.tsx
│   │       │   ├── FindingCard.tsx
│   │       │   ├── FindingForm.tsx
│   │       │   └── SeverityBadge.tsx
│   │       ├── checklist/
│   │       │   ├── index.ts
│   │       │   ├── ChecklistSection.tsx
│   │       │   ├── ChecklistItem.tsx
│   │       │   ├── TemplateSelector.tsx
│   │       │   └── ProgressBar.tsx
│   │       ├── dashboard/
│   │       │   ├── index.ts
│   │       │   ├── SummaryCards.tsx
│   │       │   ├── PhaseChart.tsx
│   │       │   ├── RecentDeals.tsx
│   │       │   └── UpcomingClosings.tsx
│   │       └── settings/
│   │           ├── index.ts
│   │           ├── TeamForm.tsx
│   │           ├── MemberList.tsx
│   │           ├── MemberInvite.tsx
│   │           └── TemplateManager.tsx
│   ├── lib/                   # ビジネスロジック・ユーティリティ
│   │   ├── actions/           # Server Actions
│   │   │   ├── deal.ts
│   │   │   ├── longlist.ts
│   │   │   ├── qa.ts
│   │   │   ├── document.ts
│   │   │   ├── finding.ts
│   │   │   ├── checklist.ts
│   │   │   └── team.ts
│   │   ├── api/               # API クライアント
│   │   │   ├── deal.ts
│   │   │   ├── longlist.ts
│   │   │   ├── qa.ts
│   │   │   ├── document.ts
│   │   │   ├── finding.ts
│   │   │   ├── checklist.ts
│   │   │   ├── dashboard.ts
│   │   │   └── team.ts
│   │   ├── schemas/           # Zod スキーマ
│   │   │   ├── deal.ts
│   │   │   ├── longlist.ts
│   │   │   ├── qa.ts
│   │   │   ├── document.ts
│   │   │   ├── finding.ts
│   │   │   ├── checklist.ts
│   │   │   ├── team.ts
│   │   │   ├── dashboard.ts
│   │   │   └── error.ts
│   │   ├── services/          # ビジネスロジック
│   │   │   ├── duplicate-detection.ts
│   │   │   ├── phase-calculator.ts
│   │   │   └── storage-quota.ts
│   │   ├── supabase/          # Supabase クライアント
│   │   │   ├── server.ts
│   │   │   ├── client.ts
│   │   │   └── middleware.ts
│   │   ├── utils/             # 汎用ユーティリティ
│   │   │   ├── cn.ts          # classnames merge
│   │   │   ├── date.ts
│   │   │   └── file.ts
│   │   └── constants/         # 定数定義
│   │       ├── deal-phases.ts
│   │       ├── qa-categories.ts
│   │       ├── finding-categories.ts
│   │       └── roles.ts
│   └── types/                 # グローバル型定義
│       └── index.d.ts
├── supabase/                  # Supabase 設定
│   ├── migrations/            # マイグレーションファイル
│   │   ├── 20260330000001_create_teams.sql
│   │   ├── 20260330000002_create_team_members.sql
│   │   ├── 20260330000003_create_longlist_companies.sql
│   │   ├── 20260330000004_create_deals.sql
│   │   ├── 20260330000005_create_deal_phases.sql
│   │   ├── 20260330000006_create_qa_items.sql
│   │   ├── 20260330000007_create_documents.sql
│   │   ├── 20260330000008_create_document_categories.sql
│   │   ├── 20260330000009_create_findings.sql
│   │   ├── 20260330000010_create_checklist_templates.sql
│   │   ├── 20260330000011_create_checklist_items.sql
│   │   ├── 20260330000012_create_deal_checklists.sql
│   │   ├── 20260330000013_create_indexes.sql
│   │   ├── 20260330000014_enable_rls.sql
│   │   ├── 20260330000015_create_rls_policies.sql
│   │   └── 20260330000016_create_triggers.sql
│   └── config.toml
├── .env.local                 # ローカル環境変数（Git管理外）
├── .env.example               # 環境変数テンプレート
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── middleware.ts              # Next.js Middleware
├── next.config.ts
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## ディレクトリ別の責務

### `/src/app` - Next.js App Router

Next.js 16 の App Router 規約に従った配置。

#### Route Group: `(auth)`

認証関連のページをグループ化。URL には影響しない。

- **layout.tsx**: 認証ページ共通レイアウト（ログインフォーム中央配置等）
- **login/page.tsx**: ログインページ（Magic Link）

```tsx
// src/app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
```

```tsx
// src/app/(auth)/login/page.tsx
import { LoginForm } from "@/components/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">DD Navigator</h1>
      <LoginForm />
    </div>
  );
}
```

#### Route Group: `(dashboard)`

メインアプリケーション。認証必須。

- **layout.tsx**: ダッシュボード共通レイアウト（Header, Sidebar）
- **page.tsx**: ダッシュボードホーム
- **deals/**: 案件管理
- **longlist/**: ロングリスト管理
- **settings/**: 設定画面

```tsx
// src/app/(dashboard)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
```

```tsx
// src/app/(dashboard)/deals/[id]/page.tsx
import { DealDetail } from "@/components/features/deal";
import { DealNav } from "@/components/layout/DealNav";

export default async function DealDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <DealNav dealId={params.id} />
      <DealDetail dealId={params.id} />
    </div>
  );
}
```

#### `/api` - API Routes

RESTful API エンドポイント。

**命名規則:**
- 複数形リソース名: `/api/deals`, `/api/longlist`
- 動的ルート: `/api/deals/[id]`
- サブリソース: `/api/deals/[id]/qa`

```tsx
// src/app/api/deals/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { listDealsQuerySchema } from "@/lib/schemas/deal";

// GET /api/deals
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validated = listDealsQuerySchema.parse({
    phase: searchParams.get("phase"),
    status: searchParams.get("status"),
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  });

  const supabase = await createServerClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*, deal_phases(*)")
    .eq("current_phase", validated.phase ?? undefined)
    .eq("status", validated.status ?? undefined)
    .range(
      (validated.page - 1) * validated.limit,
      validated.page * validated.limit - 1
    );

  return NextResponse.json({ deals, page: validated.page, limit: validated.limit });
}

// POST /api/deals
export async function POST(request: Request) {
  const body = await request.json();
  const validated = createDealSchema.parse(body);

  const supabase = await createServerClient();
  const { data: deal } = await supabase
    .from("deals")
    .insert(validated)
    .select()
    .single();

  return NextResponse.json(deal, { status: 201 });
}
```

### `/src/components` - React Components

コンポーネントを3層に分割。

#### `/ui` - shadcn/ui コンポーネント

汎用 UI コンポーネント。shadcn/ui を使用。

```bash
# shadcn/ui インストール例
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toast
```

```tsx
// src/components/ui/button.tsx（自動生成）
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-4 py-2 rounded-md font-medium",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "outline" && "border border-gray-300 hover:bg-gray-100",
          variant === "ghost" && "hover:bg-gray-100",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

#### `/layout` - レイアウトコンポーネント

Header, Sidebar, DealNav 等の全体レイアウト。

```tsx
// src/components/layout/Header.tsx
import { createServerClient } from "@/lib/supabase/server";

export async function Header() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">
      <h1 className="text-xl font-bold">DD Navigator</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        {/* User menu, notifications, etc. */}
      </div>
    </header>
  );
}
```

```tsx
// src/components/layout/DealNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function DealNav({ dealId }: { dealId: string }) {
  const pathname = usePathname();

  const navItems = [
    { label: "概要", href: `/deals/${dealId}` },
    { label: "Q&A", href: `/deals/${dealId}/qa` },
    { label: "資料", href: `/deals/${dealId}/documents` },
    { label: "発見事項", href: `/deals/${dealId}/findings` },
    { label: "チェックリスト", href: `/deals/${dealId}/checklist` },
  ];

  return (
    <nav className="border-b border-gray-200 mb-6">
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 border-b-2",
              pathname === item.href
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

#### `/features` - Feature-based コンポーネント

機能単位でディレクトリを切り、関連コンポーネントをまとめる。

**Feature ディレクトリの構成:**
```
features/deal/
├── index.ts                  # 公開 API
├── DealList.tsx              # 案件一覧（Server Component）
├── DealCard.tsx              # 案件カード（内部コンポーネント）
├── DealForm.tsx              # 案件作成フォーム（Client Component）
├── DealDetail.tsx            # 案件詳細（Server Component）
├── PhaseBadge.tsx            # フェーズバッジ（共有コンポーネント）
├── PhaseTimeline.tsx         # フェーズタイムライン（Server Component）
└── DealMetrics.tsx           # 案件メトリクス（Server Component）
```

**index.ts で公開 API を定義:**
```typescript
// src/components/features/deal/index.ts
export { DealList } from "./DealList";
export { DealForm } from "./DealForm";
export { DealDetail } from "./DealDetail";
export { PhaseBadge } from "./PhaseBadge";
// DealCard は内部実装なので非公開
```

**DealList.tsx（Server Component）:**
```tsx
import { createServerClient } from "@/lib/supabase/server";
import { DealCard } from "./DealCard";

export async function DealList() {
  const supabase = await createServerClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*, deal_phases(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      {deals?.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}
```

**DealForm.tsx（Client Component）:**
```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDealSchema, type CreateDealInput } from "@/lib/schemas/deal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DealForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateDealInput>({
    resolver: zodResolver(createDealSchema),
  });

  const onSubmit = async (data: CreateDealInput) => {
    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Failed to create deal:", error);
      return;
    }

    const deal = await res.json();
    // Success handling...
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">案件名</label>
        <Input {...register("name")} />
        {errors.name && <span className="text-sm text-red-600">{errors.name.message}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">対象企業名</label>
        <Input {...register("target_company")} />
        {errors.target_company && <span className="text-sm text-red-600">{errors.target_company.message}</span>}
      </div>

      <Button type="submit">作成</Button>
    </form>
  );
}
```

**QAList.tsx（Server Component with Client Component children）:**
```tsx
// src/components/features/qa/QAList.tsx
import { createServerClient } from "@/lib/supabase/server";
import { QAItem } from "./QAItem";

export async function QAList({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();
  const { data: qaItems } = await supabase
    .from("qa_items")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      {qaItems?.map((item) => (
        <QAItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

```tsx
// src/components/features/qa/QAItem.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import type { QAItem as QAItemType } from "@/lib/schemas/qa";

export function QAItem({ item }: { item: QAItemType }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium">{item.question}</h3>
          {item.answer && <p className="text-sm text-gray-600 mt-2">{item.answer}</p>}
        </div>
        <Badge variant={item.status === "received" ? "success" : "default"}>
          {item.status}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
        <span>カテゴリ: {item.category}</span>
        <span>優先度: {item.priority}</span>
        {item.due_date && <span>期限: {item.due_date}</span>}
      </div>
    </div>
  );
}
```

### `/src/lib` - ビジネスロジック・ユーティリティ

#### `/actions` - Server Actions

フォーム送信・状態更新用の Server Actions。

```typescript
// src/lib/actions/deal.ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { updateDealPhaseSchema } from "@/lib/schemas/deal";

export async function updateDealPhase(dealId: string, phase: string) {
  const validated = updateDealPhaseSchema.parse({ dealId, phase });

  const supabase = await createServerClient();

  // フェーズ履歴を作成
  await supabase.from("deal_phases").insert({
    deal_id: validated.dealId,
    phase: validated.phase,
    started_at: new Date().toISOString(),
  });

  // 案件のフェーズを更新
  await supabase
    .from("deals")
    .update({ current_phase: validated.phase })
    .eq("id", validated.dealId);

  revalidatePath(`/deals/${validated.dealId}`);
  return { success: true };
}
```

```typescript
// src/lib/actions/checklist.ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";

export async function toggleChecklistItem(itemId: string, completed: boolean) {
  const supabase = await createServerClient();

  await supabase
    .from("deal_checklists")
    .update({
      is_completed: completed,
      completed_at: completed ? new Date().toISOString() : null,
    })
    .eq("id", itemId);

  revalidatePath("/deals/[id]/checklist");
  return { success: true };
}
```

#### `/api` - API クライアント

API Routes を呼び出すクライアント関数。

```typescript
// src/lib/api/qa.ts
import { z } from "zod";
import { checkDuplicateQASchema, checkDuplicateQAResponseSchema } from "@/lib/schemas/qa";

export async function checkDuplicateQA(dealId: string, question: string) {
  const validated = checkDuplicateQASchema.parse({ question });

  const res = await fetch(`/api/deals/${dealId}/qa/check-duplicate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  if (!res.ok) throw new Error("Failed to check duplicate");

  const data = await res.json();
  return checkDuplicateQAResponseSchema.parse(data);
}
```

#### `/schemas` - Zod スキーマ

API のリクエスト・レスポンスをバリデーションする Zod スキーマ。

```typescript
// src/lib/schemas/deal.ts
import { z } from "zod";

export const dealPhaseEnum = z.enum([
  "sourcing",
  "nda",
  "im_review",
  "loi",
  "dd",
  "negotiation",
  "closing",
  "completed",
  "abandoned",
]);

export type DealPhase = z.infer<typeof dealPhaseEnum>;

export const createDealSchema = z.object({
  name: z.string().min(1, "案件名は必須です").max(200),
  target_company: z.string().min(1, "対象企業名は必須です").max(200),
  expected_closing_date: z.string().date().optional(),
  team_id: z.string().uuid(),
});

export type CreateDealInput = z.infer<typeof createDealSchema>;

export const updateDealPhaseSchema = z.object({
  dealId: z.string().uuid(),
  phase: dealPhaseEnum,
});
```

```typescript
// src/lib/schemas/qa.ts
import { z } from "zod";

export const qaCategoryEnum = z.enum([
  "finance",
  "legal",
  "hr",
  "it",
  "business",
  "other",
]);

export const qaStatusEnum = z.enum([
  "draft",
  "sent",
  "received",
  "clarification_needed",
]);

export const qaPriorityEnum = z.enum(["high", "medium", "low"]);

export const createQASchema = z.object({
  deal_id: z.string().uuid(),
  category: qaCategoryEnum,
  question: z.string().min(1, "質問は必須です").max(5000),
  priority: qaPriorityEnum.default("medium"),
  due_date: z.string().date().optional(),
});

export type CreateQAInput = z.infer<typeof createQASchema>;

export const checkDuplicateQASchema = z.object({
  question: z.string().min(1).max(5000),
});

export const checkDuplicateQAResponseSchema = z.object({
  has_duplicates: z.boolean(),
  similar_questions: z.array(
    z.object({
      id: z.string().uuid(),
      question: z.string(),
      similarity_score: z.number().min(0).max(1),
      status: qaStatusEnum,
    })
  ),
});
```

#### `/services` - ビジネスロジック

複雑なビジネスロジックをカプセル化。

```typescript
// src/lib/services/duplicate-detection.ts
import { createServerClient } from "@/lib/supabase/server";

export async function detectDuplicateQuestions(dealId: string, question: string) {
  const supabase = await createServerClient();

  // PostgreSQL の pg_trgm 拡張を使用したトライグラム類似度検索
  const { data: similarQuestions } = await supabase.rpc("find_similar_questions", {
    p_deal_id: dealId,
    p_question: question,
    p_threshold: 0.3,
  });

  return {
    has_duplicates: (similarQuestions?.length ?? 0) > 0,
    similar_questions: similarQuestions ?? [],
  };
}
```

```typescript
// src/lib/services/phase-calculator.ts
import { createServerClient } from "@/lib/supabase/server";

export async function calculatePhaseMetrics(dealId: string) {
  const supabase = await createServerClient();

  const { data: phases } = await supabase
    .from("deal_phases")
    .select("*")
    .eq("deal_id", dealId)
    .order("started_at", { ascending: true });

  if (!phases || phases.length === 0) {
    return { total_days: 0, current_phase_days: 0 };
  }

  const firstPhase = phases[0];
  const currentPhase = phases[phases.length - 1];

  const totalDays = Math.floor(
    (Date.now() - new Date(firstPhase.started_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  const currentPhaseDays = Math.floor(
    (Date.now() - new Date(currentPhase.started_at).getTime()) / (1000 * 60 * 60 * 24)
  );

  return { total_days: totalDays, current_phase_days: currentPhaseDays };
}
```

```typescript
// src/lib/services/storage-quota.ts
import { createServerClient } from "@/lib/supabase/server";

export async function checkStorageQuota(teamId: string, fileSize: number): Promise<boolean> {
  const supabase = await createServerClient();

  const { data: team } = await supabase
    .from("teams")
    .select("storage_used_bytes, storage_limit_bytes")
    .eq("id", teamId)
    .single();

  if (!team) return false;

  const available = team.storage_limit_bytes - team.storage_used_bytes;
  return fileSize <= available;
}

export async function updateStorageUsage(teamId: string, delta: number) {
  const supabase = await createServerClient();

  await supabase.rpc("update_storage_usage", {
    p_team_id: teamId,
    p_delta: delta,
  });
}
```

#### `/supabase` - Supabase クライアント

Server Components / Client Components / Middleware 用のクライアント。

```typescript
// src/lib/supabase/server.ts
import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### `/utils` - 汎用ユーティリティ

```typescript
// src/lib/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// src/lib/utils/date.ts
import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export function formatDate(date: string | Date): string {
  return format(new Date(date), "yyyy年MM月dd日", { locale: ja });
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { locale: ja, addSuffix: true });
}
```

```typescript
// src/lib/utils/file.ts
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}
```

#### `/constants` - 定数定義

```typescript
// src/lib/constants/deal-phases.ts
export const DEAL_PHASES = {
  SOURCING: "sourcing",
  NDA: "nda",
  IM_REVIEW: "im_review",
  LOI: "loi",
  DD: "dd",
  NEGOTIATION: "negotiation",
  CLOSING: "closing",
  COMPLETED: "completed",
  ABANDONED: "abandoned",
} as const;

export const DEAL_PHASE_LABELS: Record<string, string> = {
  sourcing: "ソーシング",
  nda: "NDA締結",
  im_review: "IMレビュー",
  loi: "LOI提出",
  dd: "DD実施中",
  negotiation: "最終交渉",
  closing: "クロージング準備",
  completed: "完了",
  abandoned: "中止",
};
```

```typescript
// src/lib/constants/qa-categories.ts
export const QA_CATEGORIES = {
  FINANCE: "finance",
  LEGAL: "legal",
  HR: "hr",
  IT: "it",
  BUSINESS: "business",
  OTHER: "other",
} as const;

export const QA_CATEGORY_LABELS: Record<string, string> = {
  finance: "財務",
  legal: "法務",
  hr: "人事",
  it: "IT",
  business: "事業",
  other: "その他",
};
```

```typescript
// src/lib/constants/roles.ts
export const ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MEMBER: "member",
  VIEWER: "viewer",
} as const;

export const ROLE_LABELS: Record<string, string> = {
  owner: "オーナー",
  admin: "管理者",
  member: "メンバー",
  viewer: "閲覧者",
};
```

### `/src/types` - グローバル型定義

```typescript
// src/types/index.d.ts
export type Role = "owner" | "admin" | "member" | "viewer";

export type DealPhase =
  | "sourcing"
  | "nda"
  | "im_review"
  | "loi"
  | "dd"
  | "negotiation"
  | "closing"
  | "completed"
  | "abandoned";

export type QAStatus = "draft" | "sent" | "received" | "clarification_needed";

export type QAPriority = "high" | "medium" | "low";

export type FindingCategory = "risk" | "opportunity" | "issue" | "information";

export type FindingSeverity = "critical" | "high" | "medium" | "low";
```

## ルートレベルのファイル

### `/middleware.ts` - Next.js Middleware

認証チェックを実装。

```typescript
// middleware.ts
import { createServerClient } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証不要パス
  if (pathname.startsWith("/api/auth") || pathname === "/login") {
    return NextResponse.next();
  }

  const supabase = await createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
```

### `/next.config.ts` - Next.js 設定

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
```

### `/tsconfig.json` - TypeScript 設定

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `/.env.example` - 環境変数テンプレート

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### `/.gitignore`

```bash
# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# supabase
.supabase

# agent work
.agent-work
```

## ファイル命名規則

### React Components

- **PascalCase**: `DealList.tsx`, `PhaseBadge.tsx`
- **Server Components**: 特別な接尾辞なし（デフォルト）
- **Client Components**: ファイル先頭に `"use client"` ディレクティブ

### Server Actions

- **camelCase**: `updateDealPhase`, `toggleChecklistItem`
- ファイル名は **kebab-case**: `deal.ts`, `checklist.ts`

### API Routes

- **kebab-case**: `deals`, `longlist`, `qa-items`
- ファイル名は必ず **`route.ts`**

### Zod Schemas

- **camelCase + Schema 接尾辞**: `createDealSchema`, `checkDuplicateQASchema`
- ファイル名は **kebab-case**: `deal.ts`, `qa.ts`

### 型定義

- **PascalCase**: `DealPhase`, `QAStatus`, `FindingCategory`
- ファイル名: `index.d.ts` または対応するスキーマファイルで `z.infer` を使用

## 開発フロー

### 新機能追加時の手順

1. **Zod スキーマ定義**: `/src/lib/schemas/` に追加
2. **API Routes 実装**: `/src/app/api/` に追加
3. **Server Actions 実装**: `/src/lib/actions/` に追加
4. **Feature コンポーネント作成**: `/src/components/features/` に追加
5. **Page 作成**: `/src/app/(dashboard)/` に追加

### コンポーネント追加時のチェックリスト

- [ ] Server Components / Client Components を適切に使い分けているか
- [ ] `"use client"` は必要最小限のコンポーネントにのみ付与しているか
- [ ] Feature ディレクトリに配置し、`index.ts` で公開 API を定義しているか
- [ ] 内部実装の詳細を外部に露出していないか
- [ ] Zod スキーマでバリデーションしているか

### API 追加時のチェックリスト

- [ ] RESTful な URL 設計になっているか（複数形リソース名）
- [ ] 適切な HTTP メソッド・ステータスコードを使用しているか
- [ ] Zod スキーマでリクエスト・レスポンスをバリデーションしているか
- [ ] エラーレスポンスは統一フォーマットに従っているか
- [ ] RLS ポリシーで認可制御しているか

## まとめ

DD Navigator のファイル構造は以下の原則に基づきます:

1. **Next.js 16 App Router 規約**: Route Group、動的ルート、API Routes
2. **Feature-based コロケーション**: 関連ファイルを近くに配置
3. **責務の分離**: UI / Business Logic / Data Access の3層
4. **型安全性**: Zod スキーマ + TypeScript strict mode
5. **スケーラビリティ**: 機能追加時にディレクトリ構造を維持しやすい設計

この構造により、開発者がコードを探しやすく、保守性の高いアプリケーションを実現します。
