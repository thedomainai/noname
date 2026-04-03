"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createTeamSchema, inviteMemberSchema } from "@/lib/schemas/team";
import { revalidatePath } from "next/cache";

export async function createTeam(formData: FormData) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const rawData = {
      name: formData.get("name"),
      plan: formData.get("plan") || "free",
    };

    const validated = createTeamSchema.safeParse(rawData);

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    // チームを作成
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert(validated.data)
      .select()
      .single();

    if (teamError || !team) {
      console.error("Error creating team:", teamError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "チームの作成に失敗しました",
        },
      };
    }

    // 作成者をオーナーとして登録
    const { error: memberError } = await supabase.from("team_members").insert({
      team_id: team.id,
      user_id: user.id,
      role: "owner",
    });

    if (memberError) {
      console.error("Error adding team owner:", memberError);
      // チームは作成されているが、オーナー登録に失敗
      // ロールバックするか、エラーログを残す
    }

    revalidatePath("/teams");

    return { success: true, data: team };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}

export async function inviteMember(
  teamId: string,
  email: string,
  role: string
) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { code: "UNAUTHORIZED", message: "認証が必要です" } };
    }

    const validated = inviteMemberSchema.safeParse({
      team_id: teamId,
      email,
      role,
    });

    if (!validated.success) {
      return {
        error: {
          code: "VALIDATION_ERROR",
          message: "入力データが不正です",
          details: validated.error.format(),
        },
      };
    }

    // メールアドレスからユーザーを検索
    // 注: この実装は簡略化されています。実際には招待メール送信等の処理が必要です。
    const { data: invitedUser, error: userError } = await supabase
      .from("auth.users")
      .select("id")
      .eq("email", validated.data.email)
      .single();

    if (userError || !invitedUser) {
      return {
        error: {
          code: "USER_NOT_FOUND",
          message: "指定されたメールアドレスのユーザーが見つかりません",
        },
      };
    }

    const { data: member, error: memberError } = await supabase
      .from("team_members")
      .insert({
        team_id: validated.data.team_id,
        user_id: invitedUser.id,
        role: validated.data.role,
      })
      .select()
      .single();

    if (memberError) {
      console.error("Error inviting member:", memberError);
      return {
        error: {
          code: "DATABASE_ERROR",
          message: "メンバーの招待に失敗しました",
        },
      };
    }

    revalidatePath(`/teams/${teamId}`);

    return { success: true, data: member };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      error: { code: "INTERNAL_ERROR", message: "予期しないエラーが発生しました" },
    };
  }
}
