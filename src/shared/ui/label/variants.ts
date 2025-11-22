import { cva } from "class-variance-authority";

const labelVariants = cva("text-[14px] text-base-300 text-wrap", {
  variants: {
    padding: {
      none: "p-0",
      small: "px-3",
    },
  },
  defaultVariants: {
    padding: "small",
  },
});

export { labelVariants };
