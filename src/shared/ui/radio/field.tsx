"use client";
import { forwardRef, useId } from "react";
import { Typography } from "../typography";
import { RadioFieldProps } from "./props";
import { RadioButton } from "./radio";

export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ variant, field, className, ...props }, ref) => {
    const id = useId();
    return (
      <label
        htmlFor={id}
        className="flex w-full items-center gap-4 cursor-pointer"
      >
        <div className="w-4 h-4">
          <RadioButton
            variant={variant}
            className={className}
            id={id}
            {...props}
            ref={ref}
          />
        </div>

        <Typography.Body className="w-full text-wrap select-none">
          {field}
        </Typography.Body>
      </label>
    );
  }
);
RadioField.displayName = "RadioField";
