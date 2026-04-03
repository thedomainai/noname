"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FitScoreInput } from "./FitScoreInput";

export function CompanyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fitScore, setFitScore] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      industry: formData.get("industry") as string,
      region: formData.get("region") as string,
      revenue: formData.get("revenue") as string,
      employees: formData.get("employees") as string,
      description: formData.get("description") as string,
      fit_score: fitScore,
    };

    try {
      const response = await fetch("/api/longlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input name="name" label="企業名" required />
      <Input name="industry" label="業種" />
      <Input name="region" label="地域" />
      <Input name="revenue" label="売上高" />
      <Input name="employees" label="従業員数" />
      <Textarea name="description" label="概要" />
      <FitScoreInput value={fitScore} onChange={setFitScore} />
      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "登録中..." : "登録"}
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
