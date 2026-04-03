import type {
  ChecklistItem as ChecklistItemType,
  ChecklistTemplate,
} from "@/types/qa-merge";
import { ChecklistItem } from "./ChecklistItem";
import { AddChecklistItemForm } from "./AddChecklistItemForm";
import { TemplateSelector } from "./TemplateSelector";

interface ChecklistSectionProps {
  items: ChecklistItemType[];
  templates: ChecklistTemplate[];
  pullRequestId: string;
  onToggleItem: (itemId: string, isCompleted: boolean) => Promise<void>;
  onAddItem: (pullRequestId: string, title: string) => Promise<void>;
  onApplyTemplate: (templateId: string) => Promise<void>;
}

export function ChecklistSection({
  items,
  templates,
  pullRequestId,
  onToggleItem,
  onAddItem,
  onApplyTemplate,
}: ChecklistSectionProps) {
  const completedCount = items.filter((item) => item.is_completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          QA Checklist
        </h2>
        <TemplateSelector
          templates={templates}
          onApply={onApplyTemplate}
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {completedCount} of {totalCount} completed
          </span>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      {items.length > 0 ? (
        <div className="space-y-1 mb-6">
          {items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 mb-6">
          <p className="text-sm text-gray-500">
            No checklist items yet. Add one below or apply a template.
          </p>
        </div>
      )}

      {/* Add Item Form */}
      <AddChecklistItemForm
        pullRequestId={pullRequestId}
        onAdd={onAddItem}
      />
    </div>
  );
}
