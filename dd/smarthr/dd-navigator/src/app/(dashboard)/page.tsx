import { SummaryCards } from "@/components/features/dashboard/SummaryCards";
import { RecentDeals } from "@/components/features/dashboard/RecentDeals";
import { UpcomingClosings } from "@/components/features/dashboard/UpcomingClosings";
import { PipelineView } from "@/components/features/dashboard/PipelineView";

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-sm text-gray-500 mt-1">案件パイプラインの全体像を把握</p>
      </div>

      <SummaryCards />

      <PipelineView />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDeals />
        <UpcomingClosings />
      </div>
    </div>
  );
}
