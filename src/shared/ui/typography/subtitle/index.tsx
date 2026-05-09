import { forwardRef } from "react";
import { SubtitleProps } from "./props";
import { SubtitleVariant } from "./variant";

export const Subtitle = forwardRef<HTMLParagraphElement, SubtitleProps>(
  ({ className, component = "h3", ...props }, ref) => {
    const Comp = component;
    return (
      <Comp className={SubtitleVariant({ className })} ref={ref} {...props} />
    );
  },
);
Subtitle.displayName = "Typography.Subtitle";
