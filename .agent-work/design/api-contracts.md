# DD Navigator - API Contracts

## 1. Overview

DD Navigator の全 API エンドポイント定義です。すべてのエンドポイントは Zod スキーマによるランタイムバリデーションを実装します。

## 2. Common Specifications

### Base URL

```
Production: https://dd-navigator.vercel.app/api
Development: http://localhost:3000/api
```

### Authentication

Supabase Auth（Cookie ベース）。Middleware で自動チェック。

### Common Headers

```
Content-Type: application/json
Cookie: sb-xxx-auth-token=xxx
```

### Error Response Format

```typescript
// lib/schemas/error.ts
import { z } from "zod";

export const errorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
```

#### Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| VALIDATION_ERROR | 400 | Input validation error |
| UNAUTHORIZED | 401 | Authentication error |
| FORBIDDEN | 403 | Authorization error |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict |
| INTERNAL_ERROR | 500 | Server internal error |

## 3. API Endpoints

### 3.1 Longlist Management

#### 3.1.1 List Companies

```
GET /api/longlist-companies
```

**Authentication**: Required (all roles)

**Query Parameters:**

```typescript
export const listCompaniesQuerySchema = z.object({
  industry: z.string().optional(),
  region: z.string().optional(),
  revenue_min: z.coerce.number().optional(),
  revenue_max: z.coerce.number().optional(),
  fit_score: z.coerce.number().int().min(1).max(5).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
```

**Response:**

```typescript
export const longlistCompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  industry: z.string(),
  region: z.string(),
  revenue: z.number().nullable(),
  employees: z.number().int().nullable(),
  strategic_fit_score: z.number().int().min(1).max(5),
  last_updated: z.string().datetime(),
  created_at: z.string().datetime(),
});

export const listCompaniesResponseSchema = z.object({
  companies: z.array(longlistCompanySchema),
  total: z.number().int(),
  page: z.number().int(),
  has_next: z.boolean(),
});
```

#### 3.1.2 Create Company

```
POST /api/longlist-companies
```

**Authentication**: Required (admin, senior member)

**Request Body:**

```typescript
export const createCompanySchema = z.object({
  name: z.string().min(1).max(200),
  industry: z.string().min(1),
  region: z.string().min(1),
  revenue: z.number().positive().optional(),
  employees: z.number().int().positive().optional(),
  strategic_fit_score: z.number().int().min(1).max(5),
});
```

**Response:**

```typescript
export const createCompanyResponseSchema = z.object({
  success: z.boolean(),
  company: longlistCompanySchema,
});
```

#### 3.1.3 Bulk Import Companies (CSV)

```
POST /api/longlist-companies/import
```

**Authentication**: Required (admin, senior member)

**Request Body (multipart/form-data):**

```typescript
export const importCompaniesSchema = z.object({
  file: z.instanceof(File),
  team_id: z.string().uuid(),
});
```

**Response:**

```typescript
export const importCompaniesResponseSchema = z.object({
  success: z.boolean(),
  imported: z.number().int(),
  failed: z.number().int(),
  errors: z.array(z.object({
    row: z.number().int(),
    message: z.string(),
  })),
});
```

### 3.2 Deal Management

#### 3.2.1 List Deals

```
GET /api/deals
```

**Authentication**: Required (all roles)

**Query Parameters:**

```typescript
export const listDealsQuerySchema = z.object({
  phase: z.enum(["nonname", "nda", "im", "loi", "mou", "dd", "dd_consolidation", "spa", "closing", "all"]).default("all"),
  assignee: z.string().uuid().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
```

**Response:**

```typescript
export const dealSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  target_company: z.string(),
  current_phase: z.enum(["nonname", "nda", "im", "loi", "mou", "dd", "dd_consolidation", "spa", "closing"]),
  expected_closing: z.string().datetime().nullable(),
  team_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const listDealsResponseSchema = z.object({
  deals: z.array(dealSchema),
  total: z.number().int(),
  page: z.number().int(),
  has_next: z.boolean(),
});
```

