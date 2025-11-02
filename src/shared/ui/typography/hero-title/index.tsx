import { forwardRef } from "react";
import { HeroProps } from "./props";
import { HeroVariant } from "./variant";

export const Hero = forwardRef<HTMLParagraphElement, HeroProps>(
  ({ className, component = "h1", variant, ...props }, ref) => {
    const Comp = component;
    return (
      <Comp
        className={HeroVariant({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Hero.displayName = "Typography.Hero";
