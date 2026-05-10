import { cn } from "@/src/shared/libs/utils";
import { CSSProperties } from "react";
import { TabElement } from "../element";
import { TabGroup } from "../group";
import { TabListProps } from "./props";

export const TabMap = <T extends readonly string[]>({
  elements,
  className,
  onChange,
}: TabListProps<T>) => {
  return (
    <TabGroup onChange={onChange} className={cn("w-full", className)}>
      {elements.map((tab, index) => (
        <TabElement key={index}>{tab}</TabElement>
      ))}
    </TabGroup>
  );
};
