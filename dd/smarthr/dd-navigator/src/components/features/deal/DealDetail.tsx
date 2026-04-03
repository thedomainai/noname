import { createServerClient } from "@/lib/supabase/server";
import { PhaseBadge } from "./PhaseBadge";

export async function DealDetail({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const { data: deal } = await supabase
    .from("deals")
    .select("*")
    .eq("id", dealId)
    .single();

  if (!deal) {
    return (
      <div className="bg-white rounded-xl border border-gray-200/60 p-12 text-center">
        <p className="text-gray-500">案件が見つかりません</p>
      </div>
    );
  }

  const infoItems = [
    { label: "対象企業", value: deal.target_company, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { label: "業種", value: deal.industry, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" },
    { label: "クロージング予定日", value: deal.expected_closing_date ? new Date(deal.expected_closing_date).toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" }) : null, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "ステータス", value: deal.status === "active" ? "進行中" : deal.status === "completed" ? "完了" : deal.status, icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  ].filter(item => item.value);

  return (
    <div className="bg-white rounded-xl border border-gray-200/60">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{deal.name}</h2>
            {deal.target_company && (
              <p className="text-sm text-gray-500 mt-0.5">{deal.target_company}</p>
            )}
          </div>
          <PhaseBadge phase={deal.phase} />
        </div>
      </div>

      {/* Info Grid */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-2 gap-5">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {deal.description && (
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">概要</p>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {deal.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
