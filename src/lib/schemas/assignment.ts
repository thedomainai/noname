import { z } from "zod";

export const qaAssignmentSchema = z.object({
  id: z.string().uuid(),
  pull_request_id: z.string().uuid(),
  assignee_id: z.string().uuid(),
  assigned_at: z.string().datetime(),
});

export const assignQAEngineerSchema = z.object({
  assignee_id: z.string().uuid(),
});

export type QAAssignment = z.infer<typeof qaAssignmentSchema>;
export type AssignQAEngineerInput = z.infer<typeof assignQAEngineerSchema>;
