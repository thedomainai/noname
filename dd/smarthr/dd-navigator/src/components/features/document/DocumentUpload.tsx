"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function DocumentUpload({ dealId }: { dealId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(`/api/deals/${dealId}/documents`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        e.currentTarget.reset();
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.error?.message || "アップロードに失敗しました");
      }
    } catch {
      setError("ネットワークエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="deal_id" value={dealId} />
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}
      <Input name="file" label="ファイル" type="file" required />
      <Input name="name" label="資料名" required />
      <Select
        name="category"
        label="カテゴリ"
        options={[
          { value: "business", label: "事業" },
          { value: "finance", label: "財務" },
          { value: "legal", label: "法務" },
          { value: "hr", label: "人事" },
          { value: "it", label: "IT" },
          { value: "other", label: "その他" },
        ]}
      />
      <Textarea name="description" label="説明" />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "アップロード中..." : "アップロード"}
      </Button>
    </form>
  );
}
