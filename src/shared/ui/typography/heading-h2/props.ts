import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { H2Variant } from "./variant";

export interface H2Props
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof H2Variant> {}
