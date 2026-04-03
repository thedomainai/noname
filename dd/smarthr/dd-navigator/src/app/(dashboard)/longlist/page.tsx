import { CompanyList } from "@/components/features/longlist/CompanyList";

export default async function LonglistPage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; region?: string; fitScore?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ロングリスト</h1>
          <p className="text-sm text-gray-500 mt-1">買収候補企業のリサーチ・評価</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            CSV インポート
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            企業追加
          </button>
        </div>
      </div>

      <CompanyList
        industry={params.industry}
        region={params.region}
        fitScore={params.fitScore}
      />
    </div>
  );
}
