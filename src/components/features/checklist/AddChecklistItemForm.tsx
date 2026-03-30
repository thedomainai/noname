"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddChecklistItemFormProps {
  pullRequestId: string;
  onAdd: (pullRequestId: string, description: string) => Promise<void>;
}

export function AddChecklistItemForm({
  pullRequestId,
  onAdd,
}: AddChecklistItemFormProps) {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsLoading(true);
    try {
      await onAdd(pullRequestId, description.trim());
      setDescription(""); // Clear input on success
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" disabled={isLoading || !description.trim()}>
        Add
      </Button>
    </form>
  );
}
