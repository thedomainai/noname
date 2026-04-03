import { z } from "zod";

export const prChecklistItemSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  is_completed: z.boolean(),
  completed_at: z.string().datetime().nullable(),
  completed_by_id: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
});

export const createPRChecklistItemSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
});

export const togglePRChecklistItemSchema = z.object({
  is_completed: z.boolean(),
});

export const prChecklistTemplateItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const prChecklistTemplateSchema = z.object({
  id: z.string().uuid(),
  team_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable(),
  items: z.array(prChecklistTemplateItemSchema),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const createPRChecklistTemplateSchema = z.object({
  team_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  items: z.array(prChecklistTemplateItemSchema),
});

export const applyTemplateSchema = z.object({
  template_id: z.string().uuid(),
});

export type PRChecklistItem = z.infer<typeof prChecklistItemSchema>;
export type CreatePRChecklistItemInput = z.infer<
  typeof createPRChecklistItemSchema
>;
export type TogglePRChecklistItemInput = z.infer<
  typeof togglePRChecklistItemSchema
>;
export type PRChecklistTemplate = z.infer<typeof prChecklistTemplateSchema>;
export type PRChecklistTemplateItem = z.infer<
  typeof prChecklistTemplateItemSchema
>;
export type CreatePRChecklistTemplateInput = z.infer<
  typeof createPRChecklistTemplateSchema
>;
export type ApplyTemplateInput = z.infer<typeof applyTemplateSchema>;
