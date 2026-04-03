import { createServerClient } from "@/lib/supabase/server";
import { updatePullRequestSchema } from "@/lib/schemas/pull-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { data: pr, error } = await supabase
      .from("pull_request_details")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !pr) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "PRが見つかりません" } },
        { status: 404 }
      );
    }

    return NextResponse.json(pr);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const validated = updatePullRequestSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", details: validated.error.format() } },
        { status: 400 }
      );
    }

    const { data: pr, error } = await supabase
      .from("pull_requests")
      .update(validated.data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating pull request:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "PRの更新に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json(pr);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const { error } = await supabase
      .from("pull_requests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting pull request:", error);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "PRの削除に失敗しました" } },
        { status: 500 }
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
