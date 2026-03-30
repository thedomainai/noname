import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole, getCurrentUser } from "@/lib/auth";
import { toggleChecklistItemSchema } from "@/lib/schemas/checklist";
import { createErrorResponse } from "@/lib/schemas/error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const { itemId } = await params;
    const body = await request.json();
    const parsed = toggleChecklistItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        createErrorResponse(
          "VALIDATION_ERROR",
          "Invalid input",
          parsed.error.format()
        ),
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    const updateData = {
      is_completed: parsed.data.is_completed,
      completed_at: parsed.data.is_completed ? new Date().toISOString() : null,
      completed_by_id: parsed.data.is_completed ? user.id : null,
    };

    const { data, error } = await supabase
      .from("checklist_items")
      .update(updateData)
      .eq("id", itemId)
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to toggle checklist item:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to toggle checklist item"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(
      "Unexpected error in PATCH /api/pull-requests/[id]/checklists/[itemId]:",
      error
    );
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized") {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    if (message === "Forbidden") {
      return NextResponse.json(
        createErrorResponse("FORBIDDEN", "Insufficient permissions"),
        { status: 403 }
      );
    }

    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
