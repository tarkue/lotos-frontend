import { cva } from "class-variance-authority";

export const RadioButtonVariant = cva(
  "flex items-center justify-center w-4 h-4 rounded-2xl border-2 border-light-gray bg-transparent *:w-[10px] *:h-[10px] *:rounded-2xl",
  {
    variants: {
      variant: {
        default: "has-checked:border-primary has-checked:*:bg-primary",
        success: "has-checked:border-green has-checked:*:bg-green",
        error:
          "has-checked:border-red has-checked:*:bg-red *:w-[20px] *:h-[20px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
