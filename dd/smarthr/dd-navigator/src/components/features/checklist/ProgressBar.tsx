import { createServerClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";

export async function ProgressBar({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const [{ count: total }, { count: completed }] = await Promise.all([
    supabase
      .from("deal_checklist_items")
      .select("*", { count: "exact", head: true })
      .eq("deal_id", dealId),
    supabase
      .from("deal_checklist_items")
      .select("*", { count: "exact", head: true })
      .eq("deal_id", dealId)
      .eq("completed", true),
  ]);

  const totalCount = total || 0;
  const completedCount = completed || 0;
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">進捗状況</span>
          <span className="text-sm font-semibold text-gray-900">
            {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {completedCount} / {totalCount} 項目完了
        </p>
      </CardContent>
    </Card>
  );
}
