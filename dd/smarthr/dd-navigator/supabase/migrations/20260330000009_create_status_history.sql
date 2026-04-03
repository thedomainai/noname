-- Status History テーブル（監査ログ）
CREATE TABLE IF NOT EXISTS public.status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('deal', 'qa_item', 'document', 'checklist_item', 'finding')),
  entity_id UUID NOT NULL,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID NOT NULL REFERENCES public.users(id),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  notes TEXT
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_status_history_deal_id ON public.status_history(deal_id);
CREATE INDEX IF NOT EXISTS idx_status_history_entity_type ON public.status_history(entity_type);
CREATE INDEX IF NOT EXISTS idx_status_history_entity_id ON public.status_history(entity_id);
CREATE INDEX IF NOT EXISTS idx_status_history_changed_by ON public.status_history(changed_by);
CREATE INDEX IF NOT EXISTS idx_status_history_changed_at ON public.status_history(changed_at DESC);
