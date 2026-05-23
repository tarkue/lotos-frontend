import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Link } from "@/src/shared/ui/link";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { MaterialCardProps } from "./props";
import { MaterialTypeIconGlyphMap } from "./models";
import { MaterialType } from "@/src/shared/api/exports";

export const MaterialCard = forwardRef<HTMLDivElement, MaterialCardProps>(
  ({ material, href, className, ...props }, ref) => {
    if (material === undefined) {
      return <></>;
    }

    const content = (
      <div
        className={cn(
          "relative flex p-3 gap-2.5 w-full justify-between items-center bg-base-100 transition-colors duration-300 rounded-md",
          !material.is_locked && "hover:bg-base-raised active:bg-base-sunken",
          className,
        )}
        {...props}
        ref={ref}
      >
        <div className="flex gap-3 min-w-0 flex-1">
          <Icon
            size="20"
            color="light-gray"
            glyph={MaterialTypeIconGlyphMap[material.type as MaterialType]}
          />
          <Typography.Body
            className={cn(
              "w-full text-wrap",
              material.is_locked ? "text-gray" : "text-black",
            )}
          >
            {material.title}
          </Typography.Body>
        </div>
        {material.is_completed && <Icon glyph="done" className="bg-success" />}
        {material.is_locked && (
          <Icon
            glyph="lock"
            color={material.is_locked ? "light-gray" : "black"}
          />
        )}
      </div>
    );

    if (material.is_locked) {
      return content;
    }

    return (
      <Link href={href} className="w-full">
        {content}
      </Link>
    );
  },
);
MaterialCard.displayName = "MaterialCard";
