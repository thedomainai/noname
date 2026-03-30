import Link from "next/link";
import { PullRequest } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { formatRelativeTime } from "@/lib/utils/date";

interface PullRequestCardProps {
  pullRequest: PullRequest;
}

export function PullRequestCard({ pullRequest }: PullRequestCardProps) {
  return (
    <Link href={`/pull-requests/${pullRequest.id}`}>
      <div className="block border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">
              {pullRequest.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {pullRequest.repository} #{pullRequest.number}
            </p>
          </div>
          <StatusBadge status={pullRequest.qa_status} />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
              {pullRequest.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-muted-foreground">
              {pullRequest.author}
            </span>
          </div>

          {pullRequest.assignee && (
            <>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-2">
                {pullRequest.assignee.avatar_url ? (
                  <img
                    src={pullRequest.assignee.avatar_url}
                    alt={pullRequest.assignee.name || pullRequest.assignee.email}
                    className="h-6 w-6 rounded-full"
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                    {(
                      pullRequest.assignee.name || pullRequest.assignee.email
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-muted-foreground">
                  {pullRequest.assignee.name || pullRequest.assignee.email}
                </span>
              </div>
            </>
          )}

          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {formatRelativeTime(pullRequest.updated_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
