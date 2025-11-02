import { cn } from "@/src/shared/libs/utils";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { CardRight } from "./card-right";
import { ModuleCardProps } from "./props";

export const ModuleCard = forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ className, module, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex gap-12 px-5 py-4 items-center justify-between bg-base-100 elevation-1 text-base-500 rounded-[10px]",
          className
        )}
        ref={ref}
        {...props}
      >
        <Typography.Subtitle>{module.title}</Typography.Subtitle>
        <CardRight module={module} />
      </div>
    );
  }
);
ModuleCard.displayName = "ModuleCard";
