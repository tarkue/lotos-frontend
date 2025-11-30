"use client";
import { forwardRef, useId } from "react";
import { Icon } from "../icon";
import { CheckBoxProps } from "./props";
import { CheckboxVariant } from "./variant";

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ variant, id, className, ...props }, ref) => {
    const internalId = useId();
    id = id === undefined ? internalId : id;

    return (
      <div className={CheckboxVariant({ variant, className })}>
        <Icon
          glyph="done"
          size="12"
          className="invisible group-has-checked:nth-[1]:visible"
        />
        <label
          htmlFor={id}
          className="cursor-pointer w-full h-full absolute"
        ></label>
        <input
          {...props}
          id={id}
          ref={ref}
          type="checkbox"
          className="hidden"
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
