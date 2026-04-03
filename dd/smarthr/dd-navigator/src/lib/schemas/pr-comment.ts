import { z } from "zod";

export const prCommentSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  author_id: z.string().uuid(),
  content: z.string().min(1),
  screenshot_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createPRCommentSchema = z.object({
  content: z.string().min(1).max(5000),
  screenshot_url: z.string().url().optional(),
});

export const updatePRCommentSchema = z.object({
  content: z.string().min(1).max(5000),
});

export const prCommentWithAuthorSchema = prCommentSchema.extend({
  author_name: z.string(),
  author_email: z.string(),
  author_avatar_url: z.string().url().nullable().optional(),
});

export type PRComment = z.infer<typeof prCommentSchema>;
export type CreatePRCommentInput = z.infer<typeof createPRCommentSchema>;
export type UpdatePRCommentInput = z.infer<typeof updatePRCommentSchema>;
export type PRCommentWithAuthor = z.infer<typeof prCommentWithAuthorSchema>;