#### 3.2.2 Create Deal

```
POST /api/deals
```

**Authentication**: Required (admin, senior member)

**Request Body:**

```typescript
export const createDealSchema = z.object({
  name: z.string().min(1).max(200),
  target_company: z.string().min(1).max(200),
  expected_closing: z.string().datetime().optional(),
  team_id: z.string().uuid(),
});
```

**Response:**

```typescript
export const createDealResponseSchema = z.object({
  success: z.boolean(),
  deal: dealSchema,
});
```

#### 3.2.3 Get Deal Details

```
GET /api/deals/[id]
```

**Authentication**: Required (all roles)

**Path Parameters:**

```typescript
export const dealIdParamSchema = z.object({
  id: z.string().uuid(),
});
```

**Response:**

```typescript
export const dealDetailSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  target_company: z.string(),
  current_phase: z.enum(["nonname", "nda", "im", "loi", "mou", "dd", "dd_consolidation", "spa", "closing"]),
  expected_closing: z.string().datetime().nullable(),
  team_id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  phases: z.array(
    z.object({
      id: z.string().uuid(),
      phase: z.string(),
      status: z.enum(["not_started", "in_progress", "completed"]),
      start_date: z.string().datetime().nullable(),
      end_date: z.string().datetime().nullable(),
    })
  ),
  team_members: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      role: z.enum(["leader", "senior", "junior"]),
    })
  ),
});
```

#### 3.2.4 Update Deal Phase

```
PATCH /api/deals/[id]
```

**Authentication**: Required (admin, senior member)

**Request Body:**

```typescript
export const updateDealPhaseSchema = z.object({
  current_phase: z.enum(["nonname", "nda", "im", "loi", "mou", "dd", "dd_consolidation", "spa", "closing"]),
});
```

**Response:**

```typescript
export const updateDealResponseSchema = z.object({
  success: z.boolean(),
  deal: dealSchema,
});
```

### 3.3 Q&A Management

#### 3.3.1 List Q&A Items

```
GET /api/deals/[dealId]/qa
```

**Authentication**: Required (all roles)

**Query Parameters:**

```typescript
export const listQAItemsQuerySchema = z.object({
  dd_area: z.enum(["bdd", "fdd", "ldd", "tdd", "hrdd", "itdd", "all"]).default("all"),
  status: z.enum(["draft", "sent", "received", "all"]).default("all"),
  page: z.coerce.number().int().min(1).default(1),
});
```

**Response:**

```typescript
export const qaItemSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  question: z.string(),
  answer: z.string().nullable(),
  dd_area: z.enum(["bdd", "fdd", "ldd", "tdd", "hrdd", "itdd"]),
  status: z.enum(["draft", "sent", "received"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const listQAItemsResponseSchema = z.object({
  qa_items: z.array(qaItemSchema),
  total: z.number().int(),
  page: z.number().int(),
});
```

#### 3.3.2 Create Q&A Item

```
POST /api/deals/[dealId]/qa
```

**Authentication**: Required (all roles)

**Request Body:**

```typescript
export const createQAItemSchema = z.object({
  question: z.string().min(1).max(5000),
  dd_area: z.enum(["bdd", "fdd", "ldd", "tdd", "hrdd", "itdd"]),
});
```

**Response:**

```typescript
export const createQAItemResponseSchema = z.object({
  success: z.boolean(),
  qa_item: qaItemSchema,
  similar_questions: z.array(
    z.object({
      id: z.string().uuid(),
      question: z.string(),
      similarity_score: z.number().min(0).max(1),
    })
  ),
});
```

#### 3.3.3 Check for Duplicate Q&A

```
POST /api/deals/[dealId]/qa/check-duplicate
```

**Authentication**: Required (all roles)

**Request Body:**

```typescript
export const checkDuplicateQASchema = z.object({
  question: z.string().min(1).max(5000),
});
```

**Response:**

