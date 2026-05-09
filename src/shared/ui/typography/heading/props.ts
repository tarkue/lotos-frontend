import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { HeadingVariant } from "./variant";

export interface HeadingProps
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof HeadingVariant> {}
