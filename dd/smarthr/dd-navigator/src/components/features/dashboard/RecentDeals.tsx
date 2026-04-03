import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { PhaseBadge } from "../deal/PhaseBadge";

export async function RecentDeals() {
  const supabase = await createServerClient();

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(5);

  return (
    <div className="bg-white rounded-xl border border-gray-200/60">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">最近の更新</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {deals && deals.length > 0 ? (
          deals.map((deal: Record<string, unknown>) => {
            const updatedAt = new Date(deal.updated_at as string);
            const now = new Date();
            const diffDays = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
            const timeAgo = diffDays === 0 ? "今日" : diffDays === 1 ? "昨日" : `${diffDays}日前`;

            return (
              <Link
                key={deal.id as string}
                href={`/deals/${deal.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-indigo-600">
                      {(deal.target_company as string || deal.name as string).charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {deal.name as string}
                    </p>
                    <p className="text-xs text-gray-500">{deal.industry as string}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-gray-400">{timeAgo}</span>
                  <PhaseBadge phase={deal.phase as string} />
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">案件がありません</p>
        )}
      </div>
    </div>
  );
}
