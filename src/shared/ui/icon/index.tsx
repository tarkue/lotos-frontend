import { forwardRef } from "react";
import { IconProps } from "./props";
import { IconVariants } from "./variants";

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ size, color, glyph, className = "" }, ref) => {
    const iconStyle: React.CSSProperties = {
      maskImage: `url(/icons/${glyph}.svg)`,
      maskPosition: "center center",
      maskRepeat: "no-repeat",
    };

    return (
      <div>
        <i
          className={IconVariants({ size, color, className })}
          style={iconStyle}
          ref={ref}
        />
      </div>
    );
  }
);
Icon.displayName = "Icon";
