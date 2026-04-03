-- ヘルパー関数: 現在のユーザーのロールを取得
CREATE OR REPLACE FUNCTION auth.user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.users WHERE id = auth.uid();
$$ LANGUAGE SQL STABLE;

-- ヘルパー関数: ユーザーがディールのメンバーかチェック
CREATE OR REPLACE FUNCTION auth.is_deal_member(deal_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.deal_members
    WHERE deal_id = deal_uuid AND user_id = auth.uid()
  );
$$ LANGUAGE SQL STABLE;

-- ヘルパー関数: ユーザーがディールのリードかチェック
CREATE OR REPLACE FUNCTION auth.is_deal_lead(deal_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.deal_members
    WHERE deal_id = deal_uuid AND user_id = auth.uid() AND role = 'lead'
  );
$$ LANGUAGE SQL STABLE;

-- Users テーブル RLS
CREATE POLICY "Users are viewable by authenticated users"
  ON public.users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can manage all users"
  ON public.users FOR ALL
  TO authenticated
  USING (auth.user_role() = 'admin');

-- Deals テーブル RLS
CREATE POLICY "Deals are viewable by admins"
  ON public.deals FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin');

CREATE POLICY "Deals are viewable by members"
  ON public.deals FOR SELECT
  TO authenticated
  USING (auth.is_deal_member(id));

CREATE POLICY "Admins can create deals"
  ON public.deals FOR INSERT
  TO authenticated
  WITH CHECK (auth.user_role() = 'admin');

CREATE POLICY "Admins and leads can update deals"
  ON public.deals FOR UPDATE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_lead(id));

CREATE POLICY "Admins can delete deals"
  ON public.deals FOR DELETE
  TO authenticated
  USING (auth.user_role() = 'admin');

-- Deal Members テーブル RLS
CREATE POLICY "Deal members are viewable by deal members"
  ON public.deal_members FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Admins and leads can manage deal members"
  ON public.deal_members FOR ALL
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_lead(deal_id));

-- Q&A Items テーブル RLS
CREATE POLICY "QA items are viewable by deal members"
  ON public.qa_items FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can create QA items"
  ON public.qa_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can update QA items"
  ON public.qa_items FOR UPDATE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Admins and leads can delete QA items"
  ON public.qa_items FOR DELETE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_lead(deal_id));

-- Documents テーブル RLS
CREATE POLICY "Documents are viewable by deal members"
  ON public.documents FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can upload documents"
  ON public.documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can update documents"
  ON public.documents FOR UPDATE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Admins and leads can delete documents"
  ON public.documents FOR DELETE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_lead(deal_id));

-- Checklist Templates テーブル RLS
CREATE POLICY "Templates are viewable by authenticated users"
  ON public.checklist_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and leads can manage templates"
  ON public.checklist_templates FOR ALL
  TO authenticated
  USING (auth.user_role() IN ('admin', 'dd_lead'));

-- Checklist Items テーブル RLS
CREATE POLICY "Checklist items are viewable by deal members"
  ON public.checklist_items FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can manage checklist items"
  ON public.checklist_items FOR ALL
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

-- Findings テーブル RLS
CREATE POLICY "Findings are viewable by deal members"
  ON public.findings FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can create findings"
  ON public.findings FOR INSERT
  TO authenticated
  WITH CHECK (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Deal members can update findings"
  ON public.findings FOR UPDATE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "Admins and leads can delete findings"
  ON public.findings FOR DELETE
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_lead(deal_id));

-- Status History テーブル RLS
CREATE POLICY "Status history is viewable by deal members"
  ON public.status_history FOR SELECT
  TO authenticated
  USING (auth.user_role() = 'admin' OR auth.is_deal_member(deal_id));

CREATE POLICY "System can insert status history"
  ON public.status_history FOR INSERT
  TO authenticated
  WITH CHECK (true);
