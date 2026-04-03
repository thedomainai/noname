/**
 * Mock Supabase Client
 *
 * 実際の Supabase 接続なしで Server Components をレンダリングするためのモッククライアント。
 * チェーン可能なクエリビルダーを模倣し、モックデータを返す。
 *
 * 使い方:
 *   1. src/lib/supabase/server.ts の createServerClient を差し替える
 *   2. または E2E テスト時に NEXT_PUBLIC_USE_MOCKS=true を設定する
 */

import {
  mockDeals,
  mockQAItems,
  mockFindings,
  mockDocuments,
  mockChecklistItems,
  mockCompanies,
  mockUser,
  mockSession,
} from "./data";

type MockRecord = Record<string, unknown>;

// テーブル名 → モックデータのマッピング
const TABLE_DATA: Record<string, MockRecord[]> = {
  deals: mockDeals as unknown as MockRecord[],
  deal_qa: mockQAItems as unknown as MockRecord[],
  deal_findings: mockFindings as unknown as MockRecord[],
  deal_documents: mockDocuments as unknown as MockRecord[],
  deal_checklist_items: mockChecklistItems as unknown as MockRecord[],
  longlist_companies: mockCompanies as unknown as MockRecord[],
};

// ── Query Builder ───────────────────────────
interface SelectOptions {
  count?: "exact" | "planned" | "estimated";
  head?: boolean;
}

class MockQueryBuilder {
  private data: MockRecord[];
  private filters: Array<(item: MockRecord) => boolean> = [];
  private orderKey: string | null = null;
  private orderAscending = true;
  private limitCount: number | null = null;
  private singleMode = false;
  private countOnly = false;

  constructor(tableName: string, options?: SelectOptions) {
    this.data = [...(TABLE_DATA[tableName] || [])];
    if (options?.head && options?.count) {
      this.countOnly = true;
    }
  }

  eq(column: string, value: unknown): this {
    this.filters.push((item) => item[column] === value);
    return this;
  }

  neq(column: string, value: unknown): this {
    this.filters.push((item) => item[column] !== value);
    return this;
  }

  gt(column: string, value: unknown): this {
    this.filters.push((item) => (item[column] as number) > (value as number));
    return this;
  }

  gte(column: string, value: unknown): this {
    this.filters.push((item) => (item[column] as number) >= (value as number));
    return this;
  }

  lt(column: string, value: unknown): this {
    this.filters.push((item) => (item[column] as number) < (value as number));
    return this;
  }

  lte(column: string, value: unknown): this {
    this.filters.push((item) => (item[column] as number) <= (value as number));
    return this;
  }

  is(column: string, value: unknown): this {
    this.filters.push((item) => item[column] === value);
    return this;
  }

  in(column: string, values: unknown[]): this {
    this.filters.push((item) => values.includes(item[column]));
    return this;
  }

  like(column: string, pattern: string): this {
    const regex = new RegExp(pattern.replace(/%/g, ".*"), "i");
    this.filters.push((item) => regex.test(String(item[column] || "")));
    return this;
  }

  ilike(column: string, pattern: string): this {
    return this.like(column, pattern);
  }

  order(column: string, options?: { ascending?: boolean }): this {
    this.orderKey = column;
    this.orderAscending = options?.ascending ?? true;
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  single(): this {
    this.singleMode = true;
    return this;
  }

  // Promise-like: then() で結果を返す（await 対応）
  then<TResult>(
    resolve: (value: {
      data: MockRecord | MockRecord[] | null;
      error: null;
      count: number | null;
    }) => TResult
  ): TResult {
    let result = this.data;

    // フィルタ適用
    for (const filter of this.filters) {
      result = result.filter(filter);
    }

    // ソート
    if (this.orderKey) {
      const key = this.orderKey;
      const asc = this.orderAscending;
      result.sort((a, b) => {
        const va = a[key];
        const vb = b[key];
        if (va == null && vb == null) return 0;
        if (va == null) return asc ? 1 : -1;
        if (vb == null) return asc ? -1 : 1;
        if (va < vb) return asc ? -1 : 1;
        if (va > vb) return asc ? 1 : -1;
        return 0;
      });
    }

    // count only
    if (this.countOnly) {
      return resolve({ data: null, error: null, count: result.length });
    }

    // limit
    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    // single
    if (this.singleMode) {
      return resolve({
        data: result[0] || null,
        error: null,
        count: null,
      });
    }

    return resolve({ data: result, error: null, count: result.length });
  }
}

// ── Mock Supabase Client ────────────────────
export function createMockSupabaseClient() {
  return {
    from(tableName: string) {
      return {
        select(columns?: string, options?: SelectOptions) {
          return new MockQueryBuilder(tableName, options);
        },
        insert(data: MockRecord | MockRecord[]) {
          return Promise.resolve({ data, error: null });
        },
        update(data: MockRecord) {
          return {
            eq(column: string, value: unknown) {
              return Promise.resolve({ data, error: null });
            },
            match(criteria: Record<string, unknown>) {
              return Promise.resolve({ data, error: null });
            },
          };
        },
        delete() {
          return {
            eq(column: string, value: unknown) {
              return Promise.resolve({ data: null, error: null });
            },
          };
        },
        upsert(data: MockRecord | MockRecord[]) {
          return Promise.resolve({ data, error: null });
        },
      };
    },

    auth: {
      getUser() {
        return Promise.resolve({
          data: { user: mockUser },
          error: null,
        });
      },
      getSession() {
        return Promise.resolve({
          data: { session: mockSession },
          error: null,
        });
      },
      signOut() {
        return Promise.resolve({ error: null });
      },
      signInWithOtp(params: { email: string; options?: Record<string, unknown> }) {
        return Promise.resolve({ data: {}, error: null });
      },
      exchangeCodeForSession(code: string) {
        return Promise.resolve({
          data: { session: mockSession },
          error: null,
        });
      },
      onAuthStateChange(callback: (event: string, session: unknown) => void) {
        return {
          data: {
            subscription: {
              unsubscribe: () => {},
            },
          },
        };
      },
    },

    storage: {
      from(bucket: string) {
        return {
          upload(path: string, file: unknown) {
            return Promise.resolve({ data: { path }, error: null });
          },
          getPublicUrl(path: string) {
            return {
              data: { publicUrl: `https://placeholder.supabase.co/storage/v1/object/public/${bucket}/${path}` },
            };
          },
          download(path: string) {
            return Promise.resolve({ data: new Blob(), error: null });
          },
          remove(paths: string[]) {
            return Promise.resolve({ data: paths, error: null });
          },
        };
      },
    },
  };
}
