-- checklist_templates テーブルの作成
CREATE TABLE checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_checklist_templates_is_active ON checklist_templates(is_active);

-- コメント
COMMENT ON TABLE checklist_templates IS 'チェックリストテンプレートテーブル';
COMMENT ON COLUMN checklist_templates.items IS 'チェックリスト項目の配列（JSONB）';
COMMENT ON COLUMN checklist_templates.is_active IS 'テンプレートの有効/無効';
