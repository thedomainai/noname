"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CommentFormProps {
  pullRequestId: string;
  onSubmit: (pullRequestId: string, content: string) => Promise<void>;
}

export function CommentForm({ pullRequestId, onSubmit }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(pullRequestId, content.trim());
      setContent(""); // Clear input on success
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
        disabled={isLoading}
        rows={3}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading || !content.trim()}>
          Post Comment
        </Button>
      </div>
    </form>
  );
}
