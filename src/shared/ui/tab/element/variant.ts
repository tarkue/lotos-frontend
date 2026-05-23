import { cva } from "class-variance-authority";

export const TabElementVariant = cva(
  "flex border-0 w-full md:w-auto text-nowrap text-[16px] items-center justify-center font-medium font-roboto cursor-pointer h-[43px] px-3 py-3 rounded-[8px]",
  {
    variants: {
      isActive: {
        true: "bg-base-raised text-black",
        false:
          "bg-transparent text-light-gray hover:bg-base-raised hover:text-dark-gray active:bg-base-sunken active:text-black",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);
