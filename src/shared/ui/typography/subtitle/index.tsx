import { forwardRef } from "react";
import { SubtitleProps } from "./props";
import { SubtitleVariant } from "./variant";

export const Subtitle = forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ className, component = "p", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={SubtitleVariant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Subtitle.displayName = "Typography.Subtitle";
