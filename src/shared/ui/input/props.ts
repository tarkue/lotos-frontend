import { VariantProps } from "class-variance-authority";
import { JSX } from "react";
import { InputVariant } from "./variant";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariant> {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isValid?: boolean;
}
