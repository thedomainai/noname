"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DealChecklistItem } from "@/types/deal-checklist-item";

export function ChecklistItem({ item }: { item: DealChecklistItem }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/checklist/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !item.completed }),
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50/50 cursor-pointer transition-colors">
      <div className="relative">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={handleToggle}
          disabled={isLoading}
          className="sr-only peer"
        />
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
          item.completed
            ? "bg-indigo-600 border-indigo-600"
            : "border-gray-300 hover:border-indigo-400"
        } ${isLoading ? "opacity-50" : ""}`}>
          {item.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      <span className={`flex-1 text-sm transition-colors ${
        item.completed ? "line-through text-gray-400" : "text-gray-700"
      }`}>
        {item.item_text}
      </span>
      {item.completed && item.completed_at && (
        <span className="text-xs text-gray-300">
          {new Date(item.completed_at).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
        </span>
      )}
    </label>
  );
}
