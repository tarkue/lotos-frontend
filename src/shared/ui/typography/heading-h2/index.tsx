import { forwardRef } from "react";
import { H2Props } from "./props";
import { H2Variant } from "./variant";

export const H2 = forwardRef<HTMLParagraphElement, H2Props>(
  ({ className, component = "p", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={H2Variant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
H2.displayName = "Typography.H2";
