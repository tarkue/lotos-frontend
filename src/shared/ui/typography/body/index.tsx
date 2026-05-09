import { forwardRef } from "react";
import { BodyProps } from "./props";
import { BodyVariant } from "./variant";

export const Body = forwardRef<HTMLParagraphElement, BodyProps>(
  ({ className, component = "p", bold, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={BodyVariant({ bold, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Body.displayName = "Typography.Body";
