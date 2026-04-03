-- Checklist Templates テーブル
CREATE TABLE IF NOT EXISTS public.checklist_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_checklist_templates_category ON public.checklist_templates(category);
CREATE INDEX IF NOT EXISTS idx_checklist_templates_is_default ON public.checklist_templates(is_default);
CREATE INDEX IF NOT EXISTS idx_checklist_templates_created_by ON public.checklist_templates(created_by);

-- updated_at の自動更新トリガー
CREATE TRIGGER trigger_checklist_templates_updated_at
  BEFORE UPDATE ON public.checklist_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
