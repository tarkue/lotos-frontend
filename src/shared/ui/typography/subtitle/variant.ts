import { cva } from "class-variance-authority";

export const SubtitleVariant = cva("text-Subtitle leading-normal", {
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
