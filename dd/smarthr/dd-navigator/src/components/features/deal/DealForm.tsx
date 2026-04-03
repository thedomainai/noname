"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function DealForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      target_company: formData.get("target_company") as string,
      industry: formData.get("industry") as string,
      phase: formData.get("phase") as string,
      expected_closing_date: formData.get("expected_closing_date") as string,
      description: formData.get("description") as string,
    };

    try {
      const response = await fetch("/api/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { data: deal } = await response.json();
        router.push(`/deals/${deal.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error?.message || "案件の作成に失敗しました");
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
      <Input name="name" label="案件名" required />
      <Input name="target_company" label="対象企業名" />
      <Input name="industry" label="業種" />
      <Select
        name="phase"
        label="フェーズ"
        options={[
          { value: "sourcing", label: "ソーシング" },
          { value: "nda", label: "NDA" },
          { value: "im_review", label: "IMレビュー" },
          { value: "loi", label: "LOI" },
          { value: "dd", label: "DD" },
          { value: "negotiation", label: "最終交渉" },
          { value: "closing", label: "クロージング" },
        ]}
      />
      <Input
        name="expected_closing_date"
        label="クロージング予定日"
        type="date"
      />
      <Textarea name="description" label="案件概要" />
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "作成中..." : "作成"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
