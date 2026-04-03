import type { QACategory } from "@/types";

export const QA_CATEGORIES: QACategory[] = [
  "finance",
  "legal",
  "hr",
  "it",
  "business",
  "other",
];

export const QA_CATEGORY_LABELS: Record<QACategory, string> = {
  finance: "財務",
  legal: "法務",
  hr: "人事・労務",
  it: "IT・システム",
  business: "事業",
  other: "その他",
};
