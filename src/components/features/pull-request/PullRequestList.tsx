import { PullRequest } from "@/types";
import { PullRequestCard } from "./PullRequestCard";

interface PullRequestListProps {
  pullRequests: PullRequest[];
}

export function PullRequestList({ pullRequests }: PullRequestListProps) {
  if (pullRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pull requests found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {pullRequests.map((pr) => (
        <PullRequestCard key={pr.id} pullRequest={pr} />
      ))}
    </div>
  );
}
