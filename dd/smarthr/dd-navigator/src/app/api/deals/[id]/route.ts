import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    // 案件の詳細を取得
    const { data: deal, error: dealError } = await supabase
      .from("deals")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .single();

    if (dealError || !deal) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "案件が見つかりません" } },
        { status: 404 }
      );
    }

    // フェーズ履歴を取得
    const { data: phases, error: phasesError } = await supabase
      .from("deal_phases")
      .select("*")
      .eq("deal_id", id)
      .order("started_at", { ascending: true });

    if (phasesError) {
      console.error("Error fetching deal phases:", phasesError);
    }

    return NextResponse.json({
      ...deal,
      phases: phases || [],
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const body = await request.json();

    // 更新可能なフィールドのみを抽出
    const allowedFields = [
      "name",
      "target_company",
      "expected_closing_date",
      "actual_closing_date",
      "status",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "更新するデータがありません" } },
        { status: 400 }
      );
    }

    const { data: deal, error } = await supabase
      .from("deals")
      .update(updateData)
      .eq("id", id)
      .is("deleted_at", null)
      .select()
      .single();

    if (error) {
      console.error("Error updating deal:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "案件の更新に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(deal);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
