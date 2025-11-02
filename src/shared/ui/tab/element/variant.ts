import { cva } from "class-variance-authority";

export const TabElementVariant = cva(
  "flex flex-col border-b-2 w-full uppercase font-semibold text-center cursor-pointer",
  {
    variants: {
      size: {
        small: "text-[16px] pb-[6px]",
        large: "text-[20px] pb-2",
      },
      isActive: {
        false: "border-base-300 text-base-300",
        true: "border-primary-300 text-primary-300",
      },
    },
    defaultVariants: {
      size: "small",
      isActive: false,
    },
  }
);
