export interface LonglistCompany {
  id: string;
  team_id: string;
  name: string;
  description: string | null;
  industry: string | null;
  region: string | null;
  revenue: string | null;
  employees: string | null;
  fit_score: number | null;
  source: string | null;
  notes: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
