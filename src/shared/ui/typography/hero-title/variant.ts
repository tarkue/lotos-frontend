import { cva } from "class-variance-authority";

export const HeroVariant = cva("text-[64px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-nunito font-light",
      primary: "font-multiround-pro font-normal",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
