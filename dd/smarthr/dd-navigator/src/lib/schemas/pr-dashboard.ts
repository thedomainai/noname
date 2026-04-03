import { z } from "zod";
import { qaStatusEnum } from "./pull-request";

export const dashboardQASummaryItemSchema = z.object({
  team_id: z.string().uuid(),
  qa_status: qaStatusEnum,
  count: z.number().int().nonnegative(),
});

export const assigneeWorkloadItemSchema = z.object({
  team_id: z.string().uuid(),
  assignee_id: z.string().uuid(),
  pr_count: z.number().int().nonnegative(),
});

export const dashboardDataSchema = z.object({
  summary: z.array(dashboardQASummaryItemSchema),
  workload: z.array(assigneeWorkloadItemSchema),
});

export type DashboardQASummaryItem = z.infer<
  typeof dashboardQASummaryItemSchema
>;
export type AssigneeWorkloadItem = z.infer<typeof assigneeWorkloadItemSchema>;
export type DashboardData = z.infer<typeof dashboardDataSchema>;
