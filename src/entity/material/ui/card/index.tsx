import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import Link from "next/link";
import { forwardRef } from "react";
import { ThemeCardProps } from "./props";

export const MaterialCard = forwardRef<HTMLAnchorElement, ThemeCardProps>(
  ({ material, href, className, ...props }, ref) => {
    if (material === undefined) {
      return <></>;
    }

    return (
      <Link
        href={href}
        className={cn(
          "flex p-2 gap-[10] justify-between items-center bg-base-100  transition-colors duration-300 rounded-[6px]",
          !material.is_locked && "hover:bg-base-200",
          className
        )}
        {...props}
        ref={ref}
      >
        <Typography.Body>{material.title}</Typography.Body>
        {material.is_completed && <Icon glyph="done" />}
        {material.is_locked && <Icon glyph="lock" />}
      </Link>
    );
  }
);
MaterialCard.displayName = "MaterialCard";
