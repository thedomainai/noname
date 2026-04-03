import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";

const pipelinePhases = [
  { key: "sourcing", label: "ソーシング", color: "bg-slate-400" },
  { key: "nda", label: "NDA", color: "bg-blue-400" },
  { key: "loi", label: "LOI", color: "bg-indigo-500" },
  { key: "dd", label: "DD", color: "bg-violet-500" },
  { key: "completed", label: "完了", color: "bg-emerald-500" },
];

export async function PipelineView() {
  const supabase = await createServerClient();
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("updated_at", { ascending: false });

  const grouped = pipelinePhases.map((phase) => ({
    ...phase,
    deals: (deals || []).filter((d: Record<string, unknown>) => d.phase === phase.key),
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900">パイプライン</h2>
          <p className="text-xs text-gray-500 mt-0.5">フェーズ別の案件分布</p>
        </div>
        <Link
          href="/deals"
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
        >
          すべて表示
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {grouped.map((phase) => (
          <div key={phase.key}>
            {/* Phase Header */}
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${phase.color}`}></div>
              <span className="text-xs font-medium text-gray-600">{phase.label}</span>
              <span className="text-xs text-gray-400 ml-auto">{phase.deals.length}</span>
            </div>

            {/* Deal Cards */}
            <div className="space-y-2 min-h-[100px]">
              {phase.deals.map((deal: Record<string, unknown>) => (
                <Link
                  key={deal.id as string}
                  href={`/deals/${deal.id}`}
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200"
                >
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {deal.target_company as string || deal.name as string}
                  </p>
                  <p className="text-xs text-gray-500">{deal.industry as string}</p>
                </Link>
              ))}
              {phase.deals.length === 0 && (
                <div className="h-[80px] border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-300">-</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
