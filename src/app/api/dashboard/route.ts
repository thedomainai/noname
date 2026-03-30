import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth";
import { createErrorResponse } from "@/lib/schemas/error";

export async function GET() {
  try {
    await requireAuth();

    const supabase = await createServerClient();

    // ステータス別サマリー
    const { data: summaryData, error: summaryError } = await supabase
      .from("dashboard_summary")
      .select("*");

    if (summaryError) {
      console.error("Failed to fetch dashboard summary:", summaryError);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch dashboard summary"),
        { status: 500 }
      );
    }

    // 担当者別ワークロード
    const { data: workloadData, error: workloadError } = await supabase
      .from("assignee_workload")
      .select("*")
      .order("pr_count", { ascending: false });

    if (workloadError) {
      console.error("Failed to fetch assignee workload:", workloadError);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch assignee workload"),
        { status: 500 }
      );
    }

    return NextResponse.json({
      summary: summaryData || [],
      workload: workloadData || [],
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/dashboard:", error);
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized") {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
