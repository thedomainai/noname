import { z } from "zod";

export const platformEnum = z.enum(["github", "gitlab"]);

export const webhookConfigSchema = z.object({
  id: z.string().uuid(),
  platform: platformEnum,
  repository: z.string().min(1),
  secret_key: z.string().min(1),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createWebhookConfigSchema = z.object({
  platform: platformEnum,
  repository: z.string().min(1).max(200),
  secret_key: z.string().min(1).max(500),
});

// GitHub Webhook Payload
export const githubPullRequestPayloadSchema = z.object({
  action: z.string(),
  number: z.number().int().positive(),
  pull_request: z.object({
    number: z.number().int().positive(),
    title: z.string(),
    body: z.string().nullable(),
    html_url: z.string().url(),
    user: z.object({
      login: z.string(),
    }),
  }),
  repository: z.object({
    full_name: z.string(),
  }),
});

// GitLab Webhook Payload
export const gitlabMergeRequestPayloadSchema = z.object({
  object_kind: z.literal("merge_request"),
  object_attributes: z.object({
    iid: z.number().int().positive(),
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    action: z.string(),
    author: z.object({
      username: z.string(),
    }),
  }),
  project: z.object({
    path_with_namespace: z.string(),
  }),
});

export type Platform = z.infer<typeof platformEnum>;
export type WebhookConfig = z.infer<typeof webhookConfigSchema>;
export type CreateWebhookConfigInput = z.infer<
  typeof createWebhookConfigSchema
>;
export type GitHubPullRequestPayload = z.infer<
  typeof githubPullRequestPayloadSchema
>;
export type GitLabMergeRequestPayload = z.infer<
  typeof gitlabMergeRequestPayloadSchema
>;
