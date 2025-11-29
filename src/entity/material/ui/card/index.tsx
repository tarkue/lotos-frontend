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
          "flex p-2 gap-[10] justify-between items-center bg-base-100 transition-colors duration-300 rounded-[6px]",
          !material.is_locked && "hover:bg-base-200",
          className
        )}
        {...props}
        ref={ref}
      >
        <Typography.Body
          className={cn(material.is_locked ? "text-gray" : "text-black")}
        >
          {material.title}
        </Typography.Body>
        {material.is_completed && <Icon glyph="done" className="bg-success" />}
        {material.is_locked && (
          <Icon glyph="lock" color={material.is_locked ? "gray" : "black"} />
        )}
      </div>
    );

    if (material.is_locked) {
      return content;
    }

    return <Link href={href}>{content}</Link>;
  }
);
MaterialCard.displayName = "MaterialCard";
