import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { ThemeCardProps } from "./props";

export const MaterialCard = forwardRef<HTMLDivElement, ThemeCardProps>(
  ({ material, className, ...props }, ref) => {
    if (material === undefined) {
      return <></>;
    }

    return (
      <div
        className={cn(
          "flex p-2 gap-[10] justify-between items-center bg-base-100  transition-colors duration-300 rounded-[6px]",
          !material.is_locked && "hover:bg-base-200",
          className
        )}
        {...props}
        ref={ref}
      >
        <Typography.Caption>{material.title}</Typography.Caption>
        {material.is_completed && <Icon glyph="done" />}
        {material.is_locked && <Icon glyph="lock" />}
      </div>
    );
  }
);
MaterialCard.displayName = "MaterialCard";
