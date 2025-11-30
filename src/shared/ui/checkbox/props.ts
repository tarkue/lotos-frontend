import { VariantProps } from "class-variance-authority";
import { CheckboxVariant } from "./variant";

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof CheckboxVariant> {
  id?: string;
}

export interface CheckBoxFieldProps extends Omit<CheckBoxProps, "id"> {
  field: string;
}
