import { forwardRef } from "react";
import { PulseLoader } from "react-spinners";
import { ButtonProps } from "./props";
import { buttonVariants } from "./variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, ...props }, ref) => {
    if (loading) {
      props.children = (
        <PulseLoader
          color="#FFFFFF"
          size={7}
          margin={3}
          cssOverride={{
            height: "27px",
            display: "flex",
            alignItems: "center",
          }}
        />
      );
    }
    return (
      <button
        role="button"
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
