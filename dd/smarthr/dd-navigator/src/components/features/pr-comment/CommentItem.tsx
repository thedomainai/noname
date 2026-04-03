import type { PRComment } from "@/types/qa-merge";
import { formatRelativeTime } from "@/lib/utils/date";

interface CommentItemProps {
  comment: PRComment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3 py-4">
      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600 flex-shrink-0">
        ?
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-gray-900">
            {comment.author_id.slice(0, 8)}...
          </span>
          <span className="text-xs text-gray-500">
            {formatRelativeTime(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-gray-900 whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
