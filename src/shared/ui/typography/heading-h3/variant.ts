import { cva } from "class-variance-authority";

export const H3Variant = cva("text-[24px] leading-normal", {
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
