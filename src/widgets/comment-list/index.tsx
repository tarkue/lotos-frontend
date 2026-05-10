import { CommentCard } from "@/src/entity/comment";
import { CommentListBody } from "@/src/entity/comment/list";
import { CommentResponseDTO } from "@/src/shared/api/exports";

export const CommentList = () => {
  const comments: CommentResponseDTO[] = [];
  return (
    <CommentListBody commentLength={comments.length}>
      <ul className="flex flex-col gap-5 w-full">
        {comments.map((comment) => (
          <li key={comment.id}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ul>
    </CommentListBody>
  );
};
