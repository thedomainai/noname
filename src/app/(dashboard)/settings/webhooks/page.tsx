import { WebhookList } from "@/components/features/settings";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function WebhooksSettingsPage() {
  const supabase = await createServerClient();

  const { data: webhooks } = await supabase
    .from("webhook_configs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Webhooks</h1>
        <p className="text-muted-foreground">
          Configure webhook integrations for your repositories. Add webhook
          endpoints in your GitHub or GitLab repository settings, pointing to
          your QA Merge Desk webhook URL.
        </p>
      </div>

      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Webhook Endpoints
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Configure your repository webhooks to point to these URLs:
        </p>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-foreground">GitHub:</span>
            <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/github
            </code>
          </div>
          <div>
            <span className="text-sm font-medium text-foreground">GitLab:</span>
            <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
              {process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/gitlab
            </code>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Configured Webhooks
        </h2>
        <WebhookList webhooks={webhooks || []} />
      </div>
    </div>
  );
}
