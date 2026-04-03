"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function MemberInvite() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    try {
      const response = await fetch("/api/team/invite", {
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
      <Input
        name="email"
        label="メールアドレス"
        type="email"
        placeholder="user@example.com"
        required
      />
      <Select
        name="role"
        label="ロール"
        options={[
          { value: "viewer", label: "閲覧者" },
          { value: "editor", label: "編集者" },
          { value: "admin", label: "管理者" },
        ]}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "招待中..." : "招待"}
      </Button>
    </form>
  );
}
