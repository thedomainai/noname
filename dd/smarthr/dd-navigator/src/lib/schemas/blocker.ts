import { z } from "zod";

export const blockerSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  resolved: z.boolean(),
  resolved_at: z.string().datetime().nullable(),
  resolved_by_id: z.string().uuid().nullable(),
  created_by_id: z.string().uuid(),
  created_at: z.string().datetime(),
});

export const createBlockerSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
});

export const updateBlockerSchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(2000).optional(),
  resolved: z.boolean().optional(),
});

export const resolveBlockerSchema = z.object({
  resolved: z.boolean(),
});

export const blockerWithDetailsSchema = blockerSchema.extend({
  created_by_name: z.string(),
  resolved_by_name: z.string().nullable(),
});

export type Blocker = z.infer<typeof blockerSchema>;
export type CreateBlockerInput = z.infer<typeof createBlockerSchema>;
export type UpdateBlockerInput = z.infer<typeof updateBlockerSchema>;
export type ResolveBlockerInput = z.infer<typeof resolveBlockerSchema>;
export type BlockerWithDetails = z.infer<typeof blockerWithDetailsSchema>;
