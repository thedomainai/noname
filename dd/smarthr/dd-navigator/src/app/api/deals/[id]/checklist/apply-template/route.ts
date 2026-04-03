import { createServerClient } from "@/lib/supabase/server";
import { applyTemplateSchema } from "@/lib/schemas/checklist";
import { NextRequest, NextResponse } from "next/server";

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
    const validated = applyTemplateSchema.safeParse({
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

    // テンプレートのチェックリスト項目を取得
    const { data: items, error: itemsError } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("template_id", validated.data.template_id)
      .order("sort_order");

    if (itemsError || !items) {
      console.error("Error fetching checklist items:", itemsError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "テンプレートの取得に失敗しました" } },
        { status: 500 }
      );
    }

    // 案件にチェックリスト項目を適用
    const checklistItems = items.map((item) => ({
      deal_id: id,
      template_id: validated.data.template_id,
      checklist_item_id: item.id,
      is_completed: false,
    }));

    const { error: insertError } = await supabase
      .from("deal_checklists")
      .insert(checklistItems);

    if (insertError) {
      console.error("Error applying template:", insertError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "テンプレートの適用に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
