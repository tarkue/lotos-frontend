import { cva } from "class-variance-authority";

export const H1Variant = cva("text-[34px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-nunito font-semibold",
      primary: "font-multiround-pro font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
