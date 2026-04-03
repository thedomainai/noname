"use server";

import { createServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(documentId: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    // ドキュメント情報を取得
    const { data: document, error: fetchError } = await supabase
      .from("documents")
      .select("deal_id, storage_path, file_size_bytes")
      .eq("id", documentId)
      .single();

    if (fetchError || !document) {
      return {
        error: {
          code: "NOT_FOUND",
          message: "ドキュメントが見つかりません",
        },
      };
    }

    // ストレージからファイルを削除
    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([document.storage_path]);

    if (storageError) {
      console.error("Error deleting file from storage:", storageError);
    }

    // ドキュメントレコードを論理削除
    const { error: deleteError } = await supabase
      .from("documents")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", documentId);

    if (deleteError) {
      console.error("Error deleting document:", deleteError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "ドキュメントの削除に失敗しました",
        },
      };
    }

    // ストレージ使用量を更新
    const { data: deal } = await supabase
      .from("deals")
      .select("team_id")
      .eq("id", document.deal_id)
      .single();

    if (deal) {
      await supabase.rpc("update_storage_usage", {
        p_team_id: deal.team_id,
        p_delta: -document.file_size_bytes,
      });
    }

    revalidatePath(`/deals/${document.deal_id}/documents`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
