-- RLSポリシーの作成

-- ===== users テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "users_select_authenticated"
ON users FOR SELECT
TO authenticated
USING (true);

-- INSERT: adminのみ
CREATE POLICY "users_insert_admin"
ON users FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- UPDATE: adminのみ
CREATE POLICY "users_update_admin"
ON users FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- DELETE: adminのみ
CREATE POLICY "users_delete_admin"
ON users FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== pull_requests テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "pull_requests_select_authenticated"
ON pull_requests FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "pull_requests_insert_admin_qa"
ON pull_requests FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: admin + qa_engineer
CREATE POLICY "pull_requests_update_admin_qa"
ON pull_requests FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- DELETE: adminのみ
CREATE POLICY "pull_requests_delete_admin"
ON pull_requests FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== qa_assignments テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "qa_assignments_select_authenticated"
ON qa_assignments FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "qa_assignments_insert_admin_qa"
ON qa_assignments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- DELETE: adminのみ
CREATE POLICY "qa_assignments_delete_admin"
ON qa_assignments FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== checklist_templates テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "checklist_templates_select_authenticated"
ON checklist_templates FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "checklist_templates_insert_admin_qa"
ON checklist_templates FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: admin + qa_engineer
CREATE POLICY "checklist_templates_update_admin_qa"
ON checklist_templates FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- DELETE: adminのみ
CREATE POLICY "checklist_templates_delete_admin"
ON checklist_templates FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== checklist_items テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "checklist_items_select_authenticated"
ON checklist_items FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "checklist_items_insert_admin_qa"
ON checklist_items FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: admin + qa_engineer
CREATE POLICY "checklist_items_update_admin_qa"
ON checklist_items FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- DELETE: adminのみ
CREATE POLICY "checklist_items_delete_admin"
ON checklist_items FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== comments テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "comments_select_authenticated"
ON comments FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "comments_insert_admin_qa"
ON comments FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: 自分のコメントのみ
CREATE POLICY "comments_update_own"
ON comments FOR UPDATE
TO authenticated
USING (author_id = auth.uid());

-- DELETE: adminのみ
CREATE POLICY "comments_delete_admin"
ON comments FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== blockers テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "blockers_select_authenticated"
ON blockers FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer
CREATE POLICY "blockers_insert_admin_qa"
ON blockers FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: admin + qa_engineer
CREATE POLICY "blockers_update_admin_qa"
ON blockers FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- DELETE: adminのみ
CREATE POLICY "blockers_delete_admin"
ON blockers FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== status_history テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "status_history_select_authenticated"
ON status_history FOR SELECT
TO authenticated
USING (true);

-- INSERT: admin + qa_engineer（トリガー経由で自動記録）
CREATE POLICY "status_history_insert_admin_qa"
ON status_history FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role IN ('admin', 'qa_engineer')
  )
);

-- UPDATE: なし（履歴は更新不可）

-- DELETE: adminのみ
CREATE POLICY "status_history_delete_admin"
ON status_history FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- ===== webhook_configs テーブル =====
-- SELECT: 全認証ユーザーが閲覧可能
CREATE POLICY "webhook_configs_select_authenticated"
ON webhook_configs FOR SELECT
TO authenticated
USING (true);

-- INSERT: adminのみ
CREATE POLICY "webhook_configs_insert_admin"
ON webhook_configs FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- UPDATE: adminのみ
CREATE POLICY "webhook_configs_update_admin"
ON webhook_configs FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- DELETE: adminのみ
CREATE POLICY "webhook_configs_delete_admin"
ON webhook_configs FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'admin'
  )
);
