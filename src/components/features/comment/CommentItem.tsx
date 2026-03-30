import { Comment } from "@/types";
import { formatRelativeTime } from "@/lib/utils/date";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  const user = comment.author;

  return (
    <div className="flex gap-3 py-4">
      {user?.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.name || user.email}
          className="h-8 w-8 rounded-full flex-shrink-0"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
          {(user?.name || user?.email || "?").charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm text-foreground">
            {user?.name || user?.email || "Unknown"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(comment.created_at)}
          </span>
        </div>
        <p className="text-sm text-foreground whitespace-pre-wrap">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
