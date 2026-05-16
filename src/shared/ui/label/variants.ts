import { cva } from "class-variance-authority";

const labelVariants = cva("text-[16px] font-medium text-wrap", {
  variants: {
    required: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    required: false,
  },
});

export { labelVariants };
