# Code Review

**Status**: NEEDS_REVISION
**Reviewed at**: 2026-03-30
**Reviewer**: Claude Code (Reviewer Agent)

## Summary

- Total files reviewed: 30
- Critical issues: 2
- Warnings: 7
- Suggestions: 8

## Good Points

- TypeScript strict mode が有効化されており、型安全性が担保されている
- Zod によるバリデーションが一貫して実装されている（schemas/deal.ts, schemas/qa.ts）
- Server Components をデフォルトとし、Client Components は必要最小限に限定している
- 設計書との整合性が高く、アーキテクチャ原則に従って実装されている
- エラーハンドリングが標準形式に統一されている（error.code, error.message）
- RLS ポリシーが適切に実装されており、チーム単位のデータ分離が実現されている
- Foreign Key にインデックスが設定されており、JOIN パフォーマンスが考慮されている
- 論理削除（deleted_at）が一貫して実装されている
- middleware.ts で認証不要パス（/api/auth, /login）が適切に除外されている
- Button コンポーネントが forwardRef で実装されており、DOM ref の伝播が正しく動作する

## Issues

### Critical

**1. check-duplicate APIに認証チェックが欠落している**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/app/api/deals/[id]/qa/check-duplicate/route.ts`
- **問題**: `POST` ハンドラーに認証チェック（`supabase.auth.getUser()`）がない
- **影響**: 未認証ユーザーが重複チェックAPIを呼び出せる可能性がある
- **修正方法**: 他のAPI Route（`route.ts`）と同様に、以下を追加する

```typescript
const supabase = await createServerClient();
const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return NextResponse.json(
    { error: { code: "UNAUTHORIZED", message: "認証が必要です" } },
    { status: 401 }
  );
}
```

**2. QAForm.tsx の useState が副作用に誤用されている**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/QAForm.tsx` (21-29行目)
- **問題**: `useState(() => { ... })` が副作用の実行に使われている。`useState` の引数は初期値を返す関数であり、副作用は実行されない
- **影響**: 重複チェックが一度も実行されず、DuplicateWarning が表示されない
- **修正方法**: `useEffect` を使用する

```typescript
useEffect(() => {
  if (debouncedQuestion.length > 10) {
    fetch(`/api/deals/${dealId}/qa/check-duplicate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: debouncedQuestion }),
    })
      .then((res) => res.json())
      .then((data) => setDuplicates(data.duplicates || []));
  } else {
    setDuplicates([]);
  }
}, [debouncedQuestion, dealId]);
```

### Warning

**3. tsconfig.json に .next/dev/types が含まれている**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/tsconfig.json` (32行目)
- **問題**: `.next/dev/types/**/*.ts` が include に含まれていると、Turbopack dev モードで CPU 暴走・メモリリークの無限ループが発生する可能性がある
- **参照**: `~/.claude/rules/nextjs-config.md` の「tsconfig.json の include に .next/dev/types を含めない」
- **修正方法**: 削除する

```json
"include": [
  "next-env.d.ts",
  "**/*.ts",
  "**/*.tsx",
  ".next/types/**/*.ts"
]
```

**4. DealForm.tsx のエラーハンドリングが不完全**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/deal/DealForm.tsx` (28-44行目)
- **問題**: `response.ok` のチェックはあるが、エラー時に具体的なフィードバックがない（console.error のみ）
- **修正方法**: ユーザーにエラーを表示する（toast 通知等）

**5. DuplicateWarning.tsx の型定義が不正確**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/DuplicateWarning.tsx` (1行目)
- **問題**: `duplicates: string[]` と定義されているが、実際の構造は `{ id, question, similarity_score, status }[]` のはず
- **修正方法**: Zod スキーマから型を導入する

```typescript
import type { CheckDuplicateQAResponse } from "@/lib/schemas/qa";

export function DuplicateWarning({
  duplicates
}: {
  duplicates: CheckDuplicateQAResponse["duplicates"]
}) {
  // ...
}
```

