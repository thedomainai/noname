-- Checklist Items テーブル
CREATE TABLE IF NOT EXISTS public.checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.checklist_templates(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  completed_by UUID REFERENCES public.users(id),
  completed_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_checklist_items_deal_id ON public.checklist_items(deal_id);
CREATE INDEX IF NOT EXISTS idx_checklist_items_template_id ON public.checklist_items(template_id);
CREATE INDEX IF NOT EXISTS idx_checklist_items_category ON public.checklist_items(category);
CREATE INDEX IF NOT EXISTS idx_checklist_items_is_completed ON public.checklist_items(is_completed);
CREATE INDEX IF NOT EXISTS idx_checklist_items_completed_by ON public.checklist_items(completed_by);
CREATE INDEX IF NOT EXISTS idx_checklist_items_created_by ON public.checklist_items(created_by);

-- updated_at の自動更新トリガー
CREATE TRIGGER trigger_checklist_items_updated_at
  BEFORE UPDATE ON public.checklist_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
