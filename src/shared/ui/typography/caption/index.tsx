import { forwardRef } from "react";
import { CaptionProps } from "./props";
import { CaptionVariant } from "./variant";

export const Caption = forwardRef<HTMLParagraphElement, CaptionProps>(
  ({ className, component = "span", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={CaptionVariant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Caption.displayName = "Typography.Caption";
