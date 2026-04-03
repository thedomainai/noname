import type { PRComment } from "@/types/qa-merge";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: PRComment[];
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
