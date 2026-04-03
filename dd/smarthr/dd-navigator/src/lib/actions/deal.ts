"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createDealSchema, updateDealPhaseSchema } from "@/lib/schemas/deal";
import { revalidatePath } from "next/cache";

export async function createDeal(formData: FormData) {
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
      target_company: formData.get("target_company"),
      expected_closing_date: formData.get("expected_closing_date") || undefined,
      team_id: formData.get("team_id"),
      longlist_company_id: formData.get("longlist_company_id") || undefined,
    };

    const validated = createDealSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    const { data: deal, error } = await supabase
      .from("deals")
      .insert({
        ...validated.data,
        created_by: user.id,
        status: "active",
        current_phase: "sourcing",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating deal:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "案件の作成に失敗しました",
        },
      };
    }

    // フェーズ履歴の初回レコードを作成
    await supabase.from("deal_phases").insert({
      deal_id: deal.id,
      phase: "sourcing",
      changed_by: user.id,
    });

    revalidatePath("/deals");
    revalidatePath("/dashboard");

    return { success: true, data: deal };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function updateDealPhase(dealId: string, phase: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = updateDealPhaseSchema.safeParse({
      dealId,
      phase,
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

    // 現在のフェーズを終了
    await supabase
      .from("deal_phases")
      .update({ ended_at: new Date().toISOString() })
      .eq("deal_id", validated.data.dealId)
      .is("ended_at", null);

    // 新しいフェーズを開始
    await supabase.from("deal_phases").insert({
      deal_id: validated.data.dealId,
      phase: validated.data.phase,
      changed_by: user.id,
    });

    // 案件のcurrent_phaseを更新
    const { data: deal, error } = await supabase
      .from("deals")
      .update({ current_phase: validated.data.phase })
      .eq("id", validated.data.dealId)
      .select()
      .single();

    if (error) {
      console.error("Error updating deal phase:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "フェーズの更新に失敗しました",
        },
      };
    }

    revalidatePath(`/deals/${dealId}`);
    revalidatePath("/deals");
    revalidatePath("/dashboard");

    return { success: true, data: deal };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
