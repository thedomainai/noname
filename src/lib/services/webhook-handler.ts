import { createServerClient } from "@/lib/supabase/server";
import type {
  GitHubPullRequestPayload,
  GitLabMergeRequestPayload,
} from "@/lib/schemas/webhook";

export async function handleGitHubWebhook(
  payload: GitHubPullRequestPayload
): Promise<void> {
  const supabase = await createServerClient();

  const { action, pull_request, repository } = payload;

  // 対象アクションのみ処理（opened, synchronize）
  if (!["opened", "synchronize"].includes(action)) {
    return;
  }

  const prData = {
    number: pull_request.number,
    title: pull_request.title,
    description: pull_request.body,
    repository: repository.full_name,
    author: pull_request.user.login,
    url: pull_request.html_url,
    source: "github" as const,
  };

  // 既存PRを確認
  const { data: existing } = await supabase
    .from("pull_requests")
    .select("id")
    .eq("repository", prData.repository)
    .eq("number", prData.number)
    .single();

  if (existing) {
    // 更新
    await supabase
      .from("pull_requests")
      .update({
        title: prData.title,
        description: prData.description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    // 新規作成
    await supabase.from("pull_requests").insert(prData);
  }
}

export async function handleGitLabWebhook(
  payload: GitLabMergeRequestPayload
): Promise<void> {
  const supabase = await createServerClient();

  const { object_attributes, project } = payload;

  // 対象アクションのみ処理（open, update）
  if (!["open", "update"].includes(object_attributes.action)) {
    return;
  }

  const mrData = {
    number: object_attributes.iid,
    title: object_attributes.title,
    description: object_attributes.description,
    repository: project.path_with_namespace,
    author: object_attributes.author.username,
    url: object_attributes.url,
    source: "gitlab" as const,
  };

  // 既存MRを確認
  const { data: existing } = await supabase
    .from("pull_requests")
    .select("id")
    .eq("repository", mrData.repository)
    .eq("number", mrData.number)
    .single();

  if (existing) {
    // 更新
    await supabase
      .from("pull_requests")
      .update({
        title: mrData.title,
        description: mrData.description,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    // 新規作成
    await supabase.from("pull_requests").insert(mrData);
  }
}
