export interface DealDocument {
  id: string;
  deal_id: string;
  name: string;
  description: string | null;
  category: string | null;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string | null;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
