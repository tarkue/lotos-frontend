import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex justify-center items-center gap-2 transition-colors duration-300 font-[16px] cursor-pointer font-roboto font-medium disabled:cursor-not-allowed truncate",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-hover active:bg-primary-active disabled:bg-base-raised disabled:text-light-gray",
        secondary:
          "bg-base text-black hover:bg-raised active:bg-sunken disabled:bg-none disabled:opacity-20",
        danger: "bg-base text-red disabled:opacity-50",
        ghost: "bg-transparent text-black font-normal",
      },
      size: {
        default: "px-5 py-3 rounded-[8px] text-[16px]",
        small: "px-2 py-2 rounded-[24px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);
