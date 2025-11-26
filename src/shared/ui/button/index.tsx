import { forwardRef } from "react";
import { PulseLoader } from "react-spinners";
import { ButtonProps } from "./props";
import { buttonVariants } from "./variants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        role="button"
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export const SpinnerButton = ({
  variant = "primary",
  size = "large",
  ...props
}: ButtonProps) => (
  <Button variant={variant} size={size} {...props}>
    <PulseLoader
      color="#FFFFFF"
      size={7}
      margin={3}
      cssOverride={{ height: "27px", display: "flex", alignItems: "center" }}
    />
  </Button>
);
