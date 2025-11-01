import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { HeroVariant } from "./variant";

export interface HeroProps
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof HeroVariant> {}
