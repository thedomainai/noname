"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BlockerFormProps {
  pullRequestId: string;
  onAdd: (
    pullRequestId: string,
    title: string,
    description: string | null
  ) => Promise<void>;
}

export function BlockerForm({ pullRequestId, onAdd }: BlockerFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onAdd(
        pullRequestId,
        title.trim(),
        description.trim() || null
      );
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add blocker:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="text"
        label="Blocker Title"
        placeholder="Brief description of the issue..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        required
      />
      <div>
        <label
          htmlFor="blocker-description"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Description (Optional)
        </label>
        <textarea
          id="blocker-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Additional details..."
          disabled={isLoading}
          rows={3}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || !title.trim()}>
          Add Blocker
        </Button>
      </div>
    </form>
  );
}
