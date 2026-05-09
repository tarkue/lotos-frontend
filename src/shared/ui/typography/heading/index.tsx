import { forwardRef } from "react";
import { HeadingProps } from "./props";
import { HeadingVariant } from "./variant";

export const Heading = forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ className, component = "h1", ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={HeadingVariant({ className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Typography.Heading";
