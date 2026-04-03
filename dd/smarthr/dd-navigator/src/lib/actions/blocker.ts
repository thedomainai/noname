"use server";

import { createServerClient } from "@/lib/supabase/server";
import {
  createBlockerSchema,
  resolveBlockerSchema,
} from "@/lib/schemas/blocker";
import { revalidatePath } from "next/cache";

export async function addBlocker(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = createBlockerSchema.safeParse({
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

    const { data: blocker, error } = await supabase
      .from("blockers")
      .insert({
        pull_request_id: prId,
        created_by_id: user.id,
        ...validated.data,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding blocker:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "ブロッカーの追加に失敗しました",
        },
      };
    }

    // 未解決ブロッカーが追加された場合、PRステータスを blocked に更新
    await supabase
      .from("pull_requests")
      .update({ qa_status: "blocked" })
      .eq("id", prId);

    revalidatePath(`/qa/pull-requests/${prId}`);
    revalidatePath("/qa");

    return { success: true, data: blocker };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function resolveBlocker(
  prId: string,
  blockerId: string,
  resolved: boolean
) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = resolveBlockerSchema.safeParse({ resolved });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
        },
      };
    }

    const updateData: Record<string, unknown> = {
      resolved: validated.data.resolved,
    };

    if (validated.data.resolved) {
      updateData.resolved_at = new Date().toISOString();
      updateData.resolved_by_id = user.id;
    } else {
      updateData.resolved_at = null;
      updateData.resolved_by_id = null;
    }

    const { data: blocker, error } = await supabase
      .from("blockers")
      .update(updateData)
      .eq("id", blockerId)
      .select()
      .single();

    if (error) {
      console.error("Error resolving blocker:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "ブロッカーの更新に失敗しました",
        },
      };
    }

    // 全ブロッカーが解決された場合、PRステータスを in_progress に戻す
    if (validated.data.resolved) {
      const { data: unresolvedBlockers } = await supabase
        .from("blockers")
        .select("id")
        .eq("pull_request_id", prId)
        .eq("resolved", false);

      if (!unresolvedBlockers || unresolvedBlockers.length === 0) {
        await supabase
          .from("pull_requests")
          .update({ qa_status: "in_progress" })
          .eq("id", prId)
          .eq("qa_status", "blocked");
      }
    }

    revalidatePath(`/qa/pull-requests/${prId}`);
    revalidatePath("/qa");

    return { success: true, data: blocker };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
