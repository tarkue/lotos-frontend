import { VariantProps } from "class-variance-authority";
import { TabElementVariant } from "./variant";

export interface TabElementProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, "children">,
    VariantProps<typeof TabElementVariant> {
  children: string;
  isActive?: boolean;
}
