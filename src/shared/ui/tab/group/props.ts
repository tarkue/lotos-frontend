import { JSX } from "react";

export interface TabGroupProps extends Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children" | "onChange" | "defaultValue"
> {
  children: JSX.Element[];
  onChange?: (value: string) => void;
  defaultValue?: string;
}
