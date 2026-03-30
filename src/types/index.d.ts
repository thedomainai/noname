export type Role = "admin" | "qa_engineer" | "viewer";

export type QAStatus =
  | "pending"
  | "in_progress"
  | "testing"
  | "approved"
  | "blocked";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: Role;
  created_at: string;
}

export interface PullRequest {
  id: string;
  number: number;
  title: string;
  description: string | null;
  repository: string;
  author: string;
  url: string;
  qa_status: QAStatus;
  assignee_id: string | null;
  source: "github" | "gitlab" | "manual";
  created_at: string;
  updated_at: string;
  assignee?: User | null;
}

export interface ChecklistItem {
  id: string;
  pull_request_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  completed_at: string | null;
  completed_by_id: string | null;
  created_at: string;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  description: string | null;
  items: Array<{ title: string; description?: string }>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  pull_request_id: string;
  author_id: string;
  content: string;
  screenshot_url: string | null;
  created_at: string;
  updated_at: string;
  author?: User;
}

export interface Blocker {
  id: string;
  pull_request_id: string;
  title: string;
  description: string | null;
  resolved: boolean;
  resolved_at: string | null;
  resolved_by_id: string | null;
  created_by_id: string;
  created_at: string;
}

export interface DashboardSummary {
  total_prs: number;
  pending_prs: number;
  in_progress_prs: number;
  testing_prs: number;
  approved_prs: number;
  blocked_prs: number;
}

export interface AssigneeWorkload {
  assignee_id: string;
  assignee_name: string | null;
  assignee_avatar_url: string | null;
  total_assigned: number;
  pending: number;
  in_progress: number;
  testing: number;
}

export interface WebhookConfig {
  id: string;
  platform: "github" | "gitlab";
  repository: string;
  secret_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
