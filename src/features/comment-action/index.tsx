import { DeleteCommentAction } from "./ui/delete";
import { EvaluateCommentAction } from "./ui/evaluate";

export const CommentAction = Object.assign(
  {},
  {
    Delete: DeleteCommentAction,
    Evaluate: EvaluateCommentAction,
  },
);
