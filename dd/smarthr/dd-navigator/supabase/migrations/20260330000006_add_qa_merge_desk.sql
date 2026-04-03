-- ============================================================================
-- QA Merge Desk Integration
-- DD Navigator に PR 管理機能を追加
-- ============================================================================

-- =========================================
-- 1. pull_requests テーブル
-- =========================================
CREATE TABLE pull_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  repository TEXT NOT NULL,
  author TEXT NOT NULL,
  url TEXT NOT NULL,
  qa_status TEXT NOT NULL CHECK (qa_status IN ('pending', 'in_progress', 'testing', 'approved', 'blocked')) DEFAULT 'pending',
  assignee_id UUID, -- team_members.user_id を参照（FK なし、柔軟性のため）
  source TEXT NOT NULL CHECK (source IN ('github', 'gitlab', 'manual')) DEFAULT 'github',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, repository, number)
);

CREATE INDEX idx_pull_requests_team_id ON pull_requests(team_id);
CREATE INDEX idx_pull_requests_qa_status ON pull_requests(qa_status);
CREATE INDEX idx_pull_requests_assignee_id ON pull_requests(assignee_id);
CREATE INDEX idx_pull_requests_repository ON pull_requests(repository);
CREATE INDEX idx_pull_requests_created_at ON pull_requests(created_at DESC);
CREATE INDEX idx_pull_requests_team_repository_status ON pull_requests(team_id, repository, qa_status) WHERE qa_status != 'approved';

COMMENT ON TABLE pull_requests IS 'プルリクエスト/マージリクエストテーブル';
COMMENT ON COLUMN pull_requests.team_id IS 'チームID';
COMMENT ON COLUMN pull_requests.number IS 'PR/MR番号';
COMMENT ON COLUMN pull_requests.qa_status IS 'QAステータス（pending, in_progress, testing, approved, blocked）';
COMMENT ON COLUMN pull_requests.assignee_id IS '担当QAエンジニアのユーザーID（team_members.user_id）';
COMMENT ON COLUMN pull_requests.source IS '取り込み元（github, gitlab, manual）';

-- =========================================
-- 2. qa_assignments テーブル
-- =========================================
CREATE TABLE qa_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  assignee_id UUID NOT NULL, -- team_members.user_id を参照（FK なし）
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_qa_assignments_pull_request_id ON qa_assignments(pull_request_id);
CREATE INDEX idx_qa_assignments_assignee_id ON qa_assignments(assignee_id);
CREATE INDEX idx_qa_assignments_assignee_latest ON qa_assignments(assignee_id, assigned_at DESC);

COMMENT ON TABLE qa_assignments IS 'QAアサイン履歴テーブル';
COMMENT ON COLUMN qa_assignments.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN qa_assignments.assignee_id IS '担当者ID（team_members.user_id）';

-- =========================================
-- 3. pr_checklist_templates テーブル
-- =========================================
CREATE TABLE pr_checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pr_checklist_templates_team_id ON pr_checklist_templates(team_id);
CREATE INDEX idx_pr_checklist_templates_is_active ON pr_checklist_templates(team_id, is_active) WHERE is_active = true;

COMMENT ON TABLE pr_checklist_templates IS 'PRチェックリストテンプレートテーブル（DD用checklist_templatesとは別）';
COMMENT ON COLUMN pr_checklist_templates.items IS 'チェックリスト項目の配列（JSONB）';
COMMENT ON COLUMN pr_checklist_templates.is_active IS 'テンプレートの有効/無効';

-- =========================================
-- 4. pr_checklist_items テーブル
-- =========================================
CREATE TABLE pr_checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by_id UUID, -- team_members.user_id を参照（FK なし）
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pr_checklist_items_pull_request_id ON pr_checklist_items(pull_request_id);
CREATE INDEX idx_pr_checklist_items_is_completed ON pr_checklist_items(is_completed);
CREATE INDEX idx_pr_checklist_items_pr_incomplete ON pr_checklist_items(pull_request_id, is_completed) WHERE is_completed = false;

