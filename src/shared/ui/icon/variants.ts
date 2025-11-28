import { cva } from "class-variance-authority";

const IconVariants = cva("block bg-no-repeat", {
  variants: {
    size: {
      "12": "w-3 h-3",
      "16": "w-4 h-4",
      "20": "w-5 h-5",
      "24": "w-6 h-6",
    },
    color: {
      white: "bg-base-100",
      gray: "bg-base-300",
      black: "bg-black",
      default: "bg-base-500",
    },
  },
  defaultVariants: {
    size: "24",
    color: "default",
  },
});

export { IconVariants };
