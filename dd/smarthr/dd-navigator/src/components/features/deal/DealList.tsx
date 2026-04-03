import { createServerClient } from "@/lib/supabase/server";
import { DealCard } from "./DealCard";

export async function DealList({ phase }: { phase?: string }) {
  const supabase = await createServerClient();

  let query = supabase.from("deals").select("*").order("updated_at", { ascending: false });

  if (phase) {
    query = query.eq("phase", phase);
  }

  const { data: deals } = await query;

  return (
    <div>
      {deals && deals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200/60">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-sm text-gray-500">案件がありません</p>
        </div>
      )}
    </div>
  );
}
