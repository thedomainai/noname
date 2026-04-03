-- Findings テーブル
CREATE TABLE IF NOT EXISTS public.findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  impact TEXT,
  recommendation TEXT,
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'mitigated', 'accepted', 'closed')),
  assigned_to UUID REFERENCES public.users(id),
  due_date DATE,
  created_by UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_findings_deal_id ON public.findings(deal_id);
CREATE INDEX IF NOT EXISTS idx_findings_category ON public.findings(category);
CREATE INDEX IF NOT EXISTS idx_findings_severity ON public.findings(severity);
CREATE INDEX IF NOT EXISTS idx_findings_status ON public.findings(status);
CREATE INDEX IF NOT EXISTS idx_findings_assigned_to ON public.findings(assigned_to);
CREATE INDEX IF NOT EXISTS idx_findings_created_by ON public.findings(created_by);
CREATE INDEX IF NOT EXISTS idx_findings_created_at ON public.findings(created_at DESC);

-- updated_at の自動更新トリガー
CREATE TRIGGER trigger_findings_updated_at
  BEFORE UPDATE ON public.findings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
