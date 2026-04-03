-- Deals テーブル
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  target_company TEXT NOT NULL,
  industry TEXT,
  deal_size BIGINT,
  status TEXT NOT NULL CHECK (status IN (
    'pending',
    'sourcing',
    'pre_dd',
    'dd_in_progress',
    'dd_completed',
    'negotiation',
    'closing',
    'closed',
    'cancelled'
  )),
  phase INTEGER NOT NULL CHECK (phase BETWEEN 1 AND 9),
  started_at TIMESTAMPTZ,
  expected_close_date DATE,
  closed_at TIMESTAMPTZ,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_deals_code ON public.deals(code);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_phase ON public.deals(phase);
CREATE INDEX IF NOT EXISTS idx_deals_created_by ON public.deals(created_by);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON public.deals(created_at DESC);

-- updated_at の自動更新トリガー
CREATE TRIGGER trigger_deals_updated_at
  BEFORE UPDATE ON public.deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
