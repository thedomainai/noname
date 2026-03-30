-- webhook_configs テーブルの作成
CREATE TABLE webhook_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('github', 'gitlab')),
  repository TEXT NOT NULL,
  secret_key TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(platform, repository)
);

-- インデックス
CREATE INDEX idx_webhook_configs_platform_repository ON webhook_configs(platform, repository);
CREATE INDEX idx_webhook_configs_is_active ON webhook_configs(is_active);

-- コメント
COMMENT ON TABLE webhook_configs IS 'Webhook設定テーブル';
COMMENT ON COLUMN webhook_configs.platform IS 'プラットフォーム（github, gitlab）';
COMMENT ON COLUMN webhook_configs.repository IS 'リポジトリ名（フルパス）';
COMMENT ON COLUMN webhook_configs.secret_key IS 'Webhook署名検証用シークレットキー';
COMMENT ON COLUMN webhook_configs.is_active IS 'Webhookの有効/無効';
