import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireRole } from "@/lib/auth";
import { assignQAEngineerSchema } from "@/lib/schemas/assignment";
import { createErrorResponse } from "@/lib/schemas/error";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const body = await request.json();
    const parsed = assignQAEngineerSchema.safeParse(body);

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

    // PRを更新
    const { data: prData, error: prError } = await supabase
      .from("pull_requests")
      .update({
        assignee_id: parsed.data.assignee_id,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (prError || !prData) {
      console.error("Failed to assign QA engineer:", prError);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to assign QA engineer"),
        { status: 500 }
      );
    }

    // qa_assignmentsテーブルに記録
    await supabase.from("qa_assignments").insert({
      pull_request_id: id,
      assignee_id: parsed.data.assignee_id,
    });

    return NextResponse.json({ data: prData });
  } catch (error) {
    console.error(
      "Unexpected error in POST /api/pull-requests/[id]/assignee:",
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("pull_requests")
      .update({
        assignee_id: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to unassign QA engineer:", error);
      return NextResponse.json(
        createErrorResponse(
          "DATABASE_ERROR",
          "Failed to unassign QA engineer"
        ),
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(
      "Unexpected error in DELETE /api/pull-requests/[id]/assignee:",
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
