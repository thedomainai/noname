import { DealNav } from "@/components/layout/DealNav";
import { DealDetail } from "@/components/features/deal/DealDetail";
import { PhaseTimeline } from "@/components/features/deal/PhaseTimeline";
import { DealMetrics } from "@/components/features/deal/DealMetrics";

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <DealNav dealId={id} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DealDetail dealId={id} />
        </div>
        <div className="space-y-6">
          <DealMetrics dealId={id} />
          <PhaseTimeline dealId={id} />
        </div>
      </div>
    </div>
  );
}
