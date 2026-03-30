# DD Navigator - System Architecture

## 1. Overview

DD Navigator は M&A デューデリジェンス業務を支援する Web アプリケーションです。Next.js 16 App Router をベースに、Supabase（認証・データベース・ストレージ）と Vercel（ホスティング）を活用したサーバーレスアーキテクチャで構築します。

## 2. Technology Stack

### Frontend

- **Next.js 16 App Router**: React Server Components を中心としたサーバーファースト設計
- **TypeScript**: strict モードで型安全性を担保
- **Tailwind CSS**: ユーティリティファーストの CSS フレームワーク
- **Zod**: ランタイムバリデーションとスキーマ駆動型開発

### Backend

- **Supabase Auth**: Magic Link 方式のパスワードレス認証
- **Supabase PostgreSQL**: リレーショナルデータベース（Row Level Security 対応）
- **Supabase Storage**: ファイルストレージ（PDF/Excel/PowerPoint）

### Infrastructure

- **Vercel**: デプロイ・ホスティング・Edge Functions
- **GitHub**: ソースコード管理・CI/CD 連携

### 選定理由

- **Next.js 16 App Router**: Server Components により初回ロード高速化、SEO 最適化。App Router は安定版であり、データフェッチと認証の統合がシンプル
- **Supabase**: PostgreSQL ベースで RLS による行レベルアクセス制御が可能。チーム単位のデータ分離を実現
- **Vercel**: Next.js の公式ホスティングプラットフォームで、GitHub 連携による自動デプロイが容易
- **TypeScript strict + Zod**: 型安全性とランタイムバリデーションを両立し、API 境界での入力検証を確実に実行

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Next.js App (Client Components)            │    │
│  │  - フォーム入力                                      │    │
│  │  - インタラクティブ UI                               │    │
│  │  - クライアント側状態管理                             │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌────────────────────────────────────────────────────┐    │
│  │   Next.js 16 App Router (Server Components)       │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  UI Layer (Server Components)           │     │    │
│  │  │  - ダッシュボード                         │     │    │
│  │  │  - 案件一覧                               │     │    │
│  │  │  - Q&A 管理                              │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Business Logic Layer                   │     │    │
│  │  │  - Server Actions（フォーム送信）        │     │    │
│  │  │  - API Routes（外部公開 API）            │     │    │
│  │  │  - Zod バリデーション                     │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │  Data Access Layer                      │     │    │
│  │  │  - Supabase Client                      │     │    │
│  │  │  - RLS ポリシー適用                       │     │    │
│  │  └──────────────────────────────────────────┘     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ PostgreSQL Protocol
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Supabase                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │  PostgreSQL Database (Tokyo Region)               │    │
│  │  - teams, team_members                            │    │
│  │  - deals, deal_phases                             │    │
│  │  - longlist_companies                             │    │
│  │  - qa_items, documents                            │    │
│  │  - findings, checklists                           │    │
│  │  - Row Level Security (RLS) ポリシー              │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Auth Service                                     │    │
│  │  - Magic Link 認証                                │    │
│  │  - セッション管理                                  │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Storage Service                                  │    │
│  │  - PDF/Excel/PowerPoint                           │    │
│  │  - チーム別バケット                                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 4. Layer Design

### UI Layer (React Components)

**責務**

- ユーザーインターフェースのレンダリング
- ユーザーイベントのハンドリング
- ビジネスロジックの呼び出し（自身では実装しない）

**設計原則**

- Server Components をデフォルトとする。インタラクションが必要な部分だけ Client Components にする
- `"use client"` は必要最小限のコンポーネントにのみ付ける
- Server Components で直接データフェッチする（API Route を経由しない）
- コンポーネントにビジネスロジックを書かない（Server Actions に切り出す）

**実装例**

```typescript
// app/(dashboard)/deals/page.tsx (Server Component)
export default async function DealsPage() {
  const supabase = await createServerClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*, deal_phases(*)")
    .order("created_at", { ascending: false });

  return <DealsList deals={deals} />;
}
```

