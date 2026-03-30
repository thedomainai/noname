import { z } from "zod";

export const checklistItemSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().nullable(),
  is_completed: z.boolean(),
  completed_at: z.string().datetime().nullable(),
  completed_by_id: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
});

export const createChecklistItemSchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
});

export const toggleChecklistItemSchema = z.object({
  is_completed: z.boolean(),
});

export const checklistTemplateItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const checklistTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable(),
  items: z.array(checklistTemplateItemSchema),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const applyTemplateSchema = z.object({
  template_id: z.string().uuid(),
});

export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type CreateChecklistItemInput = z.infer<
  typeof createChecklistItemSchema
>;
export type ToggleChecklistItemInput = z.infer<
  typeof toggleChecklistItemSchema
>;
export type ChecklistTemplate = z.infer<typeof checklistTemplateSchema>;
export type ChecklistTemplateItem = z.infer<typeof checklistTemplateItemSchema>;
export type ApplyTemplateInput = z.infer<typeof applyTemplateSchema>;
