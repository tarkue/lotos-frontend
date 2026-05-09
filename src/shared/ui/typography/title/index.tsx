import { forwardRef } from "react";
import { TitleProps } from "./props";
import { TitleVariant } from "./variant";

export const Title = forwardRef<HTMLParagraphElement, TitleProps>(
  ({ className, component = "h2", ...props }, ref) => {
    const Comp = component;
    return (
      <Comp className={TitleVariant({ className })} ref={ref} {...props} />
    );
  },
);
Title.displayName = "Typography.Title";
