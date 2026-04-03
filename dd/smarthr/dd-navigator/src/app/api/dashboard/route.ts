import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "認証が必要です" } },
        { status: 401 }
      );
    }

    // アクティブな案件数
    const { count: activeDealsCount } = await supabase
      .from("deals")
      .select("*", { count: "exact", head: true })
      .eq("status", "active")
      .is("deleted_at", null);

    // Q&A総数
    const { count: totalQAItems } = await supabase
      .from("qa_items")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null);

    // 未回答Q&A数
    const { count: pendingQAItems } = await supabase
      .from("qa_items")
      .select("*", { count: "exact", head: true })
      .in("status", ["draft", "sent"])
      .is("deleted_at", null);

    // 資料総数
    const { count: totalDocuments } = await supabase
      .from("documents")
      .select("*", { count: "exact", head: true })
      .is("deleted_at", null);

    // 重大な発見事項数
    const { count: criticalFindings } = await supabase
      .from("findings")
      .select("*", { count: "exact", head: true })
      .eq("severity", "critical")
      .eq("status", "open")
      .is("deleted_at", null);

    // 最近の案件（上位5件）
    const { data: recentDeals } = await supabase
      .from("deals")
      .select("id, name, target_company, current_phase, status, created_at")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(5);

    // フェーズ別案件分布
    const { data: phaseDistributionData } = await supabase
      .from("deals")
      .select("current_phase")
      .eq("status", "active")
      .is("deleted_at", null);

    const phaseDistribution = phaseDistributionData?.reduce(
      (acc, deal) => {
        const phase = deal.current_phase;
        const existing = acc.find((p: { phase: string; count: number }) => p.phase === phase);
        if (existing) {
          existing.count += 1;
        } else {
          acc.push({ phase, count: 1 });
        }
        return acc;
      },
      [] as Array<{ phase: string; count: number }>
    );

    return NextResponse.json({
      active_deals_count: activeDealsCount ?? 0,
      total_qa_items: totalQAItems ?? 0,
      pending_qa_items: pendingQAItems ?? 0,
      total_documents: totalDocuments ?? 0,
      critical_findings: criticalFindings ?? 0,
      recent_deals: recentDeals ?? [],
      phase_distribution: phaseDistribution ?? [],
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
