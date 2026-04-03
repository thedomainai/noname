import {
  QASummaryCards,
  QAWorkloadChart,
  OldPRsAlert,
} from "@/components/features/qa-dashboard";
import { createServerClient } from "@/lib/supabase/server";
import type { DashboardSummary, AssigneeWorkload, PullRequest } from "@/types/qa-merge";

export const dynamic = "force-dynamic";

export default async function QADashboardPage() {
  const supabase = await createServerClient();

  // Fetch dashboard summary (qa_dashboard_summary view returns one row per team)
  const { data: summaryRows } = await supabase
    .from("qa_dashboard_summary")
    .select("*");

  // Aggregate into a single summary object (first row for current team)
  const summaryData: DashboardSummary | null = summaryRows?.[0] ?? null;

  // Fetch assignee workload
  const { data: workloadData } = await supabase
    .from("qa_assignee_workload")
    .select("*")
    .order("total_assigned", { ascending: false });

  // Fetch old PRs (not updated in 7+ days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: oldPRs } = await supabase
    .from("pull_requests")
    .select("*")
    .lt("updated_at", sevenDaysAgo.toISOString())
    .neq("qa_status", "approved")
    .order("updated_at", { ascending: true })
    .limit(10);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">QA 管理</h1>
        <p className="text-sm text-gray-500">
          プルリクエストの QA レビューパイプライン
        </p>
      </div>

      {/* Summary Cards */}
      {summaryData && <QASummaryCards summary={summaryData} />}

      {/* Old PRs Alert */}
      {oldPRs && oldPRs.length > 0 && (
        <OldPRsAlert oldPRs={oldPRs as PullRequest[]} />
      )}

      {/* Workload Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          担当者別ワークロード
        </h2>
        {workloadData && (
          <QAWorkloadChart workload={workloadData as AssigneeWorkload[]} />
        )}
      </div>
    </div>
  );
}
