import { createServerClient } from "@/lib/supabase/server";
import { QAItem } from "./QAItem";

export async function QAList({
  dealId,
  category,
}: {
  dealId: string;
  category?: string;
}) {
  const supabase = await createServerClient();

  let query = supabase
    .from("deal_qa")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data: qaItems } = await query;

  const statusCounts = qaItems?.reduce((acc, qa) => {
    acc[qa.status] = (acc[qa.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="space-y-4">
      {qaItems && qaItems.length > 0 && (
        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-400">全 {qaItems.length} 件</span>
          {statusCounts.draft && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-600">下書き {statusCounts.draft}</span>
          )}
          {statusCounts.sent && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700">送信済 {statusCounts.sent}</span>
          )}
          {statusCounts.received && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">回答済 {statusCounts.received}</span>
          )}
          {statusCounts.clarification_needed && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700">要確認 {statusCounts.clarification_needed}</span>
          )}
        </div>
      )}

      {qaItems && qaItems.length > 0 ? (
        <div className="space-y-3">
          {qaItems.map((qa) => <QAItem key={qa.id} qa={qa} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-500">Q&A がありません</p>
          <p className="text-xs text-gray-400 mt-1">質問を追加してQ&Aプロセスを開始してください</p>
        </div>
      )}
    </div>
  );
}
