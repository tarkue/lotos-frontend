import { cva } from "class-variance-authority";

export const CheckboxVariant = cva(
  "w-5 h-5 bg-base-100 rounded-[3px] cursor-pointer relative flex justify-center items-center group border-2 border-base-400 has-checked:nth-[1]:border-none",
  {
    variants: {
      variant: {
        default: "has-checked:nth-[1]:bg-primary",
        success: "has-checked:nth-[1]:bg-green",
        error: "has-checked:nth-[1]:bg-red",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