```typescript
export const checkDuplicateQAResponseSchema = z.object({
  has_duplicates: z.boolean(),
  similar_questions: z.array(
    z.object({
      id: z.string().uuid(),
      question: z.string(),
      similarity_score: z.number().min(0).max(1),
      status: z.enum(["draft", "sent", "received"]),
    })
  ),
});
```

#### 3.3.4 Export Q&A List

```
GET /api/deals/[dealId]/qa/export
```

**Authentication**: Required (all roles)

**Query Parameters:**

```typescript
export const exportQASchema = z.object({
  format: z.enum(["text", "csv", "xlsx"]).default("text"),
  dd_area: z.enum(["bdd", "fdd", "ldd", "tdd", "hrdd", "itdd", "all"]).default("all"),
});
```

**Response**: File download (Content-Type: text/plain | text/csv | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)

### 3.4 Document Management

#### 3.4.1 Upload Document

```
POST /api/deals/[dealId]/documents
```

**Authentication**: Required (all roles)

**Request Body (multipart/form-data):**

```typescript
export const uploadDocumentSchema = z.object({
  file: z.instanceof(File),
  category: z.enum(["financial", "business_plan", "contract", "hr", "other"]),
  deal_id: z.string().uuid(),
});
```

**Response:**

```typescript
export const uploadDocumentResponseSchema = z.object({
  success: z.boolean(),
  document: z.object({
    id: z.string().uuid(),
    filename: z.string(),
    category: z.string(),
    size: z.number().int(),
    url: z.string().url(),
    uploaded_at: z.string().datetime(),
  }),
});
```

#### 3.4.2 List Documents

```
GET /api/deals/[dealId]/documents
```

**Authentication**: Required (all roles)

**Query Parameters:**

```typescript
export const listDocumentsQuerySchema = z.object({
  category: z.enum(["financial", "business_plan", "contract", "hr", "other", "all"]).default("all"),
  sort: z.enum(["name", "date", "size"]).default("date"),
  page: z.coerce.number().int().min(1).default(1),
});
```

**Response:**

```typescript
export const documentSchema = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  category: z.enum(["financial", "business_plan", "contract", "hr", "other"]),
  size: z.number().int(),
  url: z.string().url(),
  uploaded_at: z.string().datetime(),
  uploaded_by: z.string(),
});

export const listDocumentsResponseSchema = z.object({
  documents: z.array(documentSchema),
  total: z.number().int(),
  page: z.number().int(),
});
```

### 3.5 Checklist Management

#### 3.5.1 List Checklist Templates

```
GET /api/checklist-templates
```

**Authentication**: Required (all roles)

**Response:**

```typescript
export const checklistTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  dd_area: z.enum(["bdd", "fdd", "ldd", "tdd", "hrdd", "itdd"]),
  items: z.array(
    z.object({
      title: z.string(),
      description: z.string().nullable(),
      order: z.number().int(),
    })
  ),
  created_at: z.string().datetime(),
});

export const listChecklistTemplatesResponseSchema = z.object({
  templates: z.array(checklistTemplateSchema),
});
```

#### 3.5.2 Apply Template to Deal

```
POST /api/deals/[dealId]/checklists/apply-template
```

**Authentication**: Required (admin, senior member)

**Request Body:**

```typescript
export const applyTemplateSchema = z.object({
  template_id: z.string().uuid(),
});
```

**Response:**

```typescript
export const applyTemplateResponseSchema = z.object({
  success: z.boolean(),
  checklists: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      completed: z.boolean(),
      order: z.number().int(),
    })
  ),
});
```

### 3.6 Dashboard API

#### 3.6.1 Get Dashboard Data

```
GET /api/dashboard
```

**Authentication**: Required (all roles)

**Response:**

