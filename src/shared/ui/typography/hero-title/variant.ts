import { cva } from "class-variance-authority";

export const HeroVariant = cva("text-Hero leading-normal", {
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
