import { cva } from "class-variance-authority";

export const InputVariant = cva(
  "flex items-center gap-2 transition-colors duration-300 cursor-text flex w-full border-0 bg-base-raised font-normal font-roboto file:border-0 file:bg-transparent file:font-caption focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-base-sunken",
  {
    variants: {
      size: {
        default: "px-4 py-3 rounded-[8px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
