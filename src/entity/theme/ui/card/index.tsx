import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { ThemeCardProps } from "./props";

export const ThemeCard = forwardRef<HTMLDivElement, ThemeCardProps>(
  ({ theme, className, ...props }, ref) => {
    if (theme === undefined) {
      return <></>;
    }

    return (
      <div
        className={cn(
          "flex p-2 gap-[10] justify-between items-center bg-base-100  transition-colors duration-300 rounded-[6px]",
          theme.status !== "lock" && "hover:bg-base-200",
          className
        )}
        {...props}
        ref={ref}
      >
        <Typography.Caption>{theme.title}</Typography.Caption>
        {theme.status === "approve" && <Icon glyph="done" />}
        {theme.status === "lock" && <Icon glyph="lock" />}
      </div>
    );
  }
);
ThemeCard.displayName = "ThemeCard";