```typescript
export const dashboardSchema = z.object({
  summary: z.object({
    total_deals: z.number().int(),
    active_deals: z.number().int(),
    completed_deals: z.number().int(),
    longlist_companies: z.number().int(),
  }),
  deals_by_phase: z.array(
    z.object({
      phase: z.string(),
      count: z.number().int(),
    })
  ),
  recent_activity: z.array(
    z.object({
      id: z.string().uuid(),
      deal_name: z.string(),
      action: z.string(),
      user: z.string(),
      timestamp: z.string().datetime(),
    })
  ),
  alerts: z.array(
    z.object({
      type: z.enum(["deadline", "stale_data", "missing_doc"]),
      message: z.string(),
      deal_id: z.string().uuid().nullable(),
    })
  ),
});
```

## 4. Server Actions

Server Actions はフォーム送信・状態更新に使用します。

### 4.1 Update Deal Phase

```typescript
// lib/actions/deals.ts
"use server";

import { revalidatePath } from "next/cache";
import { updateDealPhaseSchema } from "@/lib/schemas/deal";

export async function updateDealPhase(dealId: string, phase: string) {
  const validated = updateDealPhaseSchema.parse({ current_phase: phase });

  const supabase = await createServerClient();
  await supabase
    .from("deals")
    .update({ current_phase: validated.current_phase })
    .eq("id", dealId);

  revalidatePath("/deals");
}
```

### 4.2 Toggle Checklist Item

```typescript
// lib/actions/checklists.ts
"use server";

import { revalidatePath } from "next/cache";

export async function toggleChecklistItem(itemId: string, completed: boolean) {
  const supabase = await createServerClient();
  await supabase
    .from("deal_checklists")
    .update({ completed })
    .eq("id", itemId);

  revalidatePath("/deals/[id]");
}
```

### 4.3 Create Q&A Item

```typescript
// lib/actions/qa.ts
"use server";

import { revalidatePath } from "next/cache";
import { createQAItemSchema } from "@/lib/schemas/qa";

export async function createQAItem(dealId: string, formData: FormData) {
  const validated = createQAItemSchema.parse({
    question: formData.get("question"),
    dd_area: formData.get("dd_area"),
  });

  const supabase = await createServerClient();
  const { data } = await supabase
    .from("qa_items")
    .insert({
      deal_id: dealId,
      question: validated.question,
      dd_area: validated.dd_area,
      status: "draft",
    })
    .select()
    .single();

  revalidatePath(`/deals/${dealId}/qa`);
  return { success: true, data };
}
```

## 5. Error Handling Examples

### 5.1 API Route Error Handling

```typescript
// app/api/deals/route.ts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = listDealsQuerySchema.safeParse({
      phase: searchParams.get("phase"),
      page: searchParams.get("page"),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: parsed.error.format(),
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();
    const { data, error } = await supabase.from("deals").select("*");

    if (error) {
      return NextResponse.json(
        {
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to fetch deals",
          },
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ deals: data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        },
      },
      { status: 500 }
    );
  }
}
```

### 5.2 Server Action Error Handling

```typescript
export async function updateDealPhase(dealId: string, phase: string) {
  try {
    const validated = updateDealPhaseSchema.parse({ current_phase: phase });

    const supabase = await createServerClient();
    const { error } = await supabase
      .from("deals")
      .update({ current_phase: validated.current_phase })
      .eq("id", dealId);

    if (error) {
      throw new Error(`Failed to update deal: ${error.message}`);
    }

    revalidatePath("/deals");
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Invalid input",
          details: error.format(),
        },
      };
    }

    return {
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
}
```

## 6. Summary

DD Navigator の API 契約は以下の特徴を持ちます:

1. **型安全性**: すべてのエンドポイントに Zod スキーマを定義
2. **RESTful 設計**: リソース指向 URL、適切な HTTP メソッド・ステータスコード
3. **認証・認可**: Supabase Auth + RLS による多層防御
4. **エラーハンドリング**: 統一されたエラーレスポンス形式
5. **Server Actions**: フォーム送信・状態更新の最適化

クライアント側では、これらのスキーマを直接 import して型安全に API を呼び出すことができます。
