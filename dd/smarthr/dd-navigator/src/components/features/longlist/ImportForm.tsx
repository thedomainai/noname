"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ImportForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/longlist/import", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/longlist");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          CSVフォーマット
        </h4>
        <p className="text-sm text-blue-800 mb-2">
          以下のカラムを含むCSVファイルをアップロードしてください:
        </p>
        <code className="text-xs text-blue-900 block bg-white p-2 rounded">
          name,industry,region,revenue,employees,description,fit_score
        </code>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="file" label="CSVファイル" type="file" required />
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "インポート中..." : "インポート"}
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
    </div>
  );
}
