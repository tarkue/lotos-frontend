import { forwardRef } from "react";
import { cn } from "../../libs/utils";
import { InputProps } from "./props";
import { InputVariant } from "./variant";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type, fieldState, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          InputVariant({ size }),
          fieldState?.invalid && "border-red hover:border-gray",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
