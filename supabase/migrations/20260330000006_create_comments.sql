-- comments テーブルの作成
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pull_request_id UUID NOT NULL REFERENCES pull_requests(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_comments_pull_request_id ON comments(pull_request_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

-- コメント
COMMENT ON TABLE comments IS 'コメントテーブル';
COMMENT ON COLUMN comments.pull_request_id IS 'プルリクエストID';
COMMENT ON COLUMN comments.author_id IS 'コメント投稿者のユーザーID';
COMMENT ON COLUMN comments.screenshot_url IS 'スクリーンショット画像URL';
