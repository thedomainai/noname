"use client";

import { ChecklistItem as ChecklistItemType } from "@/types";
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
        className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 disabled:opacity-50"
        aria-label={`Mark "${item.description}" as ${isCompleted ? "incomplete" : "complete"}`}
      />
      <span
        className={`flex-1 text-sm ${
          isCompleted
            ? "text-muted-foreground line-through"
            : "text-foreground"
        }`}
      >
        {item.description}
      </span>
    </div>
  );
}
