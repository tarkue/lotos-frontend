import { VariantProps } from "class-variance-authority";
import { RadioButtonVariant } from "./variant";

export interface RadioButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof RadioButtonVariant> {
  id?: string;
}

export interface RadioFieldProps extends Omit<RadioButtonProps, "id"> {
  field: string;
}
