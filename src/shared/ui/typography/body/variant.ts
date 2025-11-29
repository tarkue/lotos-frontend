import { cva } from "class-variance-authority";

export const BodyVariant = cva(
  "font-nunito md:text-[18px] text-[16px] leading-[140%]",
  {
    variants: {
      variant: {
        secondary: "font-semibold",
        primary: "font-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
