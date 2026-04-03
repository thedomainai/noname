-- Team members indexes
CREATE INDEX idx_team_members_team_id ON team_members(team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_team_members_user_id ON team_members(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_team_members_deleted_at ON team_members(deleted_at) WHERE deleted_at IS NULL;

-- Longlist companies indexes
CREATE INDEX idx_longlist_companies_team_id ON longlist_companies(team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_longlist_companies_created_by ON longlist_companies(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_longlist_companies_deleted_at ON longlist_companies(deleted_at) WHERE deleted_at IS NULL;

-- Deals indexes
CREATE INDEX idx_deals_team_id ON deals(team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_deals_longlist_company_id ON deals(longlist_company_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_deals_created_by ON deals(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_deals_deleted_at ON deals(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_deals_composite ON deals(team_id, current_phase, status) WHERE deleted_at IS NULL;

-- Deal phases indexes
CREATE INDEX idx_deal_phases_deal_id ON deal_phases(deal_id);
CREATE INDEX idx_deal_phases_changed_by ON deal_phases(changed_by);

-- QA items indexes
CREATE INDEX idx_qa_items_deal_id ON qa_items(deal_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_qa_items_created_by ON qa_items(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_qa_items_answered_by ON qa_items(answered_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_qa_items_duplicate_of ON qa_items(duplicate_of) WHERE deleted_at IS NULL;
CREATE INDEX idx_qa_items_deleted_at ON qa_items(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_qa_items_status ON qa_items(deal_id, status) WHERE deleted_at IS NULL;
-- GIN index for similarity search on question text
CREATE INDEX idx_qa_items_question_trgm ON qa_items USING GIN (question gin_trgm_ops);

-- Document categories indexes
CREATE INDEX idx_document_categories_team_id ON document_categories(team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_document_categories_deleted_at ON document_categories(deleted_at) WHERE deleted_at IS NULL;

-- Documents indexes
CREATE INDEX idx_documents_deal_id ON documents(deal_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_category_id ON documents(category_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_deleted_at ON documents(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_documents_composite ON documents(deal_id, category_id) WHERE deleted_at IS NULL;

-- Findings indexes
CREATE INDEX idx_findings_deal_id ON findings(deal_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_findings_related_qa_id ON findings(related_qa_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_findings_related_document_id ON findings(related_document_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_findings_created_by ON findings(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_findings_deleted_at ON findings(deleted_at) WHERE deleted_at IS NULL;

-- Checklist templates indexes
CREATE INDEX idx_checklist_templates_team_id ON checklist_templates(team_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_checklist_templates_created_by ON checklist_templates(created_by) WHERE deleted_at IS NULL;
CREATE INDEX idx_checklist_templates_deleted_at ON checklist_templates(deleted_at) WHERE deleted_at IS NULL;

-- Checklist items indexes
CREATE INDEX idx_checklist_items_template_id ON checklist_items(template_id);

-- Deal checklists indexes
CREATE INDEX idx_deal_checklists_deal_id ON deal_checklists(deal_id);
CREATE INDEX idx_deal_checklists_template_id ON deal_checklists(template_id);
CREATE INDEX idx_deal_checklists_checklist_item_id ON deal_checklists(checklist_item_id);
CREATE INDEX idx_deal_checklists_completed_by ON deal_checklists(completed_by);
