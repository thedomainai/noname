import { DealNav } from "@/components/layout/DealNav";
import { ChecklistSection } from "@/components/features/checklist/ChecklistSection";
import { TemplateSelector } from "@/components/features/checklist/TemplateSelector";

export default async function DealChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <DealNav dealId={id} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">チェックリスト</h2>
        <TemplateSelector dealId={id} />
      </div>

      <ChecklistSection dealId={id} />
    </div>
  );
}
