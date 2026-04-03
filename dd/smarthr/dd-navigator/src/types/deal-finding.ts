import type { FindingCategory, FindingSeverity, FindingStatus } from "./index.d";

export interface DealFinding {
  id: string;
  deal_id: string;
  title: string;
  description: string | null;
  category: FindingCategory;
  severity: FindingSeverity;
  status: FindingStatus;
  impact: string | null;
  recommendation: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
