import { z } from "zod";

export const qaPriorityEnum = z.enum(["high", "medium", "low"]);
export const qaStatusEnum = z.enum(["open", "answered", "closed"]);

export const createQAItemSchema = z.object({
  deal_id: z.string().uuid(),
  question: z.string().min(1).max(2000),
  answer: z.string().optional(),
  category: z.string().optional(),
  priority: qaPriorityEnum,
  status: qaStatusEnum,
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().date().optional(),
});

export const updateQAItemSchema = z.object({
  question: z.string().min(1).max(2000).optional(),
  answer: z.string().optional(),
  category: z.string().optional(),
  priority: qaPriorityEnum.optional(),
  status: qaStatusEnum.optional(),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().date().optional(),
});

export const qaItemSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  question: z.string(),
  answer: z.string().nullable(),
  category: z.string().nullable(),
  priority: qaPriorityEnum,
  status: qaStatusEnum,
  assigned_to: z.string().uuid().nullable(),
  due_date: z.string().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const duplicateQARequestSchema = z.object({
  deal_id: z.string().uuid(),
  question: z.string().min(1).max(2000),
  threshold: z.number().min(0).max(1).default(0.3),
});

export const duplicateQAResultSchema = z.object({
  id: z.string().uuid(),
  question: z.string(),
  similarity: z.number(),
  answer: z.string().nullable(),
});

export const qaCategoryEnum = z.enum(["finance", "legal", "hr", "it", "business", "other"]);

export const checkDuplicateQAResponseSchema = z.object({
  has_duplicate: z.boolean(),
  duplicates: z.array(z.object({
    id: z.string().uuid(),
    question: z.string(),
    similarity_score: z.number(),
    status: qaStatusEnum,
  })).optional(),
});

// Aliases for backward compatibility
export const createQASchema = createQAItemSchema;
export const checkDuplicateQASchema = duplicateQARequestSchema;

export type QACategory = z.infer<typeof qaCategoryEnum>;
export type CheckDuplicateQAResponse = z.infer<typeof checkDuplicateQAResponseSchema>;
export type QAPriority = z.infer<typeof qaPriorityEnum>;
export type QAStatus = z.infer<typeof qaStatusEnum>;
export type CreateQAItemInput = z.infer<typeof createQAItemSchema>;
export type UpdateQAItemInput = z.infer<typeof updateQAItemSchema>;
export type QAItem = z.infer<typeof qaItemSchema>;
export type DuplicateQARequest = z.infer<typeof duplicateQARequestSchema>;
export type DuplicateQAResult = z.infer<typeof duplicateQAResultSchema>;
