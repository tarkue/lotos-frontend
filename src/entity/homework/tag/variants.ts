import { cva } from "class-variance-authority";

export const homeWorkTagVariants = cva(
  "flex justify-center items-center gap-2 truncate px-4 py-2 rounded-2xl",
  {
    variants: {
      variant: {
        reject: "bg-status-error text-red",
        pending: "bg-status-warning text-yellow",
        resolve: "bg-status-success text-green",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  },
);
