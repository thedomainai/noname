-- Create triggers for updated_at columns

-- Teams
CREATE TRIGGER update_teams_updated_at
BEFORE UPDATE ON teams
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Team members
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON team_members
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Longlist companies
CREATE TRIGGER update_longlist_companies_updated_at
BEFORE UPDATE ON longlist_companies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Deals
CREATE TRIGGER update_deals_updated_at
BEFORE UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- QA items
CREATE TRIGGER update_qa_items_updated_at
BEFORE UPDATE ON qa_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Document categories
CREATE TRIGGER update_document_categories_updated_at
BEFORE UPDATE ON document_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Documents
CREATE TRIGGER update_documents_updated_at
BEFORE UPDATE ON documents
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Findings
CREATE TRIGGER update_findings_updated_at
BEFORE UPDATE ON findings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Checklist templates
CREATE TRIGGER update_checklist_templates_updated_at
BEFORE UPDATE ON checklist_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Checklist items
CREATE TRIGGER update_checklist_items_updated_at
BEFORE UPDATE ON checklist_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Deal checklists
CREATE TRIGGER update_deal_checklists_updated_at
BEFORE UPDATE ON deal_checklists
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
