import { cva } from "class-variance-authority";

export const BodyVariant = cva(
  "font-roboto text-[16px] leading-[120%]",
  {
    variants: {
      bold: {
        true: 'text-normal',
        false: 'text-medium'
      },
    },
    defaultVariants: {
      bold: false,
    },
  }
);
