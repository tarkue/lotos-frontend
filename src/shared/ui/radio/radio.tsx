import { forwardRef, useId } from "react";
import { RadioButtonProps } from "./props";
import { RadioButtonVariant } from "./variant";
import { Icon } from "../icon";

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ variant, className, id, ...props }, ref) => {
    const internalId = useId();
    id = id === undefined ? internalId : id;

    return (
      <label
        className={RadioButtonVariant({ variant, className })}
        htmlFor={id}
      >
        <div>
          {variant === "error" && (
            <Icon glyph="minus" color="white" size="20" />
          )}
        </div>
        <input
          type="radio"
          className="group hidden"
          id={id}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
RadioButton.displayName = "RadioButton";
