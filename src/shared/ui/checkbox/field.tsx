"use client";
import { forwardRef, useId } from "react";
import { Typography } from "../typography";
import { Checkbox } from "./checkbox";
import { CheckBoxFieldProps } from "./props";

export const CheckboxField = forwardRef<HTMLInputElement, CheckBoxFieldProps>(
  ({ variant, field, className, ...props }, ref) => {
    const id = useId();
    return (
      <fieldset className="flex w-full items-center gap-4">
        <Checkbox
          variant={variant}
          className={className}
          id={id}
          {...props}
          ref={ref}
        />
        <label htmlFor={id}>
          <Typography.Body className="w-full text-wrap">
            {field}
          </Typography.Body>
        </label>
      </fieldset>
    );
  }
);
CheckboxField.displayName = "CheckboxField";