### Business Logic Layer (Server Actions + API Routes)

**責務**

- データの加工・変換
- バリデーション（Zod）
- ビジネスルールの実装
- データベースアクセスの調整

**設計原則**

- フォーム送信・RPC スタイルの操作には Server Actions を使用
- 外部公開が必要な API エンドポイントには Route Handlers を使用
- すべての入力を Zod schema で検証
- エラーハンドリングは標準形式に従う

**実装例**

```typescript
// app/actions/deals.ts
"use server";

import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const createDealSchema = z.object({
  name: z.string().min(1, "案件名は必須です").max(200),
  target_company: z.string().min(1, "対象企業名は必須です"),
  expected_closing: z.string().datetime(),
  team_id: z.string().uuid(),
});

export async function createDeal(formData: FormData) {
  const parsed = createDealSchema.safeParse({
    name: formData.get("name"),
    target_company: formData.get("target_company"),
    expected_closing: formData.get("expected_closing"),
    team_id: formData.get("team_id"),
  });

  if (!parsed.success) {
    return { error: { code: "VALIDATION_ERROR", details: parsed.error.format() } };
  }

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("deals")
    .insert(parsed.data)
    .select()
    .single();

  if (error) {
    return { error: { code: "DB_ERROR", message: error.message } };
  }

  revalidatePath("/deals");
  return { success: true, data };
}
```

### Data Access Layer (Supabase Client)

**責務**

- データベースアクセス
- ストレージアクセス
- 認証状態の取得
- RLS ポリシーの適用

**設計原則**

- Server Components では `createServerClient()` を使用
- Client Components では `createBrowserClient()` を使用
- すべてのクエリで RLS ポリシーが自動適用される
- レスポンスの型を Zod でパース（ランタイム検証）

**実装例**

```typescript
// lib/supabase/server.ts
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
```

## 5. Authentication Flow

### Magic Link 認証フロー

```
1. ユーザーがメールアドレスを入力
   ↓
2. Server Action が supabase.auth.signInWithOtp() を呼び出し
   ↓
3. Supabase がマジックリンク付きメールを送信
   ↓
4. ユーザーがリンクをクリック
   ↓
5. /api/auth/callback?code=xxx にリダイレクト
   ↓
6. コールバック Route Handler が code を検証してセッション確立
   ↓
7. ダッシュボード (/) にリダイレクト
```

### セッション管理

- **Cookie ベースセッション**: HttpOnly Cookie にトークンを保存
- **自動リフレッシュ**: Supabase が内部でトークンリフレッシュを自動実行
- **有効期限**: アクセストークン 1時間、リフレッシュトークン 30日

### Middleware による認証チェック

```typescript
// middleware.ts
import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証不要パスを先に除外
  if (pathname.startsWith("/api/auth") || pathname === "/login") {
    return NextResponse.next();
  }

  const supabase = await createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
```

## 6. State Management Strategy

### Server State (データベース由来のデータ)

**戦略**: Server Components で直接取得、Props で渡す

```typescript
// Server Component でデータ取得
export default async function DealsPage() {
  const supabase = await createServerClient();
  const { data: deals } = await supabase.from("deals").select("*");
  return <DealsList deals={deals} />;
}
```

### URL State (検索条件・ページング等)

**戦略**: searchParams で管理、ブックマーク可能な状態

```typescript
// app/deals/page.tsx
export default async function DealsPage({
  searchParams,
}: {
  searchParams: { phase?: string; page?: string };
}) {
  const phase = searchParams.phase ?? "all";
  const page = Number(searchParams.page ?? "1");

  const supabase = await createServerClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .eq(phase !== "all" ? "current_phase" : "id", phase !== "all" ? phase : deals?.id)
    .range((page - 1) * 20, page * 20 - 1);

  return <DealsList deals={deals} currentPhase={phase} />;
}
```

### Client State (UI の一時的な状態)

**戦略**: useState / useReducer を基本とする。グローバル状態管理ライブラリは必要最小限

```typescript
"use client";

export function QAForm() {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ...
}
```

