"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import type { QAStatus } from "@/lib/schemas/pull-request";

export async function updateQAStatus(
  pullRequestId: string,
  qaStatus: QAStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    const { error } = await supabase
      .from("pull_requests")
      .update({
        qa_status: qaStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pullRequestId);

    if (error) {
      console.error("Failed to update QA status:", error);
      return { success: false, error: "Failed to update QA status" };
    }

    revalidatePath("/pull-requests");
    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in updateQAStatus:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
