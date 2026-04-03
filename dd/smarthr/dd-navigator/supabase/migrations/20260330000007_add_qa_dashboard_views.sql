-- ============================================================================
-- QA Dashboard ビュー（フロントエンド用の集計ビュー）
-- pr_dashboard_summary / pr_assignee_workload は raw データ形式
-- qa_dashboard_summary / qa_assignee_workload はフロントエンド表示用に集計済み
-- ============================================================================

-- =========================================
-- 1. qa_dashboard_summary: チーム単位の PR ステータス集計
-- =========================================
CREATE OR REPLACE VIEW qa_dashboard_summary AS
SELECT
  pr.team_id,
  COUNT(*)::integer AS total_prs,
  COUNT(*) FILTER (WHERE qa_status = 'pending')::integer AS pending_prs,
  COUNT(*) FILTER (WHERE qa_status = 'in_progress')::integer AS in_progress_prs,
  COUNT(*) FILTER (WHERE qa_status = 'testing')::integer AS testing_prs,
  COUNT(*) FILTER (WHERE qa_status = 'approved')::integer AS approved_prs,
  COUNT(*) FILTER (WHERE qa_status = 'blocked')::integer AS blocked_prs
FROM pull_requests pr
GROUP BY pr.team_id;

COMMENT ON VIEW qa_dashboard_summary IS 'QAダッシュボード用サマリービュー（チーム単位のPRステータス集計）';

-- =========================================
-- 2. qa_assignee_workload: 担当者別ワークロード（名前・アバター付き）
-- =========================================
CREATE OR REPLACE VIEW qa_assignee_workload AS
SELECT
  pr.team_id,
  pr.assignee_id,
  pr.assignee_id::text AS assignee_name,
  NULL::text AS assignee_avatar_url,
  COUNT(*)::integer AS total_assigned,
  COUNT(*) FILTER (WHERE qa_status = 'pending')::integer AS pending,
  COUNT(*) FILTER (WHERE qa_status = 'in_progress')::integer AS in_progress,
  COUNT(*) FILTER (WHERE qa_status = 'testing')::integer AS testing
FROM pull_requests pr
WHERE pr.assignee_id IS NOT NULL
GROUP BY pr.team_id, pr.assignee_id;

COMMENT ON VIEW qa_assignee_workload IS 'QA担当者別ワークロードビュー（ステータス内訳付き）';
