"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddChecklistItemFormProps {
  pullRequestId: string;
  onAdd: (pullRequestId: string, title: string) => Promise<void>;
}

export function AddChecklistItemForm({
  pullRequestId,
  onAdd,
}: AddChecklistItemFormProps) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onAdd(pullRequestId, title.trim());
      setTitle(""); // Clear input on success
    } catch (error) {
      console.error("Failed to add checklist item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new checklist item..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !title.trim()}>
        Add
      </Button>
    </form>
  );
}
