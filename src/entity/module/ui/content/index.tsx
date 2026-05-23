"use client";
import { MaterialList } from "@/src/entity/material/ui/material-list";
import { cn } from "@/src/shared/libs/utils";
import { Icon } from "@/src/shared/ui/icon";
import { forwardRef, useId } from "react";
import { ModuleContentProps } from "./props";
import { Typography } from "@/src/shared/ui/typography";

export const ModuleContent = forwardRef<HTMLDivElement, ModuleContentProps>(
  ({ module, className, defaultChecked = false, ...props }, ref) => {
    const id = useId();
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border-b border-base-border  px-6 py-4 gap-3 rounded-0 flex flex-col items-center group md:h-min w-full",
          className,
        )}
        {...props}
      >
        <label
          className="flex justify-center items-center w-full cursor-pointer"
          htmlFor={id}
        >
          <div className="flex flex-col gap-1 w-full">
            <Typography.Caption bold className="select-none text-light-gray">
              Модуль {module.position}
            </Typography.Caption>
            <Typography.Subtitle>{module.title}</Typography.Subtitle>
          </div>
          {module.materials && module.materials?.length > 0 && (
            <div className="flex justify-center items-center w-fit">
              <input
                type="checkbox"
                id={id}
                className="hidden"
                defaultChecked={defaultChecked}
              />
              <Icon
                glyph="arrow-down"
                color="black"
                size="20"
                className="block p-2 transition-transform duration-300 group-has-checked:rotate-180"
              />
            </div>
          )}
        </label>
        {module.materials && module.materials?.length > 0 && (
          <div className="transition-all duration-300 min-h-1 h-fit group-has-checked:h-0 group-has-checked:hidden w-full">
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
