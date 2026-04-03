import type { QAStatus } from "@/types/qa-merge";

export const QA_STATUS_LABELS: Record<QAStatus, string> = {
  pending: "未着手",
  in_progress: "作業中",
  testing: "テスト中",
  approved: "承認済み",
  blocked: "ブロック",
};

export const QA_STATUS_COLORS: Record<
  QAStatus,
  {
    bg: string;
    text: string;
    border: string;
  }
> = {
  pending: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
  },
  in_progress: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-300",
  },
  testing: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-300",
  },
  approved: {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-300",
  },
  blocked: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-300",
  },
};

export const QA_STATUS_ORDER: QAStatus[] = [
  "pending",
  "in_progress",
  "testing",
  "approved",
  "blocked",
];

export const PR_SOURCE_LABELS: Record<string, string> = {
  github: "GitHub",
  gitlab: "GitLab",
  manual: "手動",
};
