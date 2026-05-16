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
          "bg-white border-b border-base-border px-6 py-4 gap-3 rounded-0 flex flex-col items-center group md:h-min group-has-checked:border-transparent",
          className,
        )}
        {...props}
      >
        <div className="flex justify-center items-center w-full">
          <label
            htmlFor="content-module-check"
            className="flex justify-center items-center w-full"
          >
            <div className="flex flex-col w-full gap-1">
              <Typography.Caption bold className="text-light-gray w-full">
                Модуль {module.position}
              </Typography.Caption>
              <Typography.Subtitle className="text-black w-full">
                {module.title}
              </Typography.Subtitle>
            </div>
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
