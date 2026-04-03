"use server";

import { createServerClient } from "@/lib/supabase/server";
import {
  createPRChecklistItemSchema,
  togglePRChecklistItemSchema,
  applyTemplateSchema,
} from "@/lib/schemas/pr-checklist";
import { revalidatePath } from "next/cache";

export async function addChecklistItem(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = createPRChecklistItemSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description") || undefined,
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

    const { data: item, error } = await supabase
      .from("pr_checklist_items")
      .insert({
        pull_request_id: prId,
        ...validated.data,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding checklist item:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "チェックリスト項目の追加に失敗しました",
        },
      };
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: item };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function toggleChecklistItem(
  prId: string,
  itemId: string,
  isCompleted: boolean
) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = togglePRChecklistItemSchema.safeParse({ is_completed: isCompleted });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
        },
      };
    }

    const updateData: Record<string, unknown> = {
      is_completed: validated.data.is_completed,
    };

    if (validated.data.is_completed) {
      updateData.completed_at = new Date().toISOString();
      updateData.completed_by_id = user.id;
    } else {
      updateData.completed_at = null;
      updateData.completed_by_id = null;
    }

    const { data: item, error } = await supabase
      .from("pr_checklist_items")
      .update(updateData)
      .eq("id", itemId)
      .select()
      .single();

    if (error) {
      console.error("Error toggling checklist item:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "チェックリスト項目の更新に失敗しました",
        },
      };
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: item };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function applyTemplate(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = applyTemplateSchema.safeParse({
      template_id: formData.get("template_id"),
    });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "テンプレートIDが不正です",
        },
      };
    }

    // テンプレートを取得
    const { data: template, error: templateError } = await supabase
      .from("pr_checklist_templates")
      .select("*")
      .eq("id", validated.data.template_id)
      .single();

    if (templateError || !template) {
      return {
        error: {
          code: "NOT_FOUND",
          message: "テンプレートが見つかりません",
        },
      };
    }

    // テンプレートのアイテムをチェックリストとして一括追加
    const items = (template.items as Array<{ title: string; description?: string }>).map(
      (item) => ({
        pull_request_id: prId,
        title: item.title,
        description: item.description || null,
      })
    );

    if (items.length > 0) {
      const { error: insertError } = await supabase
        .from("pr_checklist_items")
        .insert(items);

      if (insertError) {
        console.error("Error applying template:", insertError);
        return {
          error: {
            code: "DATABASE_ERROR",
            message: "テンプレートの適用に失敗しました",
          },
        };
      }
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, itemCount: items.length };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
