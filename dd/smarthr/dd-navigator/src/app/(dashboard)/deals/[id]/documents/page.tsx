import { DealNav } from "@/components/layout/DealNav";
import { DocumentList } from "@/components/features/document/DocumentList";
import { DocumentUpload } from "@/components/features/document/DocumentUpload";
import { CategoryFilter } from "@/components/features/document/CategoryFilter";

export default async function DealDocumentsPage({
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
        <h2 className="text-2xl font-bold text-gray-900">資料管理</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              資料アップロード
            </h3>
            <DocumentUpload dealId={id} />
          </div>
          <DocumentList dealId={id} category={category} />
        </div>
        <div>
          <CategoryFilter />
        </div>
      </div>
    </div>
  );
}
