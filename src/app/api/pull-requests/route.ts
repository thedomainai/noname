import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, requireRole } from "@/lib/auth";
import {
  createPullRequestSchema,
  listPullRequestsQuerySchema,
} from "@/lib/schemas/pull-request";
import { createErrorResponse } from "@/lib/schemas/error";

export async function GET(request: Request) {
  try {
    await requireAuth();

    const { searchParams } = new URL(request.url);
    const queryObject = Object.fromEntries(searchParams);

    const parsed = listPullRequestsQuerySchema.safeParse(queryObject);
    if (!parsed.success) {
      return NextResponse.json(
        createErrorResponse(
          "VALIDATION_ERROR",
          "Invalid query parameters",
          parsed.error.format()
        ),
        { status: 400 }
      );
    }

    const { status, assignee_id, repository, page, limit } = parsed.data;
    const offset = (page - 1) * limit;

    const supabase = await createServerClient();

    let query = supabase
      .from("pull_request_details")
      .select("*", { count: "exact" });

    if (status) {
      query = query.eq("qa_status", status);
    }

    if (assignee_id) {
      query = query.eq("assignee_id", assignee_id);
    }

    if (repository) {
      query = query.eq("repository", repository);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Failed to fetch pull requests:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch pull requests"),
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Unexpected error in GET /api/pull-requests:", error);
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

export async function POST(request: Request) {
  try {
    await requireRole(["admin", "qa_engineer"]);

    const body = await request.json();
    const parsed = createPullRequestSchema.safeParse(body);

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
      .insert(parsed.data)
      .select()
      .single();

    if (error) {
      console.error("Failed to create pull request:", error);

      if (error.code === "23505") {
        return NextResponse.json(
          createErrorResponse(
            "CONFLICT",
            "Pull request already exists for this repository and number"
          ),
          { status: 409 }
        );
      }

      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to create pull request"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in POST /api/pull-requests:", error);
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
