import { forwardRef } from "react";
import { PulseLoader } from "react-spinners";
import { ButtonProps } from "./props";
import { buttonVariants } from "./variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, ...props }, ref) => {
    if (loading) {
      props.children = (
        <PulseLoader
          color="#000"
          size={6}
          margin={3}
          cssOverride={{
            height: "24px",
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
