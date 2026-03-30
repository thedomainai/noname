import { PullRequestDetail, AssigneeSelect } from "@/components/features/pull-request";
import { ChecklistSection } from "@/components/features/checklist";
import { CommentList, CommentForm } from "@/components/features/comment";
import { BlockerList, BlockerForm } from "@/components/features/blocker";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  assignQAEngineerSchema,
  toggleChecklistItemSchema,
  addChecklistItemSchema,
  applyChecklistTemplateSchema,
  addCommentSchema,
  addBlockerSchema,
  resolveBlockerSchema,
} from "@/lib/schemas/server-actions";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function PullRequestDetailPage({ params }: PageProps) {
  const supabase = await createServerClient();
  const { id } = await params;

  // Fetch PR details with assignee join
  const { data: pullRequest } = await supabase
    .from("pull_requests")
    .select(
      `
      *,
      assignee:users(*)
    `
    )
    .eq("id", id)
    .single();

  if (!pullRequest) {
    notFound();
  }

  // Fetch checklist items
  const { data: checklistItems } = await supabase
    .from("checklist_items")
    .select("*")
    .eq("pull_request_id", id)
    .order("created_at", { ascending: true });

  // Fetch checklist templates
  const { data: templates } = await supabase
    .from("checklist_templates")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  // Fetch comments with author join
  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
      *,
      author:users(*)
    `
    )
    .eq("pull_request_id", id)
    .order("created_at", { ascending: true });

  // Fetch blockers
  const { data: blockers } = await supabase
    .from("blockers")
    .select("*")
    .eq("pull_request_id", id)
    .order("created_at", { ascending: false });

  // Fetch QA engineers for assignee select
  const { data: qaEngineers } = await supabase
    .from("users")
    .select("*")
    .eq("role", "qa_engineer")
    .order("name", { ascending: true });

  // Server Actions
  async function assignQAEngineer(pullRequestId: string, assigneeId: string | null) {
    "use server";
    const parsed = assignQAEngineerSchema.safeParse({ pullRequestId, assigneeId });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();
    await supabase
      .from("pull_requests")
      .update({ assignee_id: parsed.data.assigneeId })
      .eq("id", parsed.data.pullRequestId);
    revalidatePath(`/pull-requests/${parsed.data.pullRequestId}`);
  }

  async function toggleChecklistItem(itemId: string, isCompleted: boolean) {
    "use server";
    const parsed = toggleChecklistItemSchema.safeParse({ itemId, isCompleted });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();
    await supabase
      .from("checklist_items")
      .update({ is_completed: parsed.data.isCompleted })
      .eq("id", parsed.data.itemId);
    revalidatePath(`/pull-requests/${id}`);
  }

  async function addChecklistItem(pullRequestId: string, title: string) {
    "use server";
    const parsed = addChecklistItemSchema.safeParse({ pullRequestId, title });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();
    await supabase
      .from("checklist_items")
      .insert({
        pull_request_id: parsed.data.pullRequestId,
        title: parsed.data.title,
      });
    revalidatePath(`/pull-requests/${parsed.data.pullRequestId}`);
  }

  async function applyChecklistTemplate(templateId: string) {
    "use server";
    const parsed = applyChecklistTemplateSchema.safeParse({ templateId });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();

    // Fetch template (items are stored as JSONB)
    const { data: template } = await supabase
      .from("checklist_templates")
      .select("items")
      .eq("id", parsed.data.templateId)
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
        await supabase.from("checklist_items").insert(items);
      }
      revalidatePath(`/pull-requests/${id}`);
    }
  }

  async function addComment(pullRequestId: string, content: string) {
    "use server";
    const parsed = addCommentSchema.safeParse({ pullRequestId, content });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("comments").insert({
      pull_request_id: parsed.data.pullRequestId,
      author_id: session.user.id,
      content: parsed.data.content,
    });
    revalidatePath(`/pull-requests/${parsed.data.pullRequestId}`);
  }

  async function addBlocker(
    pullRequestId: string,
    title: string,
    description: string | null
  ) {
    "use server";
    const parsed = addBlockerSchema.safeParse({ pullRequestId, title, description });
    if (!parsed.success) throw new Error("Invalid input");

    const supabase = await createServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    await supabase.from("blockers").insert({
      pull_request_id: parsed.data.pullRequestId,
      title: parsed.data.title,
      description: parsed.data.description,
      created_by_id: session.user.id,
    });
    revalidatePath(`/pull-requests/${parsed.data.pullRequestId}`);
  }

  async function resolveBlocker(blockerId: string) {
    "use server";
    const parsed = resolveBlockerSchema.safeParse({ blockerId });
    if (!parsed.success) throw new Error("Invalid input");

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
      .eq("id", parsed.data.blockerId);
    revalidatePath(`/pull-requests/${id}`);
  }

  return (
    <div className="space-y-6">
      {/* PR Detail Header */}
      <PullRequestDetail pullRequest={pullRequest} />

      {/* Assignee Select */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <AssigneeSelect
          pullRequestId={id}
          currentAssigneeId={pullRequest.assignee_id}
          qaEngineers={qaEngineers || []}
          onAssign={assignQAEngineer}
        />
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
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Blockers</h2>
        <BlockerList blockers={blockers || []} onResolve={resolveBlocker} />
        <div className="border-t border-border my-6" />
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Report a Blocker
        </h3>
        <BlockerForm pullRequestId={id} onAdd={addBlocker} />
      </div>

      {/* Comments */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Comments</h2>
        <CommentList comments={comments || []} />
        <div className="border-t border-border my-6" />
        <CommentForm pullRequestId={id} onSubmit={addComment} />
      </div>
    </div>
  );
}
