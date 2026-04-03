import { z } from "zod";

export const dashboardResponseSchema = z.object({
  active_deals_count: z.number().int(),
  total_qa_items: z.number().int(),
  pending_qa_items: z.number().int(),
  total_documents: z.number().int(),
  critical_findings: z.number().int(),
  recent_deals: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      target_company: z.string(),
      current_phase: z.string(),
      status: z.string(),
      created_at: z.string(),
    })
  ),
  phase_distribution: z.array(
    z.object({
      phase: z.string(),
      count: z.number().int(),
    })
  ),
});

export type DashboardResponse = z.infer<typeof dashboardResponseSchema>;