COMMENT ON TABLE pr_checklist_items IS 'PRチェックリスト項目テーブル';
COMMENT ON COLUMN pr_checklist_items.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN pr_checklist_items.is_completed IS '完了フラグ';
COMMENT ON COLUMN pr_checklist_items.completed_by_id IS '完了者のユーザーID';

-- =========================================
-- 5. pr_comments テーブル
-- =========================================
CREATE TABLE pr_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  author_id UUID NOT NULL, -- team_members.user_id を参照（FK なし）
  content TEXT NOT NULL,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pr_comments_pull_request_id ON pr_comments(pull_request_id);
CREATE INDEX idx_pr_comments_author_id ON pr_comments(author_id);
CREATE INDEX idx_pr_comments_created_at ON pr_comments(created_at DESC);

COMMENT ON TABLE pr_comments IS 'PRコメントテーブル';
COMMENT ON COLUMN pr_comments.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN pr_comments.author_id IS 'コメント投稿者のユーザーID';
COMMENT ON COLUMN pr_comments.screenshot_url IS 'スクリーンショット画像URL';

-- =========================================
-- 6. blockers テーブル
-- =========================================
CREATE TABLE blockers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolved_by_id UUID, -- team_members.user_id を参照（FK なし）
  created_by_id UUID NOT NULL, -- team_members.user_id を参照（FK なし）
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blockers_pull_request_id ON blockers(pull_request_id);
CREATE INDEX idx_blockers_resolved ON blockers(resolved);
CREATE INDEX idx_blockers_created_by_id ON blockers(created_by_id);
CREATE INDEX idx_blockers_pr_unresolved ON blockers(pull_request_id, resolved) WHERE resolved = false;

COMMENT ON TABLE blockers IS 'ブロッカーテーブル';
COMMENT ON COLUMN blockers.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN blockers.resolved IS '解決フラグ';
COMMENT ON COLUMN blockers.resolved_by_id IS '解決者のユーザーID';
COMMENT ON COLUMN blockers.created_by_id IS 'ブロッカー登録者のユーザーID';

-- =========================================
-- 7. pr_status_history テーブル
-- =========================================
CREATE TABLE pr_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by_id UUID, -- team_members.user_id を参照（FK なし）
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pr_status_history_pull_request_id ON pr_status_history(pull_request_id);
CREATE INDEX idx_pr_status_history_changed_at ON pr_status_history(changed_at DESC);
CREATE INDEX idx_pr_status_history_pr_latest ON pr_status_history(pull_request_id, changed_at DESC);

COMMENT ON TABLE pr_status_history IS 'QAステータス変更履歴テーブル';
COMMENT ON COLUMN pr_status_history.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN pr_status_history.old_status IS '変更前のステータス';
COMMENT ON COLUMN pr_status_history.new_status IS '変更後のステータス';
COMMENT ON COLUMN pr_status_history.changed_by_id IS '変更者のユーザーID';

-- =========================================
-- 8. webhook_configs テーブル
-- =========================================
CREATE TABLE webhook_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('github', 'gitlab')),
  repository TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, platform, repository)
);

CREATE INDEX idx_webhook_configs_team_id ON webhook_configs(team_id);
CREATE INDEX idx_webhook_configs_platform_repository ON webhook_configs(platform, repository);
CREATE INDEX idx_webhook_configs_is_active ON webhook_configs(team_id, is_active) WHERE is_active = true;

COMMENT ON TABLE webhook_configs IS 'Webhook設定テーブル';
COMMENT ON COLUMN webhook_configs.team_id IS 'チームID';
COMMENT ON COLUMN webhook_configs.platform IS 'プラットフォーム（github, gitlab）';
COMMENT ON COLUMN webhook_configs.repository IS 'リポジトリ名（フルパス）';
COMMENT ON COLUMN webhook_configs.secret_key IS 'Webhook署名検証用シークレットキー';
COMMENT ON COLUMN webhook_configs.is_active IS 'Webhookの有効/無効';

