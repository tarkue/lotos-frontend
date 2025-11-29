import { cn } from "@/src/shared/libs/utils";
import { CSSProperties } from "react";
import { TabElement } from "../element";
import { TabGroup } from "../group";
import { TabListProps } from "./props";

export const TabMap = <T extends readonly string[]>({
  elements,
  defaultValue,
  onChange,
  width,
  className,
}: TabListProps<T>) => {
  return (
    <TabGroup
      defaultValue={defaultValue}
      onChange={onChange}
      style={{ "--tab-group-width": width } as CSSProperties}
      className={cn("sm:w-(--tab-group-width) w-full", className)}
    >
      {elements.map((tab, index) => (
        <TabElement key={index}>{tab}</TabElement>
      ))}
    </TabGroup>
  );
};
