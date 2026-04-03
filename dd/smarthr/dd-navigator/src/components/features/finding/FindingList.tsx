import { createServerClient } from "@/lib/supabase/server";
import { FindingCard } from "./FindingCard";

export async function FindingList({ dealId }: { dealId: string }) {
  const supabase = await createServerClient();

  const { data: findings } = await supabase
    .from("deal_findings")
    .select("*")
    .eq("deal_id", dealId)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-4">
      {findings && findings.length > 0 ? (
        findings.map((finding) => (
          <FindingCard key={finding.id} finding={finding} />
        ))
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">発見事項がありません</p>
        </div>
      )}
    </div>
  );
}
