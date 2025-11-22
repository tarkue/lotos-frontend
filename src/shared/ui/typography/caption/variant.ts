import { cva } from "class-variance-authority";

export const CaptionVariant = cva("font-nunito text-[14px] leading-[100%]", {
  variants: {
    variant: {
      secondary: "font-semibold",
      primary: "font-medium",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
