import { MaterialList } from "@/src/entity/material/ui/material-list";
import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { Typography } from "@/src/shared/ui/typography";
import { forwardRef } from "react";
import { ModuleContentProps } from "./props";

export const ModuleContent = forwardRef<HTMLDivElement, ModuleContentProps>(
  ({ module, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-base-100 border border-base-200 p-5 flex flex-col items-center gap-3 rounded-[14px] group md:h-min",
          className,
        )}
        {...props}
      >
        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="content-module-check"
            className="flex justify-center items-center w-full"
          >
            <Typography.Body className="md:text-center w-full">
              <strong>{module.title}</strong>
            </Typography.Body>
            <input
              type="checkbox"
              id="content-module-check"
              className="hidden"
            />

            <Icon
              glyph="arrow-down"
              color="black"
              size="20"
              className="block p-2 transition-transform duration-300 max-md:group-has-checked:rotate-180 md:hidden"
            />
          </label>
        </div>
        <div className="bg-base-400 h-px w-full max-w-full"></div>
        {module.materials && (
          <div className="transition-all duration-300 h-68 group-has-checked:h-0 w-full">
            <MaterialList
              materials={module.materials}
              moduleId={module.id}
              courseId={module.course_id}
            />
          </div>
        )}
      </div>
    );
  },
);
ModuleContent.displayName = "ModuleContent";