**6. DocumentUpload.tsx のエラーハンドリングが不完全**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/document/DocumentUpload.tsx` (20-35行目)
- **問題**: DealForm と同様にエラーハンドリングが console.error のみ

**7. duplicate-detection.ts の型キャストが不安全**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/lib/services/duplicate-detection.ts` (28行目)
- **問題**: `(data as SimilarQuestion[])` と型キャストしているが、実際のレスポンス構造を検証していない
- **修正方法**: Zod でパースする

```typescript
const similarQuestionsSchema = z.array(
  z.object({
    id: z.string().uuid(),
    question: z.string(),
    similarity_score: z.number(),
    status: z.string(),
  })
);

// ...
if (error) {
  console.error("Error detecting duplicates:", error);
  return [];
}

return similarQuestionsSchema.parse(data || []);
```

**8. storage-quota.ts の型キャストが不安全**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/lib/services/storage-quota.ts` (9-20行目)
- **問題**: `team` の型が implicit any になっている可能性がある。Zod でパースすべき

**9. SQL マイグレーションのトランザクション管理が不明**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/supabase/migrations/`
- **問題**: 複数のマイグレーションファイルが存在するが、トランザクション境界が不明（部分的失敗時のロールバック戦略）
- **推奨**: Supabase CLI のマイグレーション実行がトランザクション単位で動作することを確認し、ドキュメント化する

### Suggestions

**10. middleware.ts の supabaseResponse が未使用**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/middleware.ts` (12行目)
- **問題**: `supabaseResponse` が取得されているが使用されていない
- **推奨**: 使用しない場合は `const { session } = ...` のように destructure する

**11. deal.ts の updateDealPhase に notes パラメータが未使用**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/lib/actions/deal.ts` (79行目)
- **問題**: スキーマに `notes` が定義されているが、実装で使用されていない
- **推奨**: notes を deal_phases に保存するか、スキーマから削除する

**12. qa.ts の重複チェック結果が呼び出し元に返っていない**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/lib/actions/qa.ts` (71行目)
- **問題**: `duplicates` を返しているが、Client Component 側で受け取る実装が不明
- **推奨**: Server Action の戻り値を Client Component で適切にハンドリングする

**13. QAForm.tsx の API エンドポイントが不一致**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/QAForm.tsx` (36行目)
- **問題**: `/api/qa` にPOSTしているが、実際のエンドポイントは `/api/deals/[id]/qa` のはず
- **修正方法**: 正しいエンドポイントに修正する

```typescript
const response = await fetch(`/api/deals/${dealId}/qa`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ category, question }),
});
```

**14. useDebounce フックの実装が不明**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/QAForm.tsx` (9行目)
- **問題**: `useDebounce` が import されているが、実装ファイルが不明
- **推奨**: `/src/lib/hooks/useDebounce.ts` に実装があることを確認する

**15. Button コンポーネントの displayName 設定が欠落している（一部）**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/src/components/ui/button.tsx` (40行目)
- **良好**: `Button.displayName = "Button"` が設定されている
- **推奨**: 他の forwardRef コンポーネントでも同様に設定する

