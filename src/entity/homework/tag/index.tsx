import { cn } from "@/src/shared/libs/utils";
import { forwardRef } from "react";
import { homeWorkTagVariants } from "./variants";
import { HomeWorkTagProps } from "./props";
import { Icon } from "@/src/shared/ui/icon";
import { tagContentMap } from "./models";
import { Typography } from "@/src/shared/ui/typography";

const HomeWorkTag = forwardRef<HTMLDivElement, HomeWorkTagProps>(
  ({ variant, className, text: propsText, ...props }, ref) => {
    variant = variant ?? "pending";

    const { glyph, color, text } = tagContentMap[variant];

    return (
      <div
        className={cn(homeWorkTagVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        {glyph && color && <Icon glyph={glyph} color={color} />}
        <Typography.Caption bold>
          {propsText && variant === "default" ? propsText : text}
        </Typography.Caption>
      </div>
    );
  },
);
HomeWorkTag.displayName = "Tag";

export { HomeWorkTag };
