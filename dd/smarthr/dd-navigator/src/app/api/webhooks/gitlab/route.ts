import { createServerClient } from "@/lib/supabase/server";
import { gitlabMergeRequestPayloadSchema } from "@/lib/schemas/webhook";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const secretToken = request.headers.get("x-gitlab-token");

    if (!secretToken) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "トークンがありません" } },
        { status: 401 }
      );
    }

    const payload = await request.json();

    // merge_request イベント以外はスキップ
    if (payload.object_kind !== "merge_request") {
      return NextResponse.json({ message: "Ignored event type" });
    }

    const validated = gitlabMergeRequestPayloadSchema.safeParse(payload);
    if (!validated.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "ペイロードが不正です" } },
        { status: 400 }
      );
    }

    const { object_attributes: mr, project } = validated.data;
    const repoFullName = project.path_with_namespace;

    const supabase = await createServerClient();

    // Webhook 設定を検索してトークンを検証
    const { data: webhookConfig } = await supabase
      .from("webhook_configs")
      .select("*")
      .eq("platform", "gitlab")
      .eq("repository", repoFullName)
      .eq("is_active", true)
      .single();

    if (!webhookConfig) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Webhook設定が見つかりません" } },
        { status: 404 }
      );
    }

    if (secretToken !== webhookConfig.secret_key) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "トークンが無効です" } },
        { status: 401 }
      );
    }

    const action = mr.action;

    // open / reopen / update: MR を作成 or 更新
    if (action === "open" || action === "reopen" || action === "update") {
      await supabase.from("pull_requests").upsert(
        {
          team_id: webhookConfig.team_id,
          number: mr.iid,
          title: mr.title,
          description: mr.description,
          repository: repoFullName,
          author: mr.author.username,
          url: mr.url,
          source: "gitlab",
          qa_status: "pending",
        },
        {
          onConflict: "team_id,repository,number",
          ignoreDuplicates: false,
        }
      );
    }

    // merge / close: MR ステータスを approved に更新
    if (action === "merge" || action === "close") {
      await supabase
        .from("pull_requests")
        .update({ qa_status: "approved" })
        .eq("team_id", webhookConfig.team_id)
        .eq("repository", repoFullName)
        .eq("number", mr.iid);
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Webhook処理中にエラーが発生しました" } },
      { status: 500 }
    );
  }
}
