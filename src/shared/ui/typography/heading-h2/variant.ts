import { cva } from "class-variance-authority";

export const H2Variant = cva("text-H2 leading-normal", {
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
