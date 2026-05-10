import { cva } from "class-variance-authority";

export const TabElementVariant = cva(
  "flex flex-col border-0 w-full md:w-auto text-nowrap text-[16px] items-center justify-center font-medium font-roboto text-center cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-light-gray hover:bg-base-raised hover:text-dark-gray active:bg-base-sunken active:text-black",
      },
      size: {
        default: "h-[43px] px-3 py-3 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
