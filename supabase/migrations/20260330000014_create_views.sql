-- ビュー: pull_request_details
-- PR + assignee + チェックリスト集計 + コメント数 + 未解決ブロッカー数
CREATE OR REPLACE VIEW pull_request_details AS
SELECT
  pr.id,
  pr.number,
  pr.title,
  pr.description,
  pr.repository,
  pr.author,
  pr.url,
  pr.qa_status,
  pr.assignee_id,
  pr.source,
  pr.created_at,
  pr.updated_at,
  u.name AS assignee_name,
  u.email AS assignee_email,
  COALESCE(checklist_stats.total, 0) AS checklist_total,
  COALESCE(checklist_stats.completed, 0) AS checklist_completed,
  COALESCE(comment_stats.count, 0) AS comment_count,
  COALESCE(blocker_stats.unresolved, 0) AS unresolved_blocker_count
FROM pull_requests pr
LEFT JOIN users u ON pr.assignee_id = u.id
LEFT JOIN (
  SELECT
    pull_request_id,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE is_completed = true) AS completed
  FROM checklist_items
  GROUP BY pull_request_id
) checklist_stats ON pr.id = checklist_stats.pull_request_id
LEFT JOIN (
  SELECT
    pull_request_id,
    COUNT(*) AS count
  FROM comments
  GROUP BY pull_request_id
) comment_stats ON pr.id = comment_stats.pull_request_id
LEFT JOIN (
  SELECT
    pull_request_id,
    COUNT(*) AS unresolved
  FROM blockers
  WHERE resolved = false
  GROUP BY pull_request_id
) blocker_stats ON pr.id = blocker_stats.pull_request_id;

-- ビュー: dashboard_summary
-- ステータス別PR件数
CREATE OR REPLACE VIEW dashboard_summary AS
SELECT
  qa_status,
  COUNT(*) AS count
FROM pull_requests
GROUP BY qa_status;

-- ビュー: assignee_workload
-- 担当者別ワークロード
CREATE OR REPLACE VIEW assignee_workload AS
SELECT
  u.id AS assignee_id,
  u.name AS assignee_name,
  u.email AS assignee_email,
  COUNT(pr.id) AS pr_count
FROM users u
LEFT JOIN pull_requests pr ON u.id = pr.assignee_id
WHERE u.role IN ('admin', 'qa_engineer')
GROUP BY u.id, u.name, u.email;

-- コメント
COMMENT ON VIEW pull_request_details IS 'プルリクエスト詳細ビュー（担当者、チェックリスト、コメント、ブロッカー集計を含む）';
COMMENT ON VIEW dashboard_summary IS 'ダッシュボードサマリービュー（ステータス別PR件数）';
COMMENT ON VIEW assignee_workload IS '担当者別ワークロードビュー';
