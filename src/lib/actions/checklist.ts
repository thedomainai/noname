"use server";

import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";

export async function toggleChecklistItem(
  pullRequestId: string,
  itemId: string,
  isCompleted: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const supabase = await createServerClient();

    const updateData = {
      is_completed: isCompleted,
      completed_at: isCompleted ? new Date().toISOString() : null,
      completed_by_id: isCompleted ? user.id : null,
    };

    const { error } = await supabase
      .from("checklist_items")
      .update(updateData)
      .eq("id", itemId);

    if (error) {
      console.error("Failed to toggle checklist item:", error);
      return { success: false, error: "Failed to toggle checklist item" };
    }

    revalidatePath("/pull-requests");
    revalidatePath(`/pull-requests/${pullRequestId}`);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in toggleChecklistItem:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
