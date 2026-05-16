"use client";
import { forwardRef, useId } from "react";
import { cn } from "../../libs/utils";
import { Typography } from "../typography";
import { Checkbox } from "./checkbox";
import { CheckBoxFieldProps } from "./props";

export const CheckboxField = forwardRef<HTMLInputElement, CheckBoxFieldProps>(
  ({ variant, field, className, ...props }, ref) => {
    const id = useId();
    return (
      <fieldset className="flex w-full items-center cursor-pointer">
        <Checkbox
          variant={variant}
          className={cn("cursor-pointer", className)}
          id={id}
          {...props}
          ref={ref}
        />
        <label htmlFor={id} className="cursor-pointer pl-3">
          <Typography.Body className="w-full text-wrap select-none">
            {field}
          </Typography.Body>
        </label>
      </fieldset>
    );
  },
);
CheckboxField.displayName = "CheckboxField";
