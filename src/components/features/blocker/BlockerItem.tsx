"use client";

import { Button } from "@/components/ui/button";
import { Blocker } from "@/types";
import { formatRelativeTime } from "@/lib/utils/date";
import { useState } from "react";

interface BlockerItemProps {
  blocker: Blocker;
  onResolve: (blockerId: string) => Promise<void>;
}

export function BlockerItem({ blocker, onResolve }: BlockerItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResolve = async () => {
    setIsLoading(true);
    try {
      await onResolve(blocker.id);
    } catch (error) {
      console.error("Failed to resolve blocker:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border border-border rounded-md p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground">{blocker.title}</h4>
          {blocker.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {blocker.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            {blocker.resolved
              ? `Resolved ${formatRelativeTime(blocker.resolved_at!)}`
              : `Created ${formatRelativeTime(blocker.created_at)}`}
          </p>
        </div>

        {!blocker.resolved && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleResolve}
            disabled={isLoading}
          >
            Resolve
          </Button>
        )}
      </div>
    </div>
  );
}
