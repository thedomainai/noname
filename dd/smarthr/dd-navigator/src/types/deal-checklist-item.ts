export interface DealChecklistItem {
  id: string;
  deal_id: string;
  deal_checklist_id: string;
  category: string;
  item_text: string;
  completed: boolean;
  completed_at: string | null;
  completed_by: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
