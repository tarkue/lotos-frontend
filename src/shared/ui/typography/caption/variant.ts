import { cva } from "class-variance-authority";

export const CaptionVariant = cva("font-roboto text-[14px] leading-[120%]", {
  variants: {
    bold: {
      true: "font-medium",
      false: "font-normal",
    },
  },
  defaultVariants: {
    bold: false,
  },
});
