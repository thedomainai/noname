-- Enable pg_trgm extension for similarity search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Helper function to check if user is member of team
CREATE OR REPLACE FUNCTION user_is_member_of_team(p_team_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM team_members
    WHERE team_id = p_team_id
      AND user_id = p_user_id
      AND deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user role in team
CREATE OR REPLACE FUNCTION user_role_in_team(p_team_id UUID, p_user_id UUID)
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role
  FROM team_members
  WHERE team_id = p_team_id
    AND user_id = p_user_id
    AND deleted_at IS NULL;

  RETURN v_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user can edit in team
CREATE OR REPLACE FUNCTION user_can_edit_in_team(p_team_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_role TEXT;
BEGIN
  v_role := user_role_in_team(p_team_id, p_user_id);
  RETURN v_role IN ('owner', 'admin', 'member');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to find similar questions using pg_trgm
CREATE OR REPLACE FUNCTION find_similar_questions(
  p_deal_id UUID,
  p_question TEXT,
  p_threshold FLOAT DEFAULT 0.3
)
RETURNS TABLE (
  id UUID,
  question TEXT,
  similarity_score FLOAT,
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qi.id,
    qi.question,
    similarity(qi.question, p_question)::FLOAT AS similarity_score,
    qi.status
  FROM qa_items qi
  WHERE
    qi.deal_id = p_deal_id
    AND qi.deleted_at IS NULL
    AND similarity(qi.question, p_question) > p_threshold
  ORDER BY similarity_score DESC
  LIMIT 10;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update storage usage
CREATE OR REPLACE FUNCTION update_storage_usage(
  p_team_id UUID,
  p_delta BIGINT
)
RETURNS VOID AS $$
BEGIN
  UPDATE teams
  SET storage_used_bytes = storage_used_bytes + p_delta
  WHERE id = p_team_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
