import { createServerClient } from "@/lib/supabase/server";
import { toggleChecklistItemSchema } from "@/lib/schemas/checklist";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { itemId } = await params;
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
    const validated = toggleChecklistItemSchema.safeParse({
      ...body,
      item_id: itemId,
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

    const updateData: Record<string, unknown> = {
      is_completed: validated.data.is_completed,
    };

    if (validated.data.is_completed) {
      updateData.completed_by = user.id;
      updateData.completed_at = new Date().toISOString();
    } else {
      updateData.completed_by = null;
      updateData.completed_at = null;
    }

    if (validated.data.notes) {
      updateData.notes = validated.data.notes;
    }

    const { data: item, error } = await supabase
      .from("deal_checklists")
      .update(updateData)
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      console.error("Error updating checklist item:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "チェックリスト項目の更新に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
