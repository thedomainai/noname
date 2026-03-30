-- pull_requests テーブルの作成
CREATE TABLE pull_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  repository TEXT NOT NULL,
  author TEXT NOT NULL,
  url TEXT NOT NULL,
  qa_status TEXT NOT NULL CHECK (qa_status IN ('pending', 'in_progress', 'testing', 'approved', 'blocked')) DEFAULT 'pending',
  assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  source TEXT NOT NULL CHECK (source IN ('github', 'gitlab', 'manual')) DEFAULT 'github',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(repository, number)
);

-- インデックス
CREATE INDEX idx_pull_requests_qa_status ON pull_requests(qa_status);
CREATE INDEX idx_pull_requests_assignee_id ON pull_requests(assignee_id);
CREATE INDEX idx_pull_requests_repository ON pull_requests(repository);
CREATE INDEX idx_pull_requests_created_at ON pull_requests(created_at DESC);

-- コメント
COMMENT ON TABLE pull_requests IS 'プルリクエスト/マージリクエストテーブル';
COMMENT ON COLUMN pull_requests.number IS 'PR/MR番号';
COMMENT ON COLUMN pull_requests.qa_status IS 'QAステータス（pending, in_progress, testing, approved, blocked）';
COMMENT ON COLUMN pull_requests.assignee_id IS '担当QAエンジニアのユーザーID';
COMMENT ON COLUMN pull_requests.source IS '取り込み元（github, gitlab, manual）';
