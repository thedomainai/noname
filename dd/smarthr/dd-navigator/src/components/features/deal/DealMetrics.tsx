import { createServerClient } from "@/lib/supabase/server";

export async function DealMetrics({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const [{ count: qaCount }, { count: docCount }, { count: findingCount }] =
    await Promise.all([
      supabase
        .from("deal_qa")
        .select("*", { count: "exact", head: true })
        .eq("deal_id", dealId),
      supabase
        .from("deal_documents")
        .select("*", { count: "exact", head: true })
        .eq("deal_id", dealId),
      supabase
        .from("deal_findings")
        .select("*", { count: "exact", head: true })
        .eq("deal_id", dealId),
    ]);

  const metrics = [
    {
      label: "Q&A",
      value: qaCount || 0,
      color: "text-blue-600",
      bg: "bg-blue-50",
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
      label: "資料",
      value: docCount || 0,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    },
    {
      label: "発見事項",
      value: findingCount || 0,
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200/60">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">進捗サマリー</h3>
      </div>
      <div className="p-5 space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 ${metric.bg} rounded-lg flex items-center justify-center`}>
              <svg className={`w-4.5 h-4.5 ${metric.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={metric.icon} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{metric.label}</p>
            </div>
            <span className="text-lg font-bold text-gray-900">{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
