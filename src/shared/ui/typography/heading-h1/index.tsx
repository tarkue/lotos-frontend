import { forwardRef } from "react";
import { H1Props } from "./props";
import { H1Variant } from "./variant";

export const H1 = forwardRef<HTMLParagraphElement, H1Props>(
  ({ className, component = "p", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={H1Variant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
H1.displayName = "Typography.H1";
