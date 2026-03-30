import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  gitlabMergeRequestPayloadSchema,
  type GitLabMergeRequestPayload,
} from "@/lib/schemas/webhook";
import { createErrorResponse } from "@/lib/schemas/error";
import { verifyGitLabToken } from "@/lib/utils/webhook";
import { handleGitLabWebhook } from "@/lib/services/webhook-handler";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("x-gitlab-token");

    if (!token) {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Missing token"),
        { status: 401 }
      );
    }

    const body = await request.json();

    // プロジェクトを特定
    const repository = body.project?.path_with_namespace;

    if (!repository) {
      return NextResponse.json(
        createErrorResponse("BAD_REQUEST", "Missing project information"),
        { status: 400 }
      );
    }

    // Rate Limiting（リポジトリ単位で30req/min）
    const { success: withinLimit } = checkRateLimit(
      `webhook:gitlab:${repository}`,
      30,
      60 * 1000
    );
    if (!withinLimit) {
      return NextResponse.json(
        createErrorResponse("RATE_LIMIT_EXCEEDED", "Too many requests"),
        { status: 429 }
      );
    }

    // Webhook設定を取得
    const supabase = await createServerClient();
    const { data: config, error: configError } = await supabase
      .from("webhook_configs")
      .select("secret_key, is_active")
      .eq("platform", "gitlab")
      .eq("repository", repository)
      .single();

    if (configError || !config) {
      return NextResponse.json(
        createErrorResponse("NOT_FOUND", "Webhook configuration not found"),
        { status: 404 }
      );
    }

    if (!config.is_active) {
      return NextResponse.json(
        createErrorResponse("FORBIDDEN", "Webhook is disabled"),
        { status: 403 }
      );
    }

    // トークン検証
    if (!verifyGitLabToken(token, config.secret_key)) {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Invalid token"),
        { status: 401 }
      );
    }

    // ペイロードバリデーション
    const parsed = gitlabMergeRequestPayloadSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Invalid GitLab webhook payload:", parsed.error);
      return NextResponse.json(
        createErrorResponse(
          "VALIDATION_ERROR",
          "Invalid payload",
          parsed.error.format()
        ),
        { status: 400 }
      );
    }

    // Webhook処理
    await handleGitLabWebhook(parsed.data as GitLabMergeRequestPayload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error in POST /api/webhooks/gitlab:", error);
    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
