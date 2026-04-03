import Link from "next/link";
import type { PullRequest } from "@/types/qa-merge";
import { StatusBadge } from "./StatusBadge";
import { formatRelativeTime } from "@/lib/utils/date";

interface PullRequestCardProps {
  pullRequest: PullRequest;
}

export function PullRequestCard({ pullRequest }: PullRequestCardProps) {
  return (
    <Link href={`/qa/pull-requests/${pullRequest.id}`}>
      <div className="block bg-white border border-gray-200 rounded-lg p-5 hover:border-indigo-300 hover:shadow-sm transition-all">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {pullRequest.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {pullRequest.repository} #{pullRequest.number}
            </p>
          </div>
          <StatusBadge status={pullRequest.qa_status} />
        </div>

        <div className="flex items-center gap-3 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              {pullRequest.author.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-600">
              {pullRequest.author}
            </span>
          </div>

          {pullRequest.assignee_id && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-medium text-indigo-700">
                  A
                </div>
                <span className="text-gray-600 text-xs">
                  Assigned
                </span>
              </div>
            </>
          )}

          <span className="text-gray-300">•</span>
          <span className="text-gray-500">
            {formatRelativeTime(pullRequest.updated_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
