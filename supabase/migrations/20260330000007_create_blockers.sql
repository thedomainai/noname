-- blockers テーブルの作成
CREATE TABLE blockers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  resolved BOOLEAN NOT NULL DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolved_by_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_blockers_pull_request_id ON blockers(pull_request_id);
CREATE INDEX idx_blockers_resolved ON blockers(resolved);
CREATE INDEX idx_blockers_created_by_id ON blockers(created_by_id);

-- コメント
COMMENT ON TABLE blockers IS 'ブロッカーテーブル';
COMMENT ON COLUMN blockers.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN blockers.resolved IS '解決フラグ';
COMMENT ON COLUMN blockers.resolved_by_id IS '解決者のユーザーID';
COMMENT ON COLUMN blockers.created_by_id IS 'ブロッカー登録者のユーザーID';
