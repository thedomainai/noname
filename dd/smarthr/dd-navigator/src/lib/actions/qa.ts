"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createQASchema } from "@/lib/schemas/qa";
import { detectDuplicateQuestions } from "@/lib/services/duplicate-detection";
import { revalidatePath } from "next/cache";

export async function createQAItem(dealId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const rawData = {
      deal_id: dealId,
      category: formData.get("category"),
      question: formData.get("question"),
      priority: formData.get("priority") || "medium",
      due_date: formData.get("due_date") || undefined,
    };

    const validated = createQASchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
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
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "Q&Aの作成に失敗しました",
        },
      };
    }

    revalidatePath(`/deals/${dealId}/qa`);

    return { success: true, data: qaItem, duplicates };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
