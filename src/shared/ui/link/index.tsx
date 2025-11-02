import NextLink from "next/link";
import { forwardRef } from "react";
import { cn } from "../../libs/utils";
import { LinkProps } from "./props";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <NextLink
        className={cn(
          "text-[16px] font-semibold duration-300 transition-colors text-base-400 hover:text-primary-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Link.displayName = "Link";
