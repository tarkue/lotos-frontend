import { cva } from "class-variance-authority";

export const SubtitleVariant = cva(
  "font-nunito text-[20px] md:text-[18px] leading-normal",
  {
    variants: {
      variant: {
        secondary: "font-semibold",
        primary: "font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
