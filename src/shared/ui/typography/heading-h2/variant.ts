import { cva } from "class-variance-authority";

export const H2Variant = cva("text-[30px] leading-normal", {
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
