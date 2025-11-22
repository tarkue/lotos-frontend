import { cva } from "class-variance-authority";

export const H3Variant = cva("font-nunito text-[24px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-semibold",
      primary: "font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
