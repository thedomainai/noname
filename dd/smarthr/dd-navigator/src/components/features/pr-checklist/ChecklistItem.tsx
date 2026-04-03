"use client";

import type { ChecklistItem as ChecklistItemType } from "@/types/qa-merge";
import { useState } from "react";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (itemId: string, isCompleted: boolean) => Promise<void>;
}

export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
  const [isCompleted, setIsCompleted] = useState(item.is_completed);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    const newValue = !isCompleted;
    setIsCompleted(newValue); // Optimistic update
    setIsLoading(true);

    try {
      await onToggle(item.id, newValue);
    } catch (error) {
      // Rollback on error
      setIsCompleted(!newValue);
      console.error("Failed to toggle checklist item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-3 py-2">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        disabled={isLoading}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 disabled:opacity-50"
        aria-label={`Mark "${item.title}" as ${isCompleted ? "incomplete" : "complete"}`}
      />
      <span
        className={`flex-1 text-sm ${
          isCompleted
            ? "text-gray-500 line-through"
            : "text-gray-900"
        }`}
      >
        {item.title}
      </span>
    </div>
  );
}
