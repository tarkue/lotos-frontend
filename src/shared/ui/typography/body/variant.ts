import { cva } from "class-variance-authority";

export const BodyVariant = cva("font-nunito text-[18px] leading-[140%]", {
  variants: {
    variant: {
      secondary: "font-semibold",
      primary: "font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