## 7. Security Architecture

### Row Level Security (RLS)

**原則**: すべてのテーブルで RLS を有効化し、チーム単位でデータを分離

```sql
-- teams テーブル: 自分が所属するチームのみ閲覧可能
CREATE POLICY "team_members_select_own_team"
ON teams FOR SELECT
USING (
  id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);

-- deals テーブル: 自分のチームの案件のみアクセス可能
CREATE POLICY "team_members_select_team_deals"
ON deals FOR SELECT
USING (
  team_id IN (
    SELECT team_id FROM team_members WHERE user_id = auth.uid()
  )
);
```

### アクセス制御レイヤー

```
Browser
  ↓
Middleware (未認証チェック)
  ↓
Server Component / Server Action (セッション取得)
  ↓
Supabase Client (RLS 自動適用)
  ↓
PostgreSQL (行レベルフィルタリング)
```

### ファイルストレージのアクセス制御

**Supabase Storage ポリシー**

```sql
-- バケットポリシー: チームメンバーのみアップロード可能
CREATE POLICY "team_members_upload_files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT team_id::text FROM team_members WHERE user_id = auth.uid()
  )
);

-- チームメンバーのみダウンロード可能
CREATE POLICY "team_members_download_files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT team_id::text FROM team_members WHERE user_id = auth.uid()
  )
);
```

## 8. Deployment Architecture

### Vercel + GitHub 連携

```
GitHub Repository (main branch)
  ↓ push
Vercel (自動デプロイ)
  ↓ ビルド
Next.js アプリケーション
  ↓ デプロイ
Vercel Edge Network (グローバル CDN)
```

### 環境変数管理

**Vercel 環境変数**

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase プロジェクト URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase 匿名キー（クライアント側）
- `SUPABASE_SERVICE_ROLE_KEY`: サービスロールキー（サーバー側のみ）

**ローカル開発**

- `.env.local` ファイルで管理
- `.env.example` をリポジトリに含める（機密情報なしのテンプレート）

### Vercel 設定

```json
{
  "framework": "nextjs",
  "rootDirectory": ".",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

## 9. Performance Optimization

### Server Components 優先

- 初回ロードで HTML を生成し、JavaScript バンドルサイズを削減
- データフェッチをサーバー側で完結させ、クライアント側の API 呼び出しを削減

### Dynamic Import

重いコンポーネント（グラフライブラリ等）は遅延ロード

```typescript
import dynamic from "next/dynamic";

