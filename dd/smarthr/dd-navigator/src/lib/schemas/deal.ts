import { z } from "zod";

export const dealStatusEnum = z.enum([
  "pending",
  "sourcing",
  "pre_dd",
  "dd_in_progress",
  "dd_completed",
  "negotiation",
  "closing",
  "closed",
  "cancelled",
]);

export const dealPhaseEnum = z.number().int().min(1).max(9);

export const createDealSchema = z.object({
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(200),
  target_company: z.string().min(1).max(200),
  industry: z.string().optional(),
  deal_size: z.number().int().positive().optional(),
  status: dealStatusEnum,
  phase: dealPhaseEnum,
  started_at: z.string().datetime().optional(),
  expected_close_date: z.string().date().optional(),
});

export const updateDealSchema = z.object({
  code: z.string().min(1).max(50).optional(),
  name: z.string().min(1).max(200).optional(),
  target_company: z.string().min(1).max(200).optional(),
  industry: z.string().optional(),
  deal_size: z.number().int().positive().optional(),
  status: dealStatusEnum.optional(),
  phase: dealPhaseEnum.optional(),
  started_at: z.string().datetime().optional(),
  expected_close_date: z.string().date().optional(),
  closed_at: z.string().datetime().optional(),
});

export const updateDealPhaseSchema = z.object({
  dealId: z.string().uuid(),
  phase: z.string().min(1),
});

export const dealSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  target_company: z.string(),
  industry: z.string().nullable(),
  deal_size: z.number().nullable(),
  status: dealStatusEnum,
  phase: z.number().int(),
  started_at: z.string().nullable(),
  expected_close_date: z.string().nullable(),
  closed_at: z.string().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const listDealsQuerySchema = z.object({
  phase: dealStatusEnum.optional(),
  status: z.enum(["active", "paused", "completed", "abandoned"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type DealStatus = z.infer<typeof dealStatusEnum>;
export type CreateDealInput = z.infer<typeof createDealSchema>;
export type UpdateDealInput = z.infer<typeof updateDealSchema>;
export type ListDealsQuery = z.infer<typeof listDealsQuerySchema>;
export type Deal = z.infer<typeof dealSchema>;
