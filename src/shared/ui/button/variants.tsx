import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex justify-center items-center transition-colors duration-300 cursor-pointer font-nunito font-normal disabled:text-base-300 disabled:cursor-not-allowed truncate",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-200 text-base-100 hover:bg-primary-300 disabled:bg-base-200",
        outline:
          "bg-none text-base-300 border border-base-300 hover:text-black hover:border-black",
        secondary: "bg-none hover:bg-base-300 disabled:bg-base-200",
        ghost: "bg-none disabled:bg-none disabled:opacity-20",
      },
      size: {
        small: "p-6 text-[16px] gap-2 rounded-[12px]",
        large: "px-8 py-2 text-[18px] gap-2 rounded-[16px]",
        "icon-small": "p-1 rounded-[6px]",
        "icon-large": "p-2 rounded-[6px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);
