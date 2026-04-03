"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createFindingSchema } from "@/lib/schemas/finding";
import { revalidatePath } from "next/cache";

export async function createFinding(dealId: string, formData: FormData) {
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
      title: formData.get("title"),
      description: formData.get("description") || undefined,
      category: formData.get("category"),
      severity: formData.get("severity"),
      related_qa_id: formData.get("related_qa_id") || undefined,
      related_document_id: formData.get("related_document_id") || undefined,
    };

    const validated = createFindingSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    const { data: finding, error } = await supabase
      .from("findings")
      .insert({
        ...validated.data,
        created_by: user.id,
        status: "open",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating finding:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "発見事項の作成に失敗しました",
        },
      };
    }

    revalidatePath(`/deals/${dealId}/findings`);

    return { success: true, data: finding };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
