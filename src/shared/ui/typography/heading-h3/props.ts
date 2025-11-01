import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { H3Variant } from "./variant";

export interface H3Props
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof H3Variant> {}
