-- 追加の複合インデックス

-- pull_requests: リポジトリ別の未承認PR検索用
CREATE INDEX idx_pull_requests_repository_status ON pull_requests(repository, qa_status)
  WHERE qa_status != 'approved';

-- checklist_items: PR別の未完了チェックリスト検索用
CREATE INDEX idx_checklist_items_pr_incomplete ON checklist_items(pull_request_id, is_completed)
  WHERE is_completed = false;

-- blockers: PR別の未解決ブロッカー検索用
CREATE INDEX idx_blockers_pr_unresolved ON blockers(pull_request_id, resolved)
  WHERE resolved = false;

-- status_history: PR別の最新履歴取得用
CREATE INDEX idx_status_history_pr_latest ON status_history(pull_request_id, changed_at DESC);

-- qa_assignments: 担当者別の最新アサイン取得用
CREATE INDEX idx_qa_assignments_assignee_latest ON qa_assignments(assignee_id, assigned_at DESC);
