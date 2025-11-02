import { VariantProps } from "class-variance-authority";
import { ControllerFieldState } from "react-hook-form";
import { InputVariant } from "./variant";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariant> {
  fieldState?: ControllerFieldState;
}
