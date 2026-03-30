import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import {
  githubPullRequestPayloadSchema,
  type GitHubPullRequestPayload,
} from "@/lib/schemas/webhook";
import { createErrorResponse } from "@/lib/schemas/error";
import { verifyGitHubSignature } from "@/lib/utils/webhook";
import { handleGitHubWebhook } from "@/lib/services/webhook-handler";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-hub-signature-256");

    if (!signature) {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Missing signature"),
        { status: 401 }
      );
    }

    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // リポジトリを特定
    const repository = body.repository?.full_name;

    if (!repository) {
      return NextResponse.json(
        createErrorResponse("BAD_REQUEST", "Missing repository information"),
        { status: 400 }
      );
    }

    // Rate Limiting（リポジトリ単位で30req/min）
    const { success: withinLimit } = checkRateLimit(
      `webhook:github:${repository}`,
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
      .eq("platform", "github")
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

    // 署名検証
    if (!verifyGitHubSignature(rawBody, signature, config.secret_key)) {
      return NextResponse.json(
        createErrorResponse("UNAUTHORIZED", "Invalid signature"),
        { status: 401 }
      );
    }

    // ペイロードバリデーション
    const parsed = githubPullRequestPayloadSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Invalid GitHub webhook payload:", parsed.error);
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
    await handleGitHubWebhook(parsed.data as GitHubPullRequestPayload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unexpected error in POST /api/webhooks/github:", error);
    return NextResponse.json(
      createErrorResponse("INTERNAL_ERROR", "An unexpected error occurred"),
      { status: 500 }
    );
  }
}
