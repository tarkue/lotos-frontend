import { cva } from "class-variance-authority";

export const BodyVariant = cva("text-[18px] leading-normal", {
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
