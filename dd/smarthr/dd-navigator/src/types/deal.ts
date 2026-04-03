import type { DealPhase, DealStatus } from "./index.d";

export interface Deal {
  id: string;
  name: string;
  target_company: string;
  industry: string | null;
  phase: DealPhase;
  status: DealStatus;
  expected_closing_date: string | null;
  description: string | null;
  team_id: string;
  longlist_company_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