**16. RLS ポリシーの EXISTS サブクエリがパフォーマンス懸念**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/supabase/migrations/20260330000004_enable_rls.sql`
- **問題**: `qa_items` / `documents` / `findings` の RLS ポリシーが JOIN を含む EXISTS サブクエリを使用している
- **影響**: 大量データ時にパフォーマンス低下の可能性
- **推奨**: インデックスが適切に設定されていることを確認し、必要に応じて EXPLAIN ANALYZE でクエリプランを検証する

**17. next.config.ts に serverExternalPackages が未設定**

- **ファイル**: `/Users/yuta/workspace/projects/noname/dd-navigator/next.config.ts`
- **問題**: ネイティブモジュール（better-sqlite3 等）を使用する場合、`serverExternalPackages` の設定が必要
- **現状**: better-sqlite3 の使用は確認されていないため、現時点では問題なし
- **推奨**: 将来的にネイティブモジュールを導入する場合は設定する

## File-by-File Comments

### /Users/yuta/workspace/projects/noname/dd-navigator/tsconfig.json

- Line 32: `.next/dev/types/**/*.ts` を削除する（CPU暴走の原因）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/app/api/deals/[id]/qa/check-duplicate/route.ts

- Line 5-10: 認証チェックを追加する（Critical Issue 1）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/QAForm.tsx

- Line 21-29: `useState` を `useEffect` に変更する（Critical Issue 2）
- Line 36: API エンドポイントを `/api/deals/${dealId}/qa` に修正する（Suggestion 13）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/qa/DuplicateWarning.tsx

- Line 1: 型定義を修正する（Warning 5）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/components/features/deal/DealForm.tsx

- Line 28-44: エラーハンドリングを改善する（Warning 4）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/lib/services/duplicate-detection.ts

- Line 28: 型キャストを Zod パースに変更する（Warning 7）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/lib/services/storage-quota.ts

- Line 9-20: Zod でレスポンスをパースする（Warning 8）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/lib/actions/deal.ts

- Line 79: notes パラメータを実装に反映するか、スキーマから削除する（Suggestion 11）

### /Users/yuta/workspace/projects/noname/dd-navigator/src/middleware.ts

- Line 12: 未使用の `supabaseResponse` を削除する（Suggestion 10）

## Action Required

### 最優先（Critical Issues）

1. **check-duplicate API に認証チェックを追加する**
   - `/src/app/api/deals/[id]/qa/check-duplicate/route.ts` の POST ハンドラーに `supabase.auth.getUser()` を追加
   - 未認証の場合は 401 を返す

2. **QAForm.tsx の副作用実行を修正する**
   - `useState(() => { ... })` を `useEffect(() => { ... }, [debouncedQuestion, dealId])` に変更
   - 重複チェックが正しく動作するようにする

### 高優先（Warnings）

3. **tsconfig.json から `.next/dev/types` を削除する**
   - Turbopack の無限ループを防ぐ

4. **エラーハンドリングを改善する**
   - DealForm.tsx と DocumentUpload.tsx にユーザー向けエラー表示を追加（toast 通知等）

5. **型安全性を強化する**
   - DuplicateWarning.tsx の型定義を修正
   - duplicate-detection.ts と storage-quota.ts で Zod パースを使用

### 中優先（Suggestions）

6. **QAForm.tsx の API エンドポイントを修正する**
   - `/api/qa` → `/api/deals/${dealId}/qa` に変更

7. **useDebounce フックの存在を確認する**
   - `/src/lib/hooks/useDebounce.ts` が実装されていることを確認

8. **未使用変数・パラメータを整理する**
   - middleware.ts の supabaseResponse
   - deal.ts の notes パラメータ

## Testing Recommendations

- **認証テスト**: 未認証ユーザーが protected API にアクセスできないことを確認
- **重複チェックテスト**: QAForm で類似質問が検出されることを確認
- **エラーハンドリングテスト**: API エラー時にユーザーに適切なフィードバックが表示されることを確認
- **RLS ポリシーテスト**: チーム間でデータが分離されていることを確認
- **パフォーマンステスト**: 大量データ時の RLS ポリシーのクエリパフォーマンスを検証

## Conclusion

実装の品質は全体的に高く、設計書との整合性も保たれています。ただし、以下の2つの Critical Issues は早急に修正が必要です。

1. check-duplicate API の認証チェック欠落（セキュリティリスク）
2. QAForm.tsx の重複チェック機能の不動作（機能不全）

これらを修正後、Warnings と Suggestions の対応を進めることで、本番環境へのデプロイが可能になります。
