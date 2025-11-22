import { cva } from "class-variance-authority";

export const CourseCardVariant = cva(
  "flex items-center p-4 justify-center bg-base-100 text-black rounded-[16px] border-1 border-base-200",
  {
    variants: {
      size: {
        small: "min-w-[240px]",
        large: "w-full",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);
