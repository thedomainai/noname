import {
  SummaryCards,
  WorkloadChart,
  OldPRsAlert,
} from "@/components/features/dashboard";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createServerClient();

  // Fetch dashboard summary
  const { data: summaryData } = await supabase
    .from("dashboard_summary")
    .select("*")
    .single();

  // Fetch assignee workload
  const { data: workloadData } = await supabase
    .from("assignee_workload")
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your QA review pipeline
        </p>
      </div>

      {/* Summary Cards */}
      {summaryData && <SummaryCards summary={summaryData} />}

      {/* Old PRs Alert */}
      {oldPRs && oldPRs.length > 0 && <OldPRsAlert oldPRs={oldPRs} />}

      {/* Workload Chart */}
      <div className="border border-border rounded-lg p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          QA Engineer Workload
        </h2>
        {workloadData && <WorkloadChart workload={workloadData} />}
      </div>
    </div>
  );
}
