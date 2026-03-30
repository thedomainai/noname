import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import { resolveBlockerSchema } from "@/lib/schemas/blocker";
import { createErrorResponse } from "@/lib/schemas/error";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; blockerId: string }> }
) {
  try {
    const user = await requireRole(["admin", "qa_engineer"]);

    const { blockerId } = await params;
    const body = await request.json();
    const parsed = resolveBlockerSchema.safeParse(body);

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
      resolved: parsed.data.resolved,
      resolved_at: parsed.data.resolved ? new Date().toISOString() : null,
      resolved_by_id: parsed.data.resolved ? user.id : null,
    };

    const { data, error } = await supabase
      .from("blockers")
      .update(updateData)
      .eq("id", blockerId)
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to update blocker:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to update blocker"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(
      "Unexpected error in PATCH /api/pull-requests/[id]/blockers/[blockerId]:",
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
