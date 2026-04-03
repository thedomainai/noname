/**
 * QA Merge Desk 統合の型定義
 */

export type QAStatus =
  | "pending"
  | "in_progress"
  | "testing"
  | "approved"
  | "blocked";

export type PRSource = "github" | "gitlab" | "manual";

export type Platform = "github" | "gitlab";

export interface PullRequest {
  id: string;
  team_id: string;
  number: number;
  title: string;
  description: string | null;
  repository: string;
  author: string;
  url: string;
  qa_status: QAStatus;
  assignee_id: string | null;
  source: PRSource;
  created_at: string;
  updated_at: string;
}

export interface PullRequestWithDetails extends PullRequest {
  assignee_user_id: string | null;
  checklist_total: number;
  checklist_completed: number;
  comment_count: number;
  unresolved_blocker_count: number;
}

export interface QAAssignment {
  id: string;
  pull_request_id: string;
  assignee_id: string;
  assigned_at: string;
}

export interface PRChecklistTemplate {
  id: string;
  team_id: string;
  name: string;
  description: string | null;
  items: PRChecklistTemplateItem[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PRChecklistTemplateItem {
  title: string;
  description?: string;
}

export interface PRChecklistItem {
  id: string;
  pull_request_id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  completed_at: string | null;
  completed_by_id: string | null;
  created_at: string;
}

export interface PRComment {
  id: string;
  pull_request_id: string;
  author_id: string;
  content: string;
  screenshot_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PRCommentWithAuthor extends PRComment {
  author_name: string;
  author_email: string;
  author_avatar_url?: string | null;
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

export interface BlockerWithDetails extends Blocker {
  created_by_name: string;
  resolved_by_name: string | null;
}

export interface PRStatusHistory {
  id: string;
  pull_request_id: string;
  old_status: string | null;
  new_status: string;
  changed_by_id: string | null;
  changed_at: string;
}

export interface WebhookConfig {
  id: string;
  team_id: string;
  platform: Platform;
  repository: string;
  secret_key: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DashboardQASummary {
  team_id: string;
  qa_status: QAStatus;
  count: number;
}

export interface AssigneeWorkload {
  team_id: string;
  assignee_id: string;
  assignee_name: string | null;
  assignee_avatar_url: string | null;
  total_assigned: number;
  pending: number;
  in_progress: number;
  testing: number;
}

export interface DashboardSummary {
  team_id: string;
  total_prs: number;
  pending_prs: number;
  in_progress_prs: number;
  testing_prs: number;
  approved_prs: number;
  blocked_prs: number;
}

export interface DashboardData {
  summary: DashboardQASummary[];
  workload: AssigneeWorkload[];
}

// UI コンポーネント用: PullRequest に assignee 情報を含む
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
}

export interface PullRequestWithAssignee extends PullRequest {
  assignee?: User | null;
}

// Alias types for backward compatibility with .d.ts consumers
export type ChecklistItem = PRChecklistItem;
export type ChecklistTemplate = PRChecklistTemplate;
export type Comment = PRComment;

// GitHub Webhook Payload
export interface GitHubPullRequestPayload {
  action: string;
  number: number;
  pull_request: {
    number: number;
    title: string;
    body: string | null;
    html_url: string;
    user: {
      login: string;
    };
  };
  repository: {
    full_name: string;
  };
}

// GitLab Webhook Payload
export interface GitLabMergeRequestPayload {
  object_kind: "merge_request";
  object_attributes: {
    iid: number;
    title: string;
    description: string | null;
    url: string;
    action: string;
    author: {
      username: string;
    };
  };
  project: {
    path_with_namespace: string;
  };
}
