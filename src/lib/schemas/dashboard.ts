import { z } from "zod";
import { qaStatusEnum } from "./pull-request";

export const dashboardSummaryItemSchema = z.object({
  qa_status: qaStatusEnum,
  count: z.number().int().nonnegative(),
});

export const assigneeWorkloadItemSchema = z.object({
  assignee_id: z.string().uuid(),
  assignee_name: z.string(),
  assignee_email: z.string(),
  pr_count: z.number().int().nonnegative(),
});

export const dashboardDataSchema = z.object({
  summary: z.array(dashboardSummaryItemSchema),
  workload: z.array(assigneeWorkloadItemSchema),
});

export type DashboardSummaryItem = z.infer<typeof dashboardSummaryItemSchema>;
export type AssigneeWorkloadItem = z.infer<typeof assigneeWorkloadItemSchema>;
export type DashboardData = z.infer<typeof dashboardDataSchema>;
