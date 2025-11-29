import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Link } from "@/src/shared/ui/link";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { MaterialCardProps } from "./props";

export const MaterialCard = forwardRef<HTMLDivElement, MaterialCardProps>(
  ({ material, href, className, ...props }, ref) => {
    if (material === undefined) {
      return <></>;
    }

    const content = (
      <div
        className={cn(
          "relative flex p-2 gap-2.5 w-full justify-between items-center bg-base-100 transition-colors duration-300 rounded-[6px]",
          !material.is_locked && "hover:bg-base-200",
          className
        )}
        {...props}
        ref={ref}
      >
        <div className="min-w-0 flex-1">
          <Typography.Body
            className={cn(
              "w-full text-wrap",
              material.is_locked ? "text-gray" : "text-black"
            )}
          >
            {material.title + "  fsf df sff fsfsff s fffsffs sf df"}
          </Typography.Body>
        </div>
        {material.is_completed && <Icon glyph="done" className="bg-success" />}
        {material.is_locked && (
          <Icon glyph="lock" color={material.is_locked ? "gray" : "black"} />
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
  }
);
MaterialCard.displayName = "MaterialCard";
