import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, requireRole } from "@/lib/auth";
import { createChecklistItemSchema } from "@/lib/schemas/checklist";
import { createErrorResponse } from "@/lib/schemas/error";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await params;
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("pull_request_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch checklist items:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch checklist items"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (error) {
    console.error(
      "Unexpected error in GET /api/pull-requests/[id]/checklists:",
      error
    );
    const message = error instanceof Error ? error.message : "Unknown error";

    if (message === "Unauthorized") {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const body = await request.json();
    const parsed = createChecklistItemSchema.safeParse(body);

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

    const { data, error } = await supabase
      .from("checklist_items")
      .insert({
        pull_request_id: id,
        title: parsed.data.title,
        description: parsed.data.description || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create checklist item:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to create checklist item"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(
      "Unexpected error in POST /api/pull-requests/[id]/checklists:",
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
