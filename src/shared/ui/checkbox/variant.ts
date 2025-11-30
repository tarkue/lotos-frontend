import { cva } from "class-variance-authority";

export const CheckboxVariant = cva(
  "w-4 h-4 bg-base-100 rounded-[3px] cursor-pointer relative flex justify-center items-center group border-2 border-base-400 has-checked:nth-[1]:border-none",
  {
    variants: {
      variant: {
        primary: "has-checked:nth-[1]:bg-primary-300",
        success: "has-checked:nth-[1]:bg-success",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
