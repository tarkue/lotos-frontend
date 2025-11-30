import { forwardRef, useId } from "react";
import { RadioButtonProps } from "./props";
import { RadioButtonVariant } from "./variant";

export const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ variant, className, id, ...props }, ref) => {
    const internalId = useId();
    id = id === undefined ? internalId : id;

    return (
      <label
        className={RadioButtonVariant({ variant, className })}
        htmlFor={id}
      >
        <div></div>
        <input
          type="radio"
          className="group hidden"
          id={id}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
RadioButton.displayName = "RadioButton";