-- =========================================
-- 9. RLS の有効化
-- =========================================
ALTER TABLE pull_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockers ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_configs ENABLE ROW LEVEL SECURITY;

-- =========================================
-- 10. RLS ポリシー
-- =========================================

-- ===== pull_requests =====
CREATE POLICY "Team members can view pull requests"
ON pull_requests FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
);

CREATE POLICY "Team members can insert pull requests"
ON pull_requests FOR INSERT
WITH CHECK (
  user_can_edit_in_team(team_id, auth.uid())
);

CREATE POLICY "Team members can update pull requests"
ON pull_requests FOR UPDATE
USING (
  user_can_edit_in_team(team_id, auth.uid())
);

CREATE POLICY "Team admins can delete pull requests"
ON pull_requests FOR DELETE
USING (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

-- ===== qa_assignments =====
CREATE POLICY "Team members can view qa assignments"
ON qa_assignments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = qa_assignments.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert qa assignments"
ON qa_assignments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = qa_assignments.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team admins can delete qa assignments"
ON qa_assignments FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = qa_assignments.pull_request_id
      AND user_role_in_team(pr.team_id, auth.uid()) IN ('owner', 'admin')
  )
);

-- ===== pr_checklist_templates =====
CREATE POLICY "Team members can view pr checklist templates"
ON pr_checklist_templates FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
);

CREATE POLICY "Team members can insert pr checklist templates"
ON pr_checklist_templates FOR INSERT
WITH CHECK (
  user_can_edit_in_team(team_id, auth.uid())
);

CREATE POLICY "Team members can update pr checklist templates"
ON pr_checklist_templates FOR UPDATE
USING (
  user_can_edit_in_team(team_id, auth.uid())
);

CREATE POLICY "Team admins can delete pr checklist templates"
ON pr_checklist_templates FOR DELETE
USING (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

-- ===== pr_checklist_items =====
CREATE POLICY "Team members can view pr checklist items"
ON pr_checklist_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_checklist_items.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert pr checklist items"
ON pr_checklist_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_checklist_items.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can update pr checklist items"
ON pr_checklist_items FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_checklist_items.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team admins can delete pr checklist items"
ON pr_checklist_items FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_checklist_items.pull_request_id
      AND user_role_in_team(pr.team_id, auth.uid()) IN ('owner', 'admin')
  )
);

-- ===== pr_comments =====
CREATE POLICY "Team members can view pr comments"
ON pr_comments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_comments.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert pr comments"
ON pr_comments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_comments.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Comment authors can update their own comments"
ON pr_comments FOR UPDATE
USING (
  author_id = auth.uid()
);

CREATE POLICY "Team admins can delete pr comments"
ON pr_comments FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_comments.pull_request_id
      AND user_role_in_team(pr.team_id, auth.uid()) IN ('owner', 'admin')
  )
);

-- ===== blockers =====
CREATE POLICY "Team members can view blockers"
ON blockers FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = blockers.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert blockers"
ON blockers FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = blockers.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can update blockers"
ON blockers FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = blockers.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team admins can delete blockers"
ON blockers FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = blockers.pull_request_id
      AND user_role_in_team(pr.team_id, auth.uid()) IN ('owner', 'admin')
  )
);

-- ===== pr_status_history =====
CREATE POLICY "Team members can view pr status history"
ON pr_status_history FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_status_history.pull_request_id
      AND user_is_member_of_team(pr.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert pr status history"
ON pr_status_history FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM pull_requests pr
    WHERE pr.id = pr_status_history.pull_request_id
      AND user_can_edit_in_team(pr.team_id, auth.uid())
  )
);

