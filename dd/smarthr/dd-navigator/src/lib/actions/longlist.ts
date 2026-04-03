"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createCompanySchema } from "@/lib/schemas/longlist";
import { revalidatePath } from "next/cache";

export async function createCompany(formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const rawData = {
      name: formData.get("name"),
      industry: formData.get("industry") || undefined,
      region: formData.get("region") || undefined,
      revenue_jpy: formData.get("revenue_jpy") || undefined,
      employee_count: formData.get("employee_count") || undefined,
      website_url: formData.get("website_url") || undefined,
      fit_score: formData.get("fit_score") || undefined,
      notes: formData.get("notes") || undefined,
      source: formData.get("source") || undefined,
      team_id: formData.get("team_id"),
    };

    const validated = createCompanySchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    const { data: company, error } = await supabase
      .from("longlist_companies")
      .insert({
        ...validated.data,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating company:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "企業の登録に失敗しました",
        },
      };
    }

    revalidatePath("/longlist");

    return { success: true, data: company };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
