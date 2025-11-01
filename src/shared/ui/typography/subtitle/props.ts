import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { SubtitleVariant } from "./variant";

export interface SubtitleProps
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof SubtitleVariant> {}
