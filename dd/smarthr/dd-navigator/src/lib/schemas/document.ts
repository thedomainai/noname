import { z } from "zod";

export const documentStatusEnum = z.enum([
  "pending",
  "reviewed",
  "approved",
  "rejected",
]);

export const createDocumentSchema = z.object({
  deal_id: z.string().uuid(),
  name: z.string().min(1).max(200),
  path: z.string().min(1),
  size: z.number().int().positive(),
  mime_type: z.string().optional(),
  category: z.string().optional(),
  status: documentStatusEnum,
});

export const updateDocumentSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  category: z.string().optional(),
  status: documentStatusEnum.optional(),
  reviewed_by: z.string().uuid().optional(),
  reviewed_at: z.string().datetime().optional(),
});

export const listDocumentsQuerySchema = z.object({
  category_id: z.string().uuid().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(50),
});

export const documentSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  name: z.string(),
  path: z.string(),
  size: z.number(),
  mime_type: z.string().nullable(),
  category: z.string().nullable(),
  status: documentStatusEnum,
  uploaded_by: z.string().uuid(),
  uploaded_at: z.string(),
  reviewed_by: z.string().uuid().nullable(),
  reviewed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type DocumentStatus = z.infer<typeof documentStatusEnum>;
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;
export type UpdateDocumentInput = z.infer<typeof updateDocumentSchema>;
export type Document = z.infer<typeof documentSchema>;
