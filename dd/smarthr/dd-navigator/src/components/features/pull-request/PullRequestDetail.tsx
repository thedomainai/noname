import type { PullRequest } from "@/types/qa-merge";
import { StatusBadge } from "./StatusBadge";
import { formatDateTime } from "@/lib/utils/date";

interface PullRequestDetailProps {
  pullRequest: PullRequest;
}

export function PullRequestDetail({ pullRequest }: PullRequestDetailProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {pullRequest.title}
          </h1>
          <a
            href={pullRequest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            {pullRequest.repository} #{pullRequest.number}
          </a>
        </div>
        <StatusBadge status={pullRequest.qa_status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Author:</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
              {pullRequest.author.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-900">{pullRequest.author}</span>
          </div>
        </div>

        <div>
          <span className="text-gray-500">Source:</span>
          <p className="font-medium text-gray-900 mt-1 capitalize">{pullRequest.source}</p>
        </div>

        <div>
          <span className="text-gray-500">Created:</span>
          <p className="font-medium text-gray-900 mt-1">
            {formatDateTime(pullRequest.created_at)}
          </p>
        </div>

        <div>
          <span className="text-gray-500">Last Updated:</span>
          <p className="font-medium text-gray-900 mt-1">
            {formatDateTime(pullRequest.updated_at)}
          </p>
        </div>
      </div>

      {pullRequest.description && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-500">Description:</span>
          <p className="text-sm text-gray-900 mt-1 whitespace-pre-wrap">
            {pullRequest.description}
          </p>
        </div>
      )}
    </div>
  );
}
