import { cva } from "class-variance-authority";

export const InputVariant = cva(
  "transition-colors duration-300 flex w-full rounded-[6px] border placeholder-base-300 border-base-200 bg-base-100 font-semibold font-nunito focus:border-primary-200 focus:border-[2px] file:border-0 file:bg-transparent file:font-caption focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-base-200",
  {
    variants: {
      size: {
        small: "px-[12px] py-[4px] text-[16px] focus:px-[11px] focus:py-[3px]",
        large: "px-[16px] py-[8px] text-[18px] focus:px-[15px] focus:py-[7px]",
      },
    },
    defaultVariants: {
      size: "large",
    },
  }
);
