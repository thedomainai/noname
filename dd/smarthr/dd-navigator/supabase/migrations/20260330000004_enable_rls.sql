-- Enable RLS on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE longlist_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_checklists ENABLE ROW LEVEL SECURITY;

-- Teams policies
CREATE POLICY "Users can view teams they are members of"
ON teams FOR SELECT
USING (
  user_is_member_of_team(id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Team owners can update teams"
ON teams FOR UPDATE
USING (
  user_role_in_team(id, auth.uid()) = 'owner'
  AND deleted_at IS NULL
);

-- Team members policies
CREATE POLICY "Users can view team members of their teams"
ON team_members FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Admins can invite members"
ON team_members FOR INSERT
WITH CHECK (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
);

CREATE POLICY "Admins can update members"
ON team_members FOR UPDATE
USING (
  user_role_in_team(team_id, auth.uid()) IN ('owner', 'admin')
  AND deleted_at IS NULL
);

-- Longlist companies policies
CREATE POLICY "Team members can view longlist companies"
ON longlist_companies FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Team members can create longlist companies"
ON longlist_companies FOR INSERT
WITH CHECK (
  user_is_member_of_team(team_id, auth.uid())
);

CREATE POLICY "Team members can update longlist companies"
ON longlist_companies FOR UPDATE
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

-- Deals policies
CREATE POLICY "Team members can view deals"
ON deals FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Team members with edit permission can create deals"
ON deals FOR INSERT
WITH CHECK (
  user_can_edit_in_team(team_id, auth.uid())
);

CREATE POLICY "Team members with edit permission can update deals"
ON deals FOR UPDATE
USING (
  user_can_edit_in_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

-- Deal phases policies
CREATE POLICY "Team members can view deal phases"
ON deal_phases FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = deal_phases.deal_id
      AND user_is_member_of_team(deals.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert deal phases"
ON deal_phases FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = deal_phases.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);

-- QA items policies
CREATE POLICY "Team members can view qa items"
ON qa_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = qa_items.deal_id
      AND user_is_member_of_team(deals.team_id, auth.uid())
      AND qa_items.deleted_at IS NULL
  )
);

CREATE POLICY "Team members can insert qa items"
ON qa_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = qa_items.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can update qa items"
ON qa_items FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = qa_items.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
      AND qa_items.deleted_at IS NULL
  )
);

-- Document categories policies
CREATE POLICY "Team members can view document categories"
ON document_categories FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Team members can create document categories"
ON document_categories FOR INSERT
WITH CHECK (
  user_is_member_of_team(team_id, auth.uid())
);

-- Documents policies
CREATE POLICY "Team members can view documents"
ON documents FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = documents.deal_id
      AND user_is_member_of_team(deals.team_id, auth.uid())
      AND documents.deleted_at IS NULL
  )
);

CREATE POLICY "Team members can insert documents"
ON documents FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = documents.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);

-- Findings policies
CREATE POLICY "Team members can view findings"
ON findings FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = findings.deal_id
      AND user_is_member_of_team(deals.team_id, auth.uid())
      AND findings.deleted_at IS NULL
  )
);

CREATE POLICY "Team members can insert findings"
ON findings FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = findings.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can update findings"
ON findings FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = findings.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
      AND findings.deleted_at IS NULL
  )
);

-- Checklist templates policies
CREATE POLICY "Team members can view checklist templates"
ON checklist_templates FOR SELECT
USING (
  user_is_member_of_team(team_id, auth.uid())
  AND deleted_at IS NULL
);

CREATE POLICY "Team members can create checklist templates"
ON checklist_templates FOR INSERT
WITH CHECK (
  user_is_member_of_team(team_id, auth.uid())
);

-- Checklist items policies
CREATE POLICY "Team members can view checklist items"
ON checklist_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM checklist_templates ct
    WHERE ct.id = checklist_items.template_id
      AND user_is_member_of_team(ct.team_id, auth.uid())
  )
);

-- Deal checklists policies
CREATE POLICY "Team members can view deal checklists"
ON deal_checklists FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = deal_checklists.deal_id
      AND user_is_member_of_team(deals.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can insert deal checklists"
ON deal_checklists FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = deal_checklists.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);

CREATE POLICY "Team members can update deal checklists"
ON deal_checklists FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM deals
    WHERE deals.id = deal_checklists.deal_id
      AND user_can_edit_in_team(deals.team_id, auth.uid())
  )
);
