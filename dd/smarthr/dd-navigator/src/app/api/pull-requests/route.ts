import { createServerClient } from "@/lib/supabase/server";
import { listPullRequestsQuerySchema, createPullRequestSchema } from "@/lib/schemas/pull-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "認証が必要です" } },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const validated = listPullRequestsQuerySchema.safeParse({
      team_id: searchParams.get("team_id"),
      status: searchParams.get("status") || undefined,
      assignee_id: searchParams.get("assignee_id") || undefined,
      repository: searchParams.get("repository") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: validated.error.format() } },
        { status: 400 }
      );
    }

    const { team_id, status, assignee_id, repository, page, limit } = validated.data;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("pull_request_details")
      .select("*", { count: "exact" })
      .eq("team_id", team_id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq("qa_status", status);
    }
    if (assignee_id) {
      query = query.eq("assignee_id", assignee_id);
    }
    if (repository) {
      query = query.eq("repository", repository);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching pull requests:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "PRの取得に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data ?? [],
      total: count ?? 0,
      page,
      limit,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "認証が必要です" } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = createPullRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: validated.error.format() } },
        { status: 400 }
      );
    }

    const { data: pr, error } = await supabase
      .from("pull_requests")
      .insert(validated.data)
      .select()
      .single();

    if (error) {
      console.error("Error creating pull request:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "PRの作成に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(pr, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
