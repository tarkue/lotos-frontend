import { VariantProps } from "class-variance-authority";
import { LogoVariant } from "./variant";

export interface LogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof LogoVariant> {}
