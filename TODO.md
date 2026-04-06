# TODO

## dd-navigator 依存関係 minor/major アップデート（要手動確認）

| パッケージ | current | latest | 種別 |
|---|---|---|---|
| @hookform/resolvers | 4.1.3 | 5.2.2 | major |
| @supabase/ssr | 0.6.1 | 0.9.0 | minor |
| @types/node | 22.19.15 | 25.5.0 | major |
| @vitejs/plugin-react | 4.7.0 | 6.0.1 | major |
| @vitest/coverage-v8 | 3.2.4 | 4.1.2 | major |
| tailwind-merge | 2.6.1 | 3.5.0 | major |
| typescript | 5.9.3 | 6.0.2 | major |

破壊的変更を含む可能性があるため、手動でアップグレードガイドを確認してから適用する。

## dd-navigator 未対応事項（MEMORY.md より）

- Supabase マイグレーション実行（`20260330000006`〜`20260330000007`）
- `.env.local` 設定
- `team_members` に name/email 列がないため assignee が UUID 表示
- `src/middleware.ts` → `proxy.ts` リネーム（Next.js 16 非推奨警告）
