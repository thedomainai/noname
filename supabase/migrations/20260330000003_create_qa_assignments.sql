-- qa_assignments テーブルの作成
CREATE TABLE qa_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  assignee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_qa_assignments_pull_request_id ON qa_assignments(pull_request_id);
CREATE INDEX idx_qa_assignments_assignee_id ON qa_assignments(assignee_id);

-- コメント
COMMENT ON TABLE qa_assignments IS 'QAアサイン履歴テーブル';
COMMENT ON COLUMN qa_assignments.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN qa_assignments.assignee_id IS '担当者ID';
