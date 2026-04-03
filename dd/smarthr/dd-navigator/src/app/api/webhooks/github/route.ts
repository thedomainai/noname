import { createServerClient } from "@/lib/supabase/server";
import { githubPullRequestPayloadSchema } from "@/lib/schemas/webhook";
import { NextRequest, NextResponse } from "next/server";
import { verifyGitHubSignature } from "@/lib/utils/webhook";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-hub-signature-256");

    if (!signature) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "署名がありません" } },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);

    // pull_request イベント以外はスキップ
    const event = request.headers.get("x-github-event");
    if (event !== "pull_request") {
      return NextResponse.json({ message: "Ignored event type" });
    }

    const validated = githubPullRequestPayloadSchema.safeParse(payload);
    if (!validated.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "ペイロードが不正です" } },
        { status: 400 }
      );
    }

    const { action, pull_request: pr, repository } = validated.data;
    const repoFullName = repository.full_name;

    const supabase = await createServerClient();

    // Webhook 設定を検索して署名を検証
    const { data: webhookConfig } = await supabase
      .from("webhook_configs")
      .select("*")
      .eq("platform", "github")
      .eq("repository", repoFullName)
      .eq("is_active", true)
      .single();

    if (!webhookConfig) {
      return NextResponse.json(
        { error: { code: "NOT_FOUND", message: "Webhook設定が見つかりません" } },
        { status: 404 }
      );
    }

    const isValid = await verifyGitHubSignature(
      body,
      signature,
      webhookConfig.secret_key
    );

    if (!isValid) {
      return NextResponse.json(
        { error: { code: "UNAUTHORIZED", message: "署名が無効です" } },
        { status: 401 }
      );
    }

    // opened / synchronize: PR を作成 or 更新
    if (action === "opened" || action === "synchronize" || action === "reopened") {
      await supabase.from("pull_requests").upsert(
        {
          team_id: webhookConfig.team_id,
          number: pr.number,
          title: pr.title,
          description: pr.body,
          repository: repoFullName,
          author: pr.user.login,
          url: pr.html_url,
          source: "github",
          qa_status: "pending",
        },
        {
          onConflict: "team_id,repository,number",
          ignoreDuplicates: false,
        }
      );
    }

    // closed: PR ステータスを approved に更新（マージされた場合）
    if (action === "closed") {
      await supabase
        .from("pull_requests")
        .update({ qa_status: "approved" })
        .eq("team_id", webhookConfig.team_id)
        .eq("repository", repoFullName)
        .eq("number", pr.number);
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
