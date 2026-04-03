"use server";

import { createServerClient } from "@/lib/supabase/server";
import { applyTemplateSchema, toggleChecklistItemSchema } from "@/lib/schemas/checklist";
import { revalidatePath } from "next/cache";

export async function toggleChecklistItem(itemId: string, completed: boolean) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = toggleChecklistItemSchema.safeParse({
      item_id: itemId,
      is_completed: completed,
    });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
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
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "チェックリスト項目の更新に失敗しました",
        },
      };
    }

    // deal_idを取得してrevalidate
    const { data: checklistItem } = await supabase
      .from("deal_checklists")
      .select("deal_id")
      .eq("id", itemId)
      .single();

    if (checklistItem) {
      revalidatePath(`/deals/${checklistItem.deal_id}/checklist`);
    }

    return { success: true, data: item };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function applyTemplate(dealId: string, templateId: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = applyTemplateSchema.safeParse({
      deal_id: dealId,
      template_id: templateId,
    });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    // テンプレートのチェックリスト項目を取得
    const { data: items, error: itemsError } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("template_id", templateId)
      .order("sort_order");

    if (itemsError || !items) {
      console.error("Error fetching checklist items:", itemsError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "テンプレートの取得に失敗しました",
        },
      };
    }

    // 案件にチェックリスト項目を適用
    const checklistItems = items.map((item) => ({
      deal_id: dealId,
      template_id: templateId,
      checklist_item_id: item.id,
      is_completed: false,
    }));

    const { error: insertError } = await supabase
      .from("deal_checklists")
      .insert(checklistItems);

    if (insertError) {
      console.error("Error applying template:", insertError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "テンプレートの適用に失敗しました",
        },
      };
    }

    revalidatePath(`/deals/${dealId}/checklist`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
