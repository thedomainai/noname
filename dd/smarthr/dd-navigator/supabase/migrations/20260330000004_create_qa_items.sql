-- pg_trgm 拡張を有効化（類似度検索用）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Q&A Items テーブル
CREATE TABLE IF NOT EXISTS public.qa_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT,
  category TEXT,
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  status TEXT NOT NULL CHECK (status IN ('open', 'answered', 'closed')),
  assigned_to UUID REFERENCES public.users(id),
  due_date DATE,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_qa_items_deal_id ON public.qa_items(deal_id);
CREATE INDEX IF NOT EXISTS idx_qa_items_status ON public.qa_items(status);
CREATE INDEX IF NOT EXISTS idx_qa_items_priority ON public.qa_items(priority);
CREATE INDEX IF NOT EXISTS idx_qa_items_assigned_to ON public.qa_items(assigned_to);
CREATE INDEX IF NOT EXISTS idx_qa_items_created_by ON public.qa_items(created_by);
CREATE INDEX IF NOT EXISTS idx_qa_items_created_at ON public.qa_items(created_at DESC);

-- pg_trgm を使った類似度検索用インデックス
CREATE INDEX IF NOT EXISTS idx_qa_items_question_trgm ON public.qa_items USING gin (question gin_trgm_ops);

-- updated_at の自動更新トリガー
CREATE TRIGGER trigger_qa_items_updated_at
  BEFORE UPDATE ON public.qa_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
