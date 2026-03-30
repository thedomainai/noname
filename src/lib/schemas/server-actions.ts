import { z } from "zod";

export const assignQAEngineerSchema = z.object({
  pullRequestId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable(),
});

export const toggleChecklistItemSchema = z.object({
  itemId: z.string().uuid(),
  isCompleted: z.boolean(),
});

export const addChecklistItemSchema = z.object({
  pullRequestId: z.string().uuid(),
  title: z.string().min(1).max(500),
});

export const applyChecklistTemplateSchema = z.object({
  templateId: z.string().uuid(),
});

export const addCommentSchema = z.object({
  pullRequestId: z.string().uuid(),
  content: z.string().min(1).max(10000),
});

export const addBlockerSchema = z.object({
  pullRequestId: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().max(5000).nullable(),
});

export const resolveBlockerSchema = z.object({
  blockerId: z.string().uuid(),
});
