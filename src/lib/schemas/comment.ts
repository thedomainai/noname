import { z } from "zod";

export const commentSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  author_id: z.string().uuid(),
  content: z.string().min(1),
  screenshot_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createCommentSchema = z.object({
  content: z.string().min(1).max(5000),
  screenshot_url: z.string().url().optional(),
});

export const commentWithAuthorSchema = commentSchema.extend({
  author_name: z.string(),
  author_email: z.string(),
  author_avatar_url: z.string().url().nullable().optional(),
});

export type Comment = z.infer<typeof commentSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CommentWithAuthor = z.infer<typeof commentWithAuthorSchema>;
