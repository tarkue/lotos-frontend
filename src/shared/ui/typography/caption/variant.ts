import { cva } from "class-variance-authority";

export const CaptionVariant = cva("text-Caption leading-normal", {
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
