import { cva } from "class-variance-authority";

export const H1Variant = cva("text-H1 leading-normal", {
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
