import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, "会社名は必須です").max(200),
  industry: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  revenue_jpy: z.coerce.number().int().positive().optional(),
  employee_count: z.coerce.number().int().positive().optional(),
  website_url: z.string().url("有効なURLを入力してください").optional().or(z.literal("")),
  fit_score: z.coerce.number().int().min(1).max(5).optional(),
  notes: z.string().max(2000).optional(),
  source: z.string().max(200).optional(),
  team_id: z.string().uuid("有効なチームIDを指定してください"),
});

export const listCompaniesQuerySchema = z.object({
  industry: z.string().optional(),
  region: z.string().optional(),
  fit_score: z.coerce.number().int().min(1).max(5).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type ListCompaniesQuery = z.infer<typeof listCompaniesQuerySchema>;
