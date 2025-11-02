import { VariantProps } from "class-variance-authority";
import { JSX } from "react";
import { TabGroupVariant } from "./variant";

export interface TabGroupProps
  extends Omit<
      React.HTMLAttributes<HTMLUListElement>,
      "children" | "onChange" | "defaultValue"
    >,
    VariantProps<typeof TabGroupVariant> {
  children: JSX.Element[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
