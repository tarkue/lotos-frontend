import { VariantProps } from "class-variance-authority";
import { TypographyProps } from "../shared/props";
import { BodyVariant } from "./variant";

export interface BodyProps
  extends TypographyProps<HTMLParagraphElement>,
    VariantProps<typeof BodyVariant> {}
