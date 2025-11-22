import { cva } from "class-variance-authority";

export const H1Variant = cva(
  "font-nunito text-[34px] leading-[110%] font-bold",
  {
    variants: {
      variant: {
        secondary: "",
        primary: "",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
