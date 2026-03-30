"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

export async function assignQAEngineer(
  pullRequestId: string,
  assigneeId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    // PRを更新
    const { error: prError } = await supabase
      .from("pull_requests")
      .update({
        assignee_id: assigneeId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pullRequestId);

    if (prError) {
      console.error("Failed to assign QA engineer:", prError);
      return { success: false, error: "Failed to assign QA engineer" };
    }

    // qa_assignmentsテーブルに記録
    await supabase.from("qa_assignments").insert({
      pull_request_id: pullRequestId,
      assignee_id: assigneeId,
    });

    revalidatePath("/pull-requests");
    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in assignQAEngineer:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
