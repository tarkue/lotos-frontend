import { JSX } from "react";

export interface TabGroupProps
  extends Omit<
    React.HTMLAttributes<HTMLUListElement>,
    "children" | "onChange" | "defaultValue"
  > {
  children: JSX.Element[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}
