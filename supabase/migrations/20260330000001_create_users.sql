-- users テーブルの作成
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'qa_engineer', 'viewer')) DEFAULT 'viewer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- コメント
COMMENT ON TABLE users IS 'ユーザー情報テーブル';
COMMENT ON COLUMN users.id IS 'ユーザーID（auth.users と連携）';
COMMENT ON COLUMN users.email IS 'メールアドレス';
COMMENT ON COLUMN users.name IS 'ユーザー名';
COMMENT ON COLUMN users.avatar_url IS 'アバター画像URL';
COMMENT ON COLUMN users.role IS 'ロール（admin, qa_engineer, viewer）';
