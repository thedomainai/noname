import type { QAStatus } from "@/lib/schemas/pull-request";

export const QA_STATUS: Record<QAStatus, QAStatus> = {
  pending: "pending",
  in_progress: "in_progress",
  testing: "testing",
  approved: "approved",
  blocked: "blocked",
};

export const QA_STATUS_LABELS: Record<QAStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  testing: "Testing",
  approved: "Approved",
  blocked: "Blocked",
};
