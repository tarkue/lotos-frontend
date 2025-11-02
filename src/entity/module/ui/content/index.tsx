import { ThemeList } from "@/src/entity/theme/ui/theme-list";
import { cn } from "@/src/shared/libs/utils";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { ModuleCardProps } from "../card/props";

export const ModuleContent = forwardRef<HTMLDivElement, ModuleCardProps>(
  ({ module, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-base-100 elevation-1 p-5 flex flex-col items-center gap-3 rounded-[14px] h-auto",
          className
        )}
        {...props}
      >
        <Typography.Body>{module.title}</Typography.Body>
        <div className="bg-base-300 h-[1px] w-full"></div>
        <ThemeList themes={module.themes} />
      </div>
    );
  }
);
ModuleContent.displayName = "ModuleContent";
