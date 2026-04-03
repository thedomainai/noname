"use server";

import { createServerClient } from "@/lib/supabase/server";
import {
  createPullRequestSchema,
  updatePullRequestSchema,
  updateQAStatusSchema,
  assignAssigneeSchema,
} from "@/lib/schemas/pull-request";
import { revalidatePath } from "next/cache";

export async function createPullRequest(formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const rawData = {
      team_id: formData.get("team_id"),
      number: Number(formData.get("number")),
      title: formData.get("title"),
      description: formData.get("description") || undefined,
      repository: formData.get("repository"),
      author: formData.get("author"),
      url: formData.get("url"),
      source: formData.get("source") || "manual",
    };

    const validated = createPullRequestSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    const { data: pr, error } = await supabase
      .from("pull_requests")
      .insert(validated.data)
      .select()
      .single();

    if (error) {
      console.error("Error creating pull request:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "PRの作成に失敗しました",
        },
      };
    }

    revalidatePath("/qa");
    revalidatePath("/qa/pull-requests");

    return { success: true, data: pr };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function updatePullRequest(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const rawData: Record<string, unknown> = {};
    const title = formData.get("title");
    const description = formData.get("description");
    const qa_status = formData.get("qa_status");
    const assignee_id = formData.get("assignee_id");

    if (title !== null) rawData.title = title;
    if (description !== null) rawData.description = description;
    if (qa_status !== null) rawData.qa_status = qa_status;
    if (assignee_id !== null) rawData.assignee_id = assignee_id || null;

    const validated = updatePullRequestSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    const { data: pr, error } = await supabase
      .from("pull_requests")
      .update(validated.data)
      .eq("id", prId)
      .select()
      .single();

    if (error) {
      console.error("Error updating pull request:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "PRの更新に失敗しました",
        },
      };
    }

    revalidatePath("/qa");
    revalidatePath("/qa/pull-requests");
    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: pr };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function updateQAStatus(prId: string, status: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = updateQAStatusSchema.safeParse({ qa_status: status });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "無効なステータスです",
          details: validated.error.format(),
        },
      };
    }

    const { data: pr, error } = await supabase
      .from("pull_requests")
      .update({ qa_status: validated.data.qa_status })
      .eq("id", prId)
      .select()
      .single();

    if (error) {
      console.error("Error updating QA status:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "ステータスの更新に失敗しました",
        },
      };
    }

    revalidatePath("/qa");
    revalidatePath("/qa/pull-requests");
    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: pr };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function assignPR(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = assignAssigneeSchema.safeParse({
      assignee_id: formData.get("assignee_id"),
    });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "無効な担当者です",
          details: validated.error.format(),
        },
      };
    }

    // PR の assignee_id を更新
    const { error: updateError } = await supabase
      .from("pull_requests")
      .update({ assignee_id: validated.data.assignee_id })
      .eq("id", prId);

    if (updateError) {
      console.error("Error assigning PR:", updateError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "担当者の割り当てに失敗しました",
        },
      };
    }

    // アサイン履歴を記録
    await supabase.from("qa_assignments").insert({
      pull_request_id: prId,
      assignee_id: validated.data.assignee_id,
    });

    revalidatePath("/qa");
    revalidatePath("/qa/pull-requests");
    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
