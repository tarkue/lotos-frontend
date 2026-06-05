import { VariantProps } from "class-variance-authority";
import { JSX } from "react";
import { TextAreaVariant } from "./variant";

export interface TextAreaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof TextAreaVariant> {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  isValid?: boolean;
}
