import { DealNav } from "@/components/layout/DealNav";
import { QAList } from "@/components/features/qa/QAList";
import { QAForm } from "@/components/features/qa/QAForm";
import { CategoryFilter } from "@/components/features/qa/CategoryFilter";
import { QAExport } from "@/components/features/qa/QAExport";

export default async function DealQAPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { id } = await params;
  const { category } = await searchParams;
  return (
    <div className="space-y-6">
      <DealNav dealId={id} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Q&A</h2>
        <QAExport dealId={id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              新規質問
            </h3>
            <QAForm dealId={id} />
          </div>
          <QAList dealId={id} category={category} />
        </div>
        <div>
          <CategoryFilter />
        </div>
      </div>
    </div>
  );
}
