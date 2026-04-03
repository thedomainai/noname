import { z } from "zod";

export const findingSeverityEnum = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "info",
]);

export const findingStatusEnum = z.enum([
  "open",
  "in_progress",
  "mitigated",
  "accepted",
  "closed",
]);

export const createFindingSchema = z.object({
  deal_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  category: z.string().min(1).max(100),
  severity: findingSeverityEnum,
  impact: z.string().optional(),
  recommendation: z.string().optional(),
  status: findingStatusEnum,
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().date().optional(),
});

export const updateFindingSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).optional(),
  category: z.string().min(1).max(100).optional(),
  severity: findingSeverityEnum.optional(),
  impact: z.string().optional(),
  recommendation: z.string().optional(),
  status: findingStatusEnum.optional(),
  assigned_to: z.string().uuid().optional(),
  due_date: z.string().date().optional(),
});

export const findingSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  severity: findingSeverityEnum,
  impact: z.string().nullable(),
  recommendation: z.string().nullable(),
  status: findingStatusEnum,
  assigned_to: z.string().uuid().nullable(),
  due_date: z.string().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type FindingSeverity = z.infer<typeof findingSeverityEnum>;
export type FindingStatus = z.infer<typeof findingStatusEnum>;
export type CreateFindingInput = z.infer<typeof createFindingSchema>;
export type UpdateFindingInput = z.infer<typeof updateFindingSchema>;
export type Finding = z.infer<typeof findingSchema>;
