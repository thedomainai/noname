"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DuplicateWarning } from "./DuplicateWarning";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface SimilarQuestion {
  id: string;
  question: string;
  similarity_score: number;
  status: string;
}

export function QAForm({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("business");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duplicates, setDuplicates] = useState<SimilarQuestion[]>([]);

  const debouncedQuestion = useDebounce(question, 300);

  // 重複チェック
  useEffect(() => {
    if (debouncedQuestion.length > 10) {
      fetch(`/api/deals/${dealId}/qa/check-duplicate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: debouncedQuestion }),
      })
        .then((res) => res.json())
        .then((data) => setDuplicates(data.duplicates || []))
        .catch(() => setDuplicates([]));
    } else {
      setDuplicates([]);
    }
  }, [debouncedQuestion, dealId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/deals/${dealId}/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deal_id: dealId, question, category }),
      });

      if (response.ok) {
        setQuestion("");
        setCategory("business");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error?.message || "質問の送信に失敗しました");
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        name="category"
        label="カテゴリ"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={[
          { value: "business", label: "事業" },
          { value: "finance", label: "財務" },
          { value: "legal", label: "法務" },
          { value: "hr", label: "人事" },
          { value: "it", label: "IT" },
          { value: "other", label: "その他" },
        ]}
      />
      <Textarea
        label="質問内容"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="質問を入力..."
        required
      />
      {duplicates.length > 0 && <DuplicateWarning duplicates={duplicates} />}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "送信中..." : "質問を送信"}
      </Button>
    </form>
  );
}
