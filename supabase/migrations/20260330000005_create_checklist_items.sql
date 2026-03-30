-- checklist_items テーブルの作成
CREATE TABLE checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMPTZ,
  completed_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_checklist_items_pull_request_id ON checklist_items(pull_request_id);
CREATE INDEX idx_checklist_items_is_completed ON checklist_items(is_completed);

-- コメント
COMMENT ON TABLE checklist_items IS 'チェックリスト項目テーブル';
COMMENT ON COLUMN checklist_items.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN checklist_items.is_completed IS '完了フラグ';
COMMENT ON COLUMN checklist_items.completed_by_id IS '完了者のユーザーID';
