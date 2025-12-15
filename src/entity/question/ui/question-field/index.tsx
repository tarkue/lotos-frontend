"use client";
import { cn } from "@/src/shared/libs/utils";
import { Checkbox } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import { forwardRef, useId, useState } from "react";

export const QuestionField = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & { name?: string }
>(({ className, checked, name, onChange, ...props }, ref) => {
  const [check, setCheck] = useState<boolean>(
    checked === undefined ? false : checked
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.checked = check;
    if (onChange) onChange(event);
  };
  const id = useId();
  return (
    <fieldset className={cn("flex gap-2 items-center w-full", className)}>
      <Input
        name={name}
        className="w-full"
        id={id}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      <div className="h-4 w-4">
        <Checkbox
          id={id + "-checkbox"}
          name={name}
          checked={check}
          onChange={(e) => setCheck(e.currentTarget.checked)}
        />
      </div>
    </fieldset>
  );
});

QuestionField.displayName = "QuestionField";
