import { createServerClient } from "@/lib/supabase/server";
import { createTeamSchema } from "@/lib/schemas/team";
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

    // ユーザーが所属するチームを取得
    const { data: memberships, error: membershipsError } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("user_id", user.id)
      .is("deleted_at", null);

    if (membershipsError) {
      console.error("Error fetching team memberships:", membershipsError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "チーム情報の取得に失敗しました" } },
        { status: 500 }
      );
    }

    const teamIds = memberships?.map((m) => m.team_id) ?? [];

    if (teamIds.length === 0) {
      return NextResponse.json({ teams: [] });
    }

    const { data: teams, error: teamsError } = await supabase
      .from("teams")
      .select("*")
      .in("id", teamIds)
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (teamsError) {
      console.error("Error fetching teams:", teamsError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "チームの取得に失敗しました" } },
        { status: 500 }
      );
    }

    return NextResponse.json({ teams: teams ?? [] });
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
    const validated = createTeamSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "入力データが不正です",
            details: validated.error.format(),
          },
        },
        { status: 400 }
      );
    }

    // チームを作成
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert(validated.data)
      .select()
      .single();

    if (teamError || !team) {
      console.error("Error creating team:", teamError);
      return NextResponse.json(
        { error: { code: "DATABASE_ERROR", message: "チームの作成に失敗しました" } },
        { status: 500 }
      );
    }

    // 作成者をオーナーとして登録
    const { error: memberError } = await supabase.from("team_members").insert({
      team_id: team.id,
      user_id: user.id,
      role: "owner",
    });

    if (memberError) {
      console.error("Error adding team owner:", memberError);
      // ロールバックまたはエラーログ
    }

    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" } },
      { status: 500 }
    );
  }
}
