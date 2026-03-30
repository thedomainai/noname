-- status_history テーブルの作成
CREATE TABLE status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_status_history_pull_request_id ON status_history(pull_request_id);
CREATE INDEX idx_status_history_changed_at ON status_history(changed_at DESC);

-- コメント
COMMENT ON TABLE status_history IS 'QAステータス変更履歴テーブル';
COMMENT ON COLUMN status_history.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN status_history.old_status IS '変更前のステータス';
COMMENT ON COLUMN status_history.new_status IS '変更後のステータス';
COMMENT ON COLUMN status_history.changed_by_id IS '変更者のユーザーID';
