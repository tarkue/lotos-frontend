import { cva } from "class-variance-authority";

export const TabElementVariant = cva(
  "flex flex-col border-0 w-full md:w-auto text-nowrap text-[16px] items-center justify-center font-medium font-roboto text-center cursor-pointer",
  {
    variants: {
      size: {
        default: "h-[43px] px-3 py-3 rounded-[8px]",
      },
      isActive: {
        true: "bg-base-raised text-black",
        false:
          "bg-transparent text-light-gray hover:bg-base-raised hover:text-dark-gray active:bg-base-sunken active:text-black",
      },
    },
    defaultVariants: {
      size: "default",
      isActive: false,
    },
  },
);
