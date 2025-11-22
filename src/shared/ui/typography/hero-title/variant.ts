import { cva } from "class-variance-authority";

export const HeroVariant = cva("font-nunito text-[64px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-light",
      primary: "font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
