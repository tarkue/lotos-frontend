import { cva } from "class-variance-authority";

export const H2Variant = cva("font-nunito text-[30px] leading-normal", {
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
