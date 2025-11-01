import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { CaptionVariant } from "./variant";

export interface CaptionProps
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof CaptionVariant> {}
