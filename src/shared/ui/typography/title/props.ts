import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { TitleVariant } from "./variant";

export interface TitleProps
  extends
    TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof TitleVariant> {}
