import { forwardRef } from "react";
import { BodyProps } from "./props";
import { BodyVariant } from "./variant";

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, component = "p", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={BodyVariant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Body.displayName = "Typography.Body";
