import { TemplateManager } from "@/components/features/settings/TemplateManager";

export default function TemplatesSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">テンプレート管理</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TemplateManager />
      </div>
    </div>
  );
}
