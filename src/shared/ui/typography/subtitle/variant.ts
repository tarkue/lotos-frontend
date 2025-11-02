import { cva } from "class-variance-authority";

export const SubtitleVariant = cva("text-[20px] leading-normal", {
  variants: {
    variant: {
      secondary: "font-nunito font-normal font-semibold",
      primary: "font-multiround-pro font-semibold",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
