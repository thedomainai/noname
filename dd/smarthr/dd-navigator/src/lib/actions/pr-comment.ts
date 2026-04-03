"use server";

import { createServerClient } from "@/lib/supabase/server";
import {
  createPRCommentSchema,
  updatePRCommentSchema,
} from "@/lib/schemas/pr-comment";
import { revalidatePath } from "next/cache";

export async function addComment(prId: string, formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = createPRCommentSchema.safeParse({
      content: formData.get("content"),
      screenshot_url: formData.get("screenshot_url") || undefined,
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

    const { data: comment, error } = await supabase
      .from("pr_comments")
      .insert({
        pull_request_id: prId,
        author_id: user.id,
        ...validated.data,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding comment:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "コメントの追加に失敗しました",
        },
      };
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: comment };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function updateComment(
  prId: string,
  commentId: string,
  formData: FormData
) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = updatePRCommentSchema.safeParse({
      content: formData.get("content"),
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

    const { data: comment, error } = await supabase
      .from("pr_comments")
      .update(validated.data)
      .eq("id", commentId)
      .eq("author_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating comment:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "コメントの更新に失敗しました",
        },
      };
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true, data: comment };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function deleteComment(prId: string, commentId: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const { error } = await supabase
      .from("pr_comments")
      .delete()
      .eq("id", commentId)
      .eq("author_id", user.id);

    if (error) {
      console.error("Error deleting comment:", error);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "コメントの削除に失敗しました",
        },
      };
    }

    revalidatePath(`/qa/pull-requests/${prId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
