import {
  PullRequestList,
  StatusFilter,
} from "@/components/features/pull-request";
import { createServerClient } from "@/lib/supabase/server";
import type { QAStatus } from "@/types";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 20;

const VALID_STATUSES: QAStatus[] = [
  "pending",
  "in_progress",
  "testing",
  "approved",
  "blocked",
];

export default async function PullRequestsPage({ searchParams }: PageProps) {
  const supabase = await createServerClient();
  const resolvedParams = await searchParams;
  const statusParam = resolvedParams.status;
  const page = Number(resolvedParams.page) || 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  // Validate status param
  const status =
    statusParam && VALID_STATUSES.includes(statusParam as QAStatus)
      ? (statusParam as QAStatus)
      : undefined;

  // Build query
  let query = supabase
    .from("pull_requests")
    .select(
      `
      *,
      assignee:users(*)
    `,
      { count: "exact" }
    )
    .order("updated_at", { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  // Apply status filter
  if (status) {
    query = query.eq("qa_status", status);
  }

  const { data: pullRequests, count } = await query;

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Pull Requests
          </h1>
          <p className="text-muted-foreground">
            Manage QA reviews for all pull requests
          </p>
        </div>
      </div>

      {/* Status Filter */}
      <StatusFilter />

      {/* Pull Request List */}
      {pullRequests && <PullRequestList pullRequests={pullRequests} />}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Link
            href={`/pull-requests?${new URLSearchParams({
              ...(status ? { status } : {}),
              page: String(Math.max(1, page - 1)),
            }).toString()}`}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              page === 1
                ? "pointer-events-none opacity-50 bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Previous
          </Link>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`/pull-requests?${new URLSearchParams({
              ...(status ? { status } : {}),
              page: String(Math.min(totalPages, page + 1)),
            }).toString()}`}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              page === totalPages
                ? "pointer-events-none opacity-50 bg-muted text-muted-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
