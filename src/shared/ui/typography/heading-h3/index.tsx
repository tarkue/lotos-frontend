import { forwardRef } from "react";
import { H3Props } from "./props";
import { H3Variant } from "./variant";

export const H3 = forwardRef<HTMLParagraphElement, H3Props>(
  ({ className, component = "p", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={H3Variant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
H3.displayName = "Typography.H3";
