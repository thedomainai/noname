import { z } from "zod";

export const qaStatusEnum = z.enum([
  "pending",
  "in_progress",
  "testing",
  "approved",
  "blocked",
]);

export const sourceEnum = z.enum(["github", "gitlab", "manual"]);

export const pullRequestSchema = z.object({
  id: z.string().uuid(),
  team_id: z.string().uuid(),
  number: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().nullable(),
  repository: z.string().min(1),
  author: z.string().min(1),
  url: z.string().url(),
  qa_status: qaStatusEnum,
  assignee_id: z.string().uuid().nullable(),
  source: sourceEnum,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createPullRequestSchema = z.object({
  team_id: z.string().uuid(),
  number: z.number().int().positive(),
  title: z.string().min(1).max(500),
  description: z.string().optional(),
  repository: z.string().min(1).max(200),
  author: z.string().min(1).max(200),
  url: z.string().url(),
  source: sourceEnum.optional().default("manual"),
});

export const updatePullRequestSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().optional(),
  qa_status: qaStatusEnum.optional(),
  assignee_id: z.string().uuid().nullable().optional(),
});

export const updateQAStatusSchema = z.object({
  qa_status: qaStatusEnum,
});

export const listPullRequestsQuerySchema = z.object({
  team_id: z.string().uuid(),
  status: qaStatusEnum.optional(),
  assignee_id: z.string().uuid().optional(),
  repository: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

export const pullRequestWithDetailsSchema = pullRequestSchema.extend({
  assignee_user_id: z.string().uuid().nullable(),
  checklist_total: z.number().int().nonnegative(),
  checklist_completed: z.number().int().nonnegative(),
  comment_count: z.number().int().nonnegative(),
  unresolved_blocker_count: z.number().int().nonnegative(),
});

export const listPullRequestsResponseSchema = z.object({
  data: z.array(pullRequestWithDetailsSchema),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
});

export const assignAssigneeSchema = z.object({
  assignee_id: z.string().uuid(),
});

export type QAStatus = z.infer<typeof qaStatusEnum>;
export type Source = z.infer<typeof sourceEnum>;
export type PullRequest = z.infer<typeof pullRequestSchema>;
export type CreatePullRequestInput = z.infer<typeof createPullRequestSchema>;
export type UpdatePullRequestInput = z.infer<typeof updatePullRequestSchema>;
export type UpdateQAStatusInput = z.infer<typeof updateQAStatusSchema>;
export type ListPullRequestsQuery = z.infer<typeof listPullRequestsQuerySchema>;
export type PullRequestWithDetails = z.infer<
  typeof pullRequestWithDetailsSchema
>;
export type ListPullRequestsResponse = z.infer<
  typeof listPullRequestsResponseSchema
>;
export type AssignAssigneeInput = z.infer<typeof assignAssigneeSchema>;
