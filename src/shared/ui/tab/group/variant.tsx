import { cva } from "class-variance-authority";

export const TabGroupVariant = cva("flex w-auto", {
  variants: {
    size: {
      small: "gap-4 py-2",
      large: "gap-6 py-3",
    },
  },
  defaultVariants: {
    size: "small",
  },
});
