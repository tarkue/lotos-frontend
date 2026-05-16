import { VariantProps } from "class-variance-authority";
import { homeWorkTagVariants } from "./variants";

export interface HomeWorkTagProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof homeWorkTagVariants> {}
