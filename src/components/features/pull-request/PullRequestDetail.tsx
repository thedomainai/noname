import { PullRequest } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "@/lib/utils/date";

interface PullRequestDetailProps {
  pullRequest: PullRequest;
}

export function PullRequestDetail({ pullRequest }: PullRequestDetailProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {pullRequest.title}
          </h1>
          <a
            href={pullRequest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            {pullRequest.repository} #{pullRequest.number}
          </a>
        </div>
        <StatusBadge status={pullRequest.qa_status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Author:</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
              {pullRequest.author.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{pullRequest.author}</span>
          </div>
        </div>

        <div>
          <span className="text-muted-foreground">Source:</span>
          <p className="font-medium mt-1 capitalize">{pullRequest.source}</p>
        </div>

        <div>
          <span className="text-muted-foreground">Created:</span>
          <p className="font-medium mt-1">
            {formatDate(pullRequest.created_at)}
          </p>
        </div>

        <div>
          <span className="text-muted-foreground">Last Updated:</span>
          <p className="font-medium mt-1">
            {formatDate(pullRequest.updated_at)}
          </p>
        </div>
      </div>

      {pullRequest.description && (
        <div className="mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Description:</span>
          <p className="text-sm mt-1 whitespace-pre-wrap">
            {pullRequest.description}
          </p>
        </div>
      )}
    </div>
  );
}
