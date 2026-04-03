import { DealNav } from "@/components/layout/DealNav";
import { FindingList } from "@/components/features/finding/FindingList";
import { FindingForm } from "@/components/features/finding/FindingForm";

export default async function DealFindingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <DealNav dealId={id} />

      <h2 className="text-2xl font-bold text-gray-900">発見事項</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FindingList dealId={id} />
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              新規発見事項
            </h3>
            <FindingForm dealId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
