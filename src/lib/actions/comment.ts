"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

export async function addComment(
  pullRequestId: string,
  content: string,
  screenshotUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    const { error } = await supabase.from("comments").insert({
      pull_request_id: pullRequestId,
      author_id: user.id,
      content,
      screenshot_url: screenshotUrl || null,
    });

    if (error) {
      console.error("Failed to add comment:", error);
      return { success: false, error: "Failed to add comment" };
    }

    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in addComment:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
