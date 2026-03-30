import { createServerClient } from "@/lib/supabase/server";

export interface MergeabilityResult {
  is_mergeable: boolean;
  reason: string;
  checklist_completion_rate: number;
  unresolved_blockers: number;
}

export async function decideMergeability(
  pullRequestId: string
): Promise<MergeabilityResult> {
  const supabase = await createServerClient();

  // チェックリスト完了率を取得
  const { data: checklistData } = await supabase
    .from("checklist_items")
    .select("is_completed")
    .eq("pull_request_id", pullRequestId);

  const total = checklistData?.length || 0;
  const completed = checklistData?.filter((item) => item.is_completed).length || 0;
  const completionRate = total > 0 ? completed / total : 0;

  // 未解決ブロッカー数を取得
  const { data: blockerData } = await supabase
    .from("blockers")
    .select("id")
    .eq("pull_request_id", pullRequestId)
    .eq("resolved", false);

  const unresolvedBlockers = blockerData?.length || 0;

  // マージ可否判定
  const isMergeable = completionRate >= 1.0 && unresolvedBlockers === 0;

  let reason = "";
  if (!isMergeable) {
    if (unresolvedBlockers > 0) {
      reason = `${unresolvedBlockers} unresolved blocker(s)`;
    } else if (completionRate < 1.0) {
      reason = `Checklist not complete (${Math.round(completionRate * 100)}%)`;
    }
  } else {
    reason = "All checks passed";
  }

  return {
    is_mergeable: isMergeable,
    reason,
    checklist_completion_rate: completionRate,
    unresolved_blockers: unresolvedBlockers,
  };
}
