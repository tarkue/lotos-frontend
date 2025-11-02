import { cva } from "class-variance-authority";

export const CourseCardVariant = cva(
  "duration-300 transition-all flex items-center justify-center bg-base-100 text-base-400 hover:text-primary-300 rounded-[28px] border-3 border-b-5 hover:border-5 hover:border-b-7 border-primary-200",
  {
    variants: {
      size: {
        small: "min-h-[124px] min-w-[240px]",
        large: "min-h-[155px] min-w-[300px]",
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);
