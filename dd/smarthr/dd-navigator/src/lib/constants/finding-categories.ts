import type { FindingCategory, FindingSeverity } from "@/types";

export const FINDING_CATEGORIES: FindingCategory[] = [
  "risk",
  "opportunity",
  "issue",
  "information",
];

export const FINDING_CATEGORY_LABELS: Record<FindingCategory, string> = {
  risk: "リスク",
  opportunity: "機会",
  issue: "課題",
  information: "情報",
};

export const FINDING_SEVERITIES: FindingSeverity[] = [
  "critical",
  "high",
  "medium",
  "low",
];

export const FINDING_SEVERITY_LABELS: Record<FindingSeverity, string> = {
  critical: "致命的",
  high: "高",
  medium: "中",
  low: "低",
};
