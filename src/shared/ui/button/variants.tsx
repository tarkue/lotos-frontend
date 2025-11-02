import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex justify-center items-center transition-colors duration-300 cursor-pointer font-nunito font-normal disabled:bg-base-200 disabled:text-bg-base-300 disabled:cursor-not-allowed truncate",
  {
    variants: {
      variant: {
        primary: "bg-primary-200 text-base-100 hover:bg-primary-300",
        secondary: "bg-none hover:bg-base-300",
      },
      size: {
        small: "px-3 py-1 text-[16px] gap-3 rounded-[10px]",
        large: "px-4 py-2 text-[20px] gap-4 rounded-[10px]",
        "icon-small": "p-2 rounded-[6px]",
        "icon-large": "p-3 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);
