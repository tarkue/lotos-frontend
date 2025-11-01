import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { H1Variant } from "./variant";

export interface H1Props
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof H1Variant> {}
