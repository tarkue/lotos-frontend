import { cva } from "class-variance-authority";

export const RadioButtonVariant = cva(
  "flex items-center justify-center w-4 h-4 rounded-2xl border-2 border-base-400 bg-base-100 *:w-[5px] *:h-[5px] *:rounded-2xl",
  {
    variants: {
      variant: {
        primary: "has-checked:border-primary-300 has-checked:*:bg-primary-300",
        success: "has-checked:border-success has-checked:*:bg-success",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
