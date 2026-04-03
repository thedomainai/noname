import { PullRequestDetail } from "@/components/features/pull-request";
import { ChecklistSection } from "@/components/features/pr-checklist";
import { CommentList, CommentForm } from "@/components/features/pr-comment";
import { BlockerList, BlockerForm } from "@/components/features/blocker";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function PullRequestDetailPage({ params }: PageProps) {
  const supabase = await createServerClient();
  const { id } = await params;

  // Fetch PR details (no join - team_members has no FK from assignee_id)
  const { data: pullRequest } = await supabase
    .from("pull_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (!pullRequest) {
    notFound();
  }

  // Fetch checklist items
  const { data: checklistItems } = await supabase
    .from("pr_checklist_items")
    .select("*")
    .eq("pull_request_id", id)
    .order("created_at", { ascending: true });

  // Fetch checklist templates
  const { data: templates } = await supabase
    .from("pr_checklist_templates")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  // Fetch comments (no join - team_members has no name/email)
  const { data: comments } = await supabase
    .from("pr_comments")
    .select("*")
    .eq("pull_request_id", id)
    .order("created_at", { ascending: true });

  // Fetch blockers
  const { data: blockers } = await supabase
    .from("blockers")
    .select("*")
    .eq("pull_request_id", id)
    .order("created_at", { ascending: false });

  // Fetch team members for assignee select (non-viewer roles)
  const { data: teamMembers } = await supabase
    .from("team_members")
    .select("*")
    .eq("team_id", pullRequest.team_id)
    .in("role", ["owner", "admin", "member"])
    .is("deleted_at", null);

  // Server Actions
  async function assignQAEngineer(pullRequestId: string, assigneeId: string | null) {
    "use server";
    const supabase = await createServerClient();
    await supabase
      .from("pull_requests")
      .update({ assignee_id: assigneeId })
      .eq("id", pullRequestId);
    revalidatePath(`/qa/pull-requests/${pullRequestId}`);
  }

  async function toggleChecklistItem(itemId: string, isCompleted: boolean) {
    "use server";
    const supabase = await createServerClient();
    await supabase
      .from("pr_checklist_items")
      .update({ is_completed: isCompleted })
      .eq("id", itemId);
    revalidatePath(`/qa/pull-requests/${id}`);
  }

  async function addChecklistItem(pullRequestId: string, title: string) {
    "use server";
    const supabase = await createServerClient();
    await supabase
      .from("pr_checklist_items")
      .insert({
        pull_request_id: pullRequestId,
        title: title,
      });
    revalidatePath(`/qa/pull-requests/${pullRequestId}`);
  }

  async function applyChecklistTemplate(templateId: string) {
    "use server";
    const supabase = await createServerClient();

    // Fetch template (items are stored as JSONB)
    const { data: template } = await supabase
      .from("pr_checklist_templates")
      .select("items")
      .eq("id", templateId)
      .single();

    if (template?.items && Array.isArray(template.items)) {
      const items = (template.items as Array<{ title: string; description?: string }>).map(
        (item) => ({
          pull_request_id: id,
          title: item.title,
          description: item.description ?? null,
        })
      );

      if (items.length > 0) {
        await supabase.from("pr_checklist_items").insert(items);
      }
      revalidatePath(`/qa/pull-requests/${id}`);
    }
  }

  async function addComment(pullRequestId: string, content: string) {
    "use server";
    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("pr_comments").insert({
      pull_request_id: pullRequestId,
      author_id: session.user.id,
      content: content,
    });
    revalidatePath(`/qa/pull-requests/${pullRequestId}`);
  }

  async function addBlocker(
    pullRequestId: string,
    title: string,
    description: string | null
  ) {
    "use server";
    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("blockers").insert({
      pull_request_id: pullRequestId,
      title: title,
      description: description,
      created_by_id: session.user.id,
    });
    revalidatePath(`/qa/pull-requests/${pullRequestId}`);
  }

  async function resolveBlocker(blockerId: string) {
    "use server";
    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase
      .from("blockers")
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
        resolved_by_id: session.user.id,
      })
      .eq("id", blockerId);
    revalidatePath(`/qa/pull-requests/${id}`);
  }

  // Transform team_members to User[] for AssigneeSelect
  const assigneeOptions = (teamMembers || []).map((tm) => ({
    id: tm.user_id as string,
    email: `${(tm.user_id as string).slice(0, 8)}...`,
    name: null as string | null,
    avatar_url: null as string | null,
  }));

  return (
    <div className="space-y-6">
      {/* PR Detail Header */}
      <PullRequestDetail pullRequest={pullRequest} />

      {/* Assignee Select */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          担当者
        </h2>
        <label htmlFor="assignee-select" className="block text-sm font-medium text-gray-700 mb-1">
          QA Engineer
        </label>
        <select
          id="assignee-select"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          defaultValue={pullRequest.assignee_id || ""}
        >
          <option value="">Unassigned</option>
          {assigneeOptions.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      {/* Checklist Section */}
      <ChecklistSection
        items={checklistItems || []}
        templates={templates || []}
        pullRequestId={id}
        onToggleItem={toggleChecklistItem}
        onAddItem={addChecklistItem}
        onApplyTemplate={applyChecklistTemplate}
      />

      {/* Blockers */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Blockers</h2>
        <BlockerList blockers={blockers || []} onResolve={resolveBlocker} />
        <div className="border-t border-gray-200 my-6" />
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Report a Blocker
        </h3>
        <BlockerForm pullRequestId={id} onAdd={addBlocker} />
      </div>

      {/* Comments */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Comments</h2>
        <CommentList comments={comments || []} />
        <div className="border-t border-gray-200 my-6" />
        <CommentForm pullRequestId={id} onSubmit={addComment} />
      </div>
    </div>
  );
}
