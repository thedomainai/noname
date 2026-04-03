import { createServerClient } from "@/lib/supabase/server";
import { ChecklistItem } from "./ChecklistItem";

export async function ChecklistSection({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const { data: items } = await supabase
    .from("deal_checklist_items")
    .select("*")
    .eq("deal_id", dealId)
    .order("sort_order", { ascending: true });

  const groupedItems = items?.reduce((acc, item) => {
    const cat = item.category || "その他";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const totalItems = items?.length || 0;
  const completedItems = items?.filter((i) => i.completed).length || 0;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-4">
      {totalItems > 0 && (
        <div className="bg-white rounded-xl border border-gray-200/60 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">全体進捗</span>
            <span className="text-sm font-semibold text-gray-900">{completedItems}/{totalItems} 完了 ({progress}%)</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {groupedItems &&
        (Object.entries(groupedItems) as [string, NonNullable<typeof items>][]).map(([category, categoryItems]) => {
          const catCompleted = categoryItems.filter((i) => i.completed).length;
          return (
            <div key={category} className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">{category}</h3>
                <span className="text-xs text-gray-400">{catCompleted}/{categoryItems.length}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {categoryItems.map((item) => (
                  <ChecklistItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}

      {(!items || items.length === 0) && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <p className="text-sm text-gray-500">チェックリストがありません</p>
          <p className="text-xs text-gray-400 mt-1">テンプレートを選択して開始してください</p>
        </div>
      )}
    </div>
  );
}
