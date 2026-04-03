"use client";

import { Select } from "@/components/ui/select";
import type { User } from "@/types/qa-merge";
import { useState } from "react";

interface AssigneeSelectProps {
  pullRequestId: string;
  currentAssigneeId: string | null;
  qaEngineers: User[];
  onAssign: (pullRequestId: string, assigneeId: string | null) => Promise<void>;
}

export function AssigneeSelect({
  pullRequestId,
  currentAssigneeId,
  qaEngineers,
  onAssign,
}: AssigneeSelectProps) {
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: "", label: "Unassigned" },
    ...qaEngineers.map((engineer) => ({
      value: engineer.id,
      label: engineer.name || engineer.email,
    })),
  ];

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setIsLoading(true);
    try {
      await onAssign(pullRequestId, value || null);
    } catch (error) {
      console.error("Failed to assign QA engineer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Select
      label="QA Engineer"
      options={options}
      value={currentAssigneeId || ""}
      onChange={handleChange}
      disabled={isLoading}
    />
  );
}
