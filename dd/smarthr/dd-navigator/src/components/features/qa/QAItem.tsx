"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { DealQA } from "@/types/deal-qa";

const categoryLabels: Record<string, string> = {
  finance: "財務",
  legal: "法務",
  hr: "人事",
  it: "IT",
  business: "事業",
  other: "その他",
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: "高", color: "bg-red-50 text-red-700" },
  medium: { label: "中", color: "bg-amber-50 text-amber-700" },
  low: { label: "低", color: "bg-gray-50 text-gray-500" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: "下書き", color: "bg-gray-100 text-gray-600" },
  sent: { label: "送信済", color: "bg-blue-50 text-blue-700" },
  received: { label: "回答済", color: "bg-emerald-50 text-emerald-700" },
  clarification_needed: { label: "要確認", color: "bg-amber-50 text-amber-700" },
};

export function QAItem({ qa }: { qa: DealQA }) {
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState(qa.answer || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/qa/${qa.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const status = statusConfig[qa.status] ?? { label: qa.status, color: "bg-gray-100 text-gray-600" };
  const priority = priorityConfig[qa.priority] ?? { label: qa.priority, color: "bg-gray-50 text-gray-500" };
  const categoryLabel = categoryLabels[qa.category] ?? qa.category;

  return (
    <div className="bg-white rounded-xl border border-gray-200/60 overflow-hidden">
      {/* Header bar */}
      <div className="px-5 py-3 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${status.color}`}>
            {status.label}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${priority.color}`}>
            優先度: {priority.label}
          </span>
          <Badge variant="outline" className="text-xs">{categoryLabel}</Badge>
        </div>
        {qa.due_date && (
          <span className="text-xs text-gray-400">
            期限: {new Date(qa.due_date).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Question */}
        <div>
          <p className="text-sm font-medium text-gray-900 leading-relaxed">{qa.question}</p>
        </div>

        {/* Answer */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 mb-2">回答</p>
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="回答を入力..."
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} disabled={isLoading} size="sm">
                  {isLoading ? "保存中..." : "保存"}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  size="sm"
                >
                  キャンセル
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {qa.answer ? (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-emerald-50/50 border border-emerald-100 rounded-lg p-3">
                  {qa.answer}
                </p>
              ) : (
                <p className="text-sm text-gray-400 italic">未回答</p>
              )}
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="mt-3"
              >
                {qa.answer ? "編集" : "回答を入力"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
