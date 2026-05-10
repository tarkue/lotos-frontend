import { cn } from "@/src/shared/libs/utils";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { CommentCardProps } from "./props";

export const CommentCard = forwardRef<HTMLDivElement, CommentCardProps>(
  ({ className, action, comment, ...props }, ref) => {
    const Act = action;
    return (
      <div
        className={cn("flex justify-between w-full", className)}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col w-full gap-1">
          <div className="flex gap-2 w-full">
            <Typography.Caption bold>{comment.author_name}</Typography.Caption>
            <Typography.Caption className="text-light-gray">
              {comment.created_at}
            </Typography.Caption>
          </div>
          <Typography.Caption>{comment.content}</Typography.Caption>
        </div>
        {Act && <Act comment={comment} />}
      </div>
    );
  },
);
CommentCard.displayName = "CommentCard";
