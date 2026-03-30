"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { QAStatus } from "@/types";
import { cn } from "@/lib/utils/cn";

const statuses: Array<{ value: QAStatus | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "testing", label: "Testing" },
  { value: "approved", label: "Approved" },
  { value: "blocked", label: "Blocked" },
];

export function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "all";

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page"); // Reset to page 1 when changing filter
    router.push(`/pull-requests?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <button
          key={status.value}
          onClick={() => handleStatusChange(status.value)}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            currentStatus === status.value
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
}
