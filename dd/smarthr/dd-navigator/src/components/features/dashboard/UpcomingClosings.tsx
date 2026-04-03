import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";

export async function UpcomingClosings() {
  const supabase = await createServerClient();

  const today = new Date().toISOString().split("T")[0];

  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .gte("expected_closing_date", today)
    .order("expected_closing_date", { ascending: true })
    .limit(5);

  return (
    <div className="bg-white rounded-xl border border-gray-200/60">
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">クロージング予定</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {deals && deals.length > 0 ? (
          deals.map((deal: Record<string, unknown>) => {
            const closingDate = new Date(deal.expected_closing_date as string);
            const now = new Date();
            const diffDays = Math.ceil((closingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            const isUrgent = diffDays <= 90;

            return (
              <Link
                key={deal.id as string}
                href={`/deals/${deal.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {deal.name as string}
                  </p>
                  <p className="text-xs text-gray-500">{deal.target_company as string}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {closingDate.toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
                    </p>
                    <p className={`text-xs ${isUrgent ? "text-amber-600 font-medium" : "text-gray-400"}`}>
                      {diffDays}日後
                    </p>
                  </div>
                  {isUrgent && (
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 text-center py-8 text-sm">
            クロージング予定の案件がありません
          </p>
        )}
      </div>
    </div>
  );
}
