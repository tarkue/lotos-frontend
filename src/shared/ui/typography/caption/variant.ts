import { cva } from "class-variance-authority";

export const CaptionVariant = cva("text-[16px] leading-normal", {
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