-- UPDATE / DELETE は不要（履歴は変更不可）

-- ===== webhook_configs =====
CREATE POLICY "Team members can view webhook configs"
ON webhook_configs FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
);

CREATE POLICY "Team admins can insert webhook configs"
ON webhook_configs FOR INSERT
WITH CHECK (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

CREATE POLICY "Team admins can update webhook configs"
ON webhook_configs FOR UPDATE
USING (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

CREATE POLICY "Team admins can delete webhook configs"
ON webhook_configs FOR DELETE
USING (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

-- =========================================
-- 11. トリガー: updated_at 自動更新
-- =========================================
CREATE TRIGGER update_pull_requests_updated_at
BEFORE UPDATE ON pull_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pr_checklist_templates_updated_at
BEFORE UPDATE ON pr_checklist_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pr_comments_updated_at
BEFORE UPDATE ON pr_comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webhook_configs_updated_at
BEFORE UPDATE ON webhook_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- 12. トリガー: QA ステータス変更履歴の記録
-- =========================================
CREATE OR REPLACE FUNCTION record_pr_qa_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.qa_status IS DISTINCT FROM NEW.qa_status THEN
    INSERT INTO pr_status_history (
      pull_request_id,
      old_status,
      new_status,
      changed_by_id
    ) VALUES (
      NEW.id,
      OLD.qa_status,
      NEW.qa_status,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER record_pull_request_status_change
AFTER UPDATE ON pull_requests
FOR EACH ROW
EXECUTE FUNCTION record_pr_qa_status_change();

-- =========================================
-- 13. ビュー: pull_request_details
-- =========================================
CREATE OR REPLACE VIEW pull_request_details AS
SELECT
  pr.id,
  pr.team_id,
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
  tm.user_id AS assignee_user_id,
  COALESCE(checklist_stats.total, 0) AS checklist_total,
  COALESCE(checklist_stats.completed, 0) AS checklist_completed,
  COALESCE(comment_stats.count, 0) AS comment_count,
  COALESCE(blocker_stats.unresolved, 0) AS unresolved_blocker_count
FROM pull_requests pr
LEFT JOIN team_members tm ON pr.assignee_id = tm.user_id AND tm.team_id = pr.team_id AND tm.deleted_at IS NULL
LEFT JOIN (
  SELECT
    pull_request_id,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE is_completed = true) AS completed
  FROM pr_checklist_items
  GROUP BY pull_request_id
) checklist_stats ON pr.id = checklist_stats.pull_request_id
LEFT JOIN (
  SELECT
    pull_request_id,
    COUNT(*) AS count
  FROM pr_comments
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

COMMENT ON VIEW pull_request_details IS 'プルリクエスト詳細ビュー（チェックリスト、コメント、ブロッカー集計を含む）';

-- =========================================
-- 14. ビュー: pr_dashboard_summary
-- =========================================
CREATE OR REPLACE VIEW pr_dashboard_summary AS
SELECT
  team_id,
  qa_status,
  COUNT(*) AS count
FROM pull_requests
GROUP BY team_id, qa_status;

COMMENT ON VIEW pr_dashboard_summary IS 'PRダッシュボードサマリービュー（チーム・ステータス別PR件数）';

-- =========================================
-- 15. ビュー: pr_assignee_workload
-- =========================================
CREATE OR REPLACE VIEW pr_assignee_workload AS
SELECT
  pr.team_id,
  tm.user_id AS assignee_id,
  COUNT(pr.id) AS pr_count
FROM team_members tm
LEFT JOIN pull_requests pr ON tm.user_id = pr.assignee_id AND tm.team_id = pr.team_id
WHERE tm.deleted_at IS NULL
  AND tm.role IN ('owner', 'admin', 'member')
GROUP BY pr.team_id, tm.user_id;

COMMENT ON VIEW pr_assignee_workload IS 'PR担当者別ワークロードビュー';
