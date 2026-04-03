-- Deal Members テーブル（ディールへのアクセス権限管理）
CREATE TABLE IF NOT EXISTS public.deal_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('lead', 'analyst', 'viewer')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(deal_id, user_id)
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_deal_members_deal_id ON public.deal_members(deal_id);
CREATE INDEX IF NOT EXISTS idx_deal_members_user_id ON public.deal_members(user_id);
CREATE INDEX IF NOT EXISTS idx_deal_members_role ON public.deal_members(role);
