import { cva } from "class-variance-authority";

export const TabElementVariant = cva(
  "flex flex-col border-2 w-auto text-nowrap items-center justify-center font-semibold text-center cursor-pointer px-4 bg-base-100 first:rounded-l-[10px] last:rounded-r-[10px] safari-first-last-fix",
  {
    variants: {
      isActive: {
        false: "border-base-200 text-base-300",
        true: "border-primary-300 text-primary-300",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);
