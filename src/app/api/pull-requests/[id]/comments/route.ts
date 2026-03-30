import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { requireAuth, requireRole } from "@/lib/auth";
import { createCommentSchema } from "@/lib/schemas/comment";
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
      .from("comments")
      .select(
        `
        *,
        author:users!author_id (
          name,
          email,
          avatar_url
        )
      `
      )
      .eq("pull_request_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch comments:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to fetch comments"),
        { status: 500 }
      );
    }

    // データ整形
    const formattedData = (data || []).map((comment) => ({
      ...comment,
      author_name: comment.author?.name || "Unknown",
      author_email: comment.author?.email || "",
      author_avatar_url: comment.author?.avatar_url || null,
    }));

    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error(
      "Unexpected error in GET /api/pull-requests/[id]/comments:",
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
    const user = await requireRole(["admin", "qa_engineer"]);

    const { id } = await params;
    const body = await request.json();
    const parsed = createCommentSchema.safeParse(body);

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
      .from("comments")
      .insert({
        pull_request_id: id,
        author_id: user.id,
        content: parsed.data.content,
        screenshot_url: parsed.data.screenshot_url || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create comment:", error);
      return NextResponse.json(
        createErrorResponse("DATABASE_ERROR", "Failed to create comment"),
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    console.error(
      "Unexpected error in POST /api/pull-requests/[id]/comments:",
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
