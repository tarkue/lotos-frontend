import { cva } from "class-variance-authority";

export const H3Variant = cva("text-H3 leading-normal", {
  variants: {
    variant: {
      primary: "font-nunito",
      secondary: "font-multiround-pro",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
