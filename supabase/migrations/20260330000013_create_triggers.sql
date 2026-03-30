-- トリガー関数: updated_at 自動更新
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガー: users
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- トリガー: pull_requests
CREATE TRIGGER update_pull_requests_updated_at
BEFORE UPDATE ON pull_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- トリガー: checklist_templates
CREATE TRIGGER update_checklist_templates_updated_at
BEFORE UPDATE ON checklist_templates
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- トリガー: comments
CREATE TRIGGER update_comments_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- トリガー: webhook_configs
CREATE TRIGGER update_webhook_configs_updated_at
BEFORE UPDATE ON webhook_configs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- トリガー関数: QAステータス変更履歴の記録
CREATE OR REPLACE FUNCTION record_qa_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.qa_status IS DISTINCT FROM NEW.qa_status THEN
    INSERT INTO status_history (
      pull_request_id,
      old_status,
      new_status,
      changed_by_id
    ) VALUES (
      NEW.id,
      OLD.qa_status,
      NEW.qa_status,
      auth.uid()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガー: pull_requests のステータス変更時に履歴記録
CREATE TRIGGER record_pull_request_status_change
AFTER UPDATE ON pull_requests
FOR EACH ROW
EXECUTE FUNCTION record_qa_status_change();
