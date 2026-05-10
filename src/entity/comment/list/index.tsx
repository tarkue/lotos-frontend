import { cn } from "@/src/shared/libs/utils";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { CommentListBodyProps } from "./props";
import { Icon } from "@/src/shared/ui/icon";

export const CommentListBody = forwardRef<HTMLDivElement, CommentListBodyProps>(
  ({ className, commentLength, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-full flex flex-col gap-5 px-6 py-5 rounded-[16px]",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="w-full flex gap-3 items-center">
          <Icon glyph="comment" size="20" color="black" />
          <Typography.Subtitle className="text-black w-full">
            Комментарии ({commentLength})
          </Typography.Subtitle>
        </div>
        {children}
      </div>
    );
  },
);
CommentListBody.displayName = "CommentListBody";
