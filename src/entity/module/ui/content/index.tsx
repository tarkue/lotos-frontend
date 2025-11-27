import { MaterialList } from "@/src/entity/material/ui/material-list";
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
        <Typography.Body>
          <strong>{module.title}</strong>
        </Typography.Body>
        <div className="bg-base-300 h-px w-full"></div>
        {module.materials && (
          <MaterialList
            materials={module.materials}
            courseId={module.course_id}
          />
        )}
      </div>
    );
  }
);
ModuleContent.displayName = "ModuleContent";
