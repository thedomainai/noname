import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, requireRole } from "@/lib/auth";
import { updateQAStatusSchema } from "@/lib/schemas/pull-request";
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
      .from("pull_request_details")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        createErrorResponse("NOT_FOUND", "Pull request not found"),
        { status: 404 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected error in GET /api/pull-requests/[id]:", error);
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const body = await request.json();
    const parsed = updateQAStatusSchema.safeParse(body);

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
      .from("pull_requests")
      .update({
        qa_status: parsed.data.qa_status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to update pull request:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to update pull request"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Unexpected error in PATCH /api/pull-requests/[id]:", error);
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
