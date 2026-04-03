import { createServerClient } from "@/lib/supabase/server";

export interface PhaseMetrics {
  total_days: number;
  current_phase_days: number;
}

export async function calculatePhaseMetrics(
  dealId: string
): Promise<PhaseMetrics> {
  const supabase = await createServerClient();

  // 案件の作成日を取得
  const { data: deal, error: dealError } = await supabase
    .from("deals")
    .select("created_at, current_phase")
    .eq("id", dealId)
    .single();

  if (dealError || !deal) {
    throw new Error("Deal not found");
  }

  // 現在のフェーズの開始日を取得
  const { data: phaseHistory, error: phaseError } = await supabase
    .from("deal_phases")
    .select("started_at")
    .eq("deal_id", dealId)
    .eq("phase", deal.current_phase)
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  if (phaseError) {
    console.error("Error fetching phase history:", phaseError);
  }

  const now = new Date();
  const dealCreatedAt = new Date(deal.created_at);
  const phaseStartedAt = phaseHistory
    ? new Date(phaseHistory.started_at)
    : dealCreatedAt;

  const total_days = Math.floor(
    (now.getTime() - dealCreatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const current_phase_days = Math.floor(
    (now.getTime() - phaseStartedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    total_days,
    current_phase_days,
  };
}
