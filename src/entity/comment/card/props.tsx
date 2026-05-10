import { CommentProps } from "../models/props";

export interface CommentCardProps extends CommentProps {
  className?: string;
  action?: React.FC<CommentProps>;
}
