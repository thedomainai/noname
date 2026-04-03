"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FindingForm({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      deal_id: dealId,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      severity: formData.get("severity") as string,
      category: formData.get("category") as string,
    };

    try {
      const response = await fetch("/api/findings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        e.currentTarget.reset();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="title" label="タイトル" required />
      <Textarea name="description" label="詳細" />
      <Select
        name="severity"
        label="重要度"
        options={[
          { value: "low", label: "低" },
          { value: "medium", label: "中" },
          { value: "high", label: "高" },
          { value: "critical", label: "致命的" },
        ]}
      />
      <Select
        name="category"
        label="カテゴリ"
        options={[
          { value: "business", label: "事業" },
          { value: "financial", label: "財務" },
          { value: "legal", label: "法務" },
          { value: "tax", label: "税務" },
          { value: "hr", label: "人事" },
          { value: "it", label: "IT" },
          { value: "other", label: "その他" },
        ]}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "登録中..." : "登録"}
      </Button>
    </form>
  );
}
