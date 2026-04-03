import { createServerClient } from "@/lib/supabase/server";
import { createQASchema } from "@/lib/schemas/qa";
import { detectDuplicateQuestions } from "@/lib/services/duplicate-detection";
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

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    let query = supabase
      .from("qa_items")
      .select("*", { count: "exact" })
      .eq("deal_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (category) {
      query = query.eq("category", category);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data: qaItems, error, count } = await query;

    if (error) {
      console.error("Error fetching QA items:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "Q&Aの取得に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      qa_items: qaItems,
      total: count ?? 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function POST(
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
    const validated = createQASchema.safeParse({
      ...body,
      deal_id: id,
    });

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "入力データが不正です",
            details: validated.error.format(),
          },
        },
        { status: 400 }
      );
    }

    // 重複チェック
    const duplicates = await detectDuplicateQuestions(
      validated.data.deal_id,
      validated.data.question
    );

    const hasDuplicate = duplicates.length > 0;

    const { data: qaItem, error } = await supabase
      .from("qa_items")
      .insert({
        ...validated.data,
        created_by: user.id,
        has_duplicate: hasDuplicate,
        duplicate_of: hasDuplicate ? duplicates[0]?.id : null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating QA item:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "Q&Aの作成に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        qa_item: qaItem,
        duplicates: hasDuplicate ? duplicates : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