const ProjectionChart = dynamic(() => import("@/components/features/projections/ProjectionChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

### Image Optimization

```typescript
import Image from "next/image";

<Image
  src="/logo.png"
  alt="DD Navigator"
  width={200}
  height={50}
  priority
/>
```

### Caching Strategy

**Server Components のデフォルトキャッシュ**

```typescript
// デフォルト: force-cache（静的生成）
const data = await fetch("https://api.example.com/data");

// リクエストごとに再取得
const data = await fetch("https://api.example.com/data", {
  cache: "no-store",
});

// 60秒ごとに再検証（ISR）
const data = await fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});
```

### Database インデックス

頻繁に検索するカラムにインデックスを作成

```sql
-- deals テーブル: team_id, current_phase でフィルタリングが多い
CREATE INDEX idx_deals_team_id ON deals(team_id);
CREATE INDEX idx_deals_current_phase ON deals(current_phase);

-- qa_items テーブル: deal_id でフィルタリング、full-text search
CREATE INDEX idx_qa_items_deal_id ON qa_items(deal_id);
CREATE INDEX idx_qa_items_question_text ON qa_items USING gin(to_tsvector('japanese', question));
```

## 10. Error Handling Strategy

### 標準エラーレスポンス形式

```typescript
type ErrorResponse = {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
};

// 使用例
return NextResponse.json(
  {
    error: {
      code: "VALIDATION_ERROR",
      message: "Invalid input data",
      details: validation.error.issues,
    },
  },
  { status: 400 }
);
```

### Server Action エラーハンドリング

```typescript
export async function createDeal(formData: FormData) {
  try {
    const parsed = createDealSchema.safeParse(data);
    if (!parsed.success) {
      return { error: { code: "VALIDATION_ERROR", details: parsed.error.format() } };
    }

    const { data, error } = await supabase.from("deals").insert(parsed.data);
    if (error) {
      return { error: { code: "DB_ERROR", message: error.message } };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: { code: "INTERNAL_ERROR", message: "An unexpected error occurred" } };
  }
}
```

## 11. Monitoring & Observability

### Vercel Analytics

- ページビュー、ユニークユーザー数
- Core Web Vitals (LCP, FID, CLS)
- エラー率

### Supabase Logs

- データベースクエリのパフォーマンス
- RLS ポリシーの適用状況
- 認証エラーログ

### 将来の拡張

- Sentry による エラートラッキング
- LogRocket による セッションリプレイ

## 12. Migration & Rollback Strategy

### データベースマイグレーション

**Supabase CLI による管理**

```bash
# 新しいマイグレーションファイルを生成
supabase migration new add_deal_phases_table

# マイグレーション実行
supabase db push

# ロールバック（手動で逆操作の SQL を実行）
supabase db reset
```

### デプロイロールバック

**Vercel Deployments**

- 各デプロイは immutable（変更不可）
- 問題が発生した場合、Vercel Dashboard から前のデプロイに即座にロールバック可能
- ロールバックは DNS 切り替えのみで完了（ビルド不要）

## 13. Scalability Considerations

### 初期想定

- 同時接続ユーザー数: 50名
- プロジェクト数: 100件/チーム
- Q&A数: 1,000件/プロジェクト
- ファイルストレージ: 5GB/チーム

### スケーリング戦略

**水平スケーリング**

- Vercel は自動でグローバル CDN にデプロイ
- Supabase は接続プーリングで同時接続数を最適化

**垂直スケーリング**

- Supabase プランアップグレード（Starter → Pro → Team）
- データベースインスタンスサイズの拡大

**ボトルネック対策**

- Q&A 重複チェックのアルゴリズム最適化（PostgreSQL full-text search + trigram 類似度）
- ファイル一覧取得の Pagination 実装（20件/ページ）

## 14. Future Architecture Extensions

### Phase 2: LLM/AI 機能統合

```
Next.js App Router
  ↓
OpenAI API / Claude API
  ↓
資料の要約生成、Q&A 自動ドラフト、事業計画異常値検出
```

### Phase 3: VDR 統合

```
Next.js App Router
  ↓
Intralinks API / Datasite API
  ↓
VDR 内資料の自動同期、更新通知
```

### Phase 4: 外部アドバイザー連携

- ゲストユーザー機能（制限付きアクセス）
- 外部アドバイザー向け専用ビュー（機密情報のマスキング）

## 15. Development Guidelines

### コーディング規約

- TypeScript strict mode 必須
- Zod schema で全入力を検証
- Server Components をデフォルトとし、Client Components は最小限
- Feature-based コロケーション（関連ファイルを近くに配置）

### テスト戦略

- Unit Tests: Vitest
- Integration Tests: Playwright
- E2E Tests: Playwright（主要フロー）

### CI/CD パイプライン

```
GitHub Pull Request
  ↓
Vercel Preview Deployment（自動）
  ↓
レビュー・承認
  ↓
main branch マージ
  ↓
Vercel Production Deployment（自動）
```

## 16. Risk Mitigation

### リスク1: Supabase 障害

**対策**: 日次バックアップ、30日間保持。障害時は Supabase Dashboard から復元

### リスク2: ファイルアップロード時のパフォーマンス低下

**対策**: ファイルサイズ上限 10MB/ファイル、バッチアップロード機能

### リスク3: Q&A 重複チェックの精度低下

**対策**: PostgreSQL full-text search + trigram 類似度。ユーザーフィードバックで改善

### リスク4: 大量データでの検索パフォーマンス低下

**対策**: インデックス設計、Pagination 実装、適切な RLS ポリシー
