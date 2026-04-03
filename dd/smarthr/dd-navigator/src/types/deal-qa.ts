import type { QACategory, QAStatus, QAPriority } from "./index.d";

export interface DealQA {
  id: string;
  deal_id: string;
  category: QACategory;
  question: string;
  answer: string | null;
  status: QAStatus;
  priority: QAPriority;
  due_date: string | null;
  assigned_to: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
