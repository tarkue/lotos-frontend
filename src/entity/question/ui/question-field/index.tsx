"use client";
import { cn } from "@/src/shared/libs/utils";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import { forwardRef, useId } from "react";

export const QuestionField = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & { name?: string }
>(({ className, name, ...props }, ref) => {
  const id = useId();
  return (
    <fieldset className={cn("flex gap-2 items-center w-full", className)}>
      <Input name={name} className="w-full" id={id} ref={ref} {...props} />
      <div className="h-4 w-4">
        <Checkbox id={id} name={name} />
      </div>
    </fieldset>
  );
});

QuestionField.displayName = "QuestionField";
