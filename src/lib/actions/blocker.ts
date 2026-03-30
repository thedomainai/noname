"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

export async function addBlocker(
  pullRequestId: string,
  title: string,
  description?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    const { error } = await supabase.from("blockers").insert({
      pull_request_id: pullRequestId,
      created_by_id: user.id,
      title,
      description: description || null,
    });

    if (error) {
      console.error("Failed to add blocker:", error);
      return { success: false, error: "Failed to add blocker" };
    }

    revalidatePath("/pull-requests");
    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in addBlocker:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function resolveBlocker(
  pullRequestId: string,
  blockerId: string,
  resolved: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    const updateData = {
      resolved,
      resolved_at: resolved ? new Date().toISOString() : null,
      resolved_by_id: resolved ? user.id : null,
    };

    const { error } = await supabase
      .from("blockers")
      .update(updateData)
      .eq("id", blockerId);

    if (error) {
      console.error("Failed to resolve blocker:", error);
      return { success: false, error: "Failed to resolve blocker" };
    }

    revalidatePath("/pull-requests");
    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in resolveBlocker:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
