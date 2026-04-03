import { z } from "zod";

export const createChecklistTemplateSchema = z.object({
  name: z.string().min(1).max(200),
  category: z.string().min(1).max(100),
  items: z.array(
    z.object({
      title: z.string().min(1).max(200),
      description: z.string().optional(),
    })
  ),
  is_default: z.boolean().default(false),
});

export const createChecklistItemSchema = z.object({
  deal_id: z.string().uuid(),
  template_id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  category: z.string().min(1).max(100),
});

export const updateChecklistItemSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  category: z.string().min(1).max(100).optional(),
  is_completed: z.boolean().optional(),
  completed_by: z.string().uuid().optional(),
  completed_at: z.string().datetime().optional(),
});

export const toggleChecklistItemSchema = z.object({
  item_id: z.string().uuid(),
  is_completed: z.boolean(),
  notes: z.string().optional(),
});

export const checklistItemSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  template_id: z.string().uuid().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  category: z.string(),
  is_completed: z.boolean(),
  completed_by: z.string().uuid().nullable(),
  completed_at: z.string().nullable(),
  created_by: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type CreateChecklistTemplateInput = z.infer<
  typeof createChecklistTemplateSchema
>;
export const applyTemplateSchema = z.object({
  deal_id: z.string().uuid(),
  template_id: z.string().uuid(),
});

export type CreateChecklistItemInput = z.infer<
  typeof createChecklistItemSchema
>;
export type UpdateChecklistItemInput = z.infer<
  typeof updateChecklistItemSchema
>;
export type ApplyTemplateInput = z.infer<typeof applyTemplateSchema>;
export type ChecklistItem = z.infer<typeof checklistItemSchema>;
