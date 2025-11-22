import { cva } from "class-variance-authority";

export const SubtitleVariant = cva("font-nunito text-[20px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-normal font-semibold",
      primary: "font-semibold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
