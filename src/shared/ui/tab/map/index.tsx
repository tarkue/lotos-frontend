import { cn } from "@/src/shared/libs/utils";
import { TabElement } from "../element";
import { TabGroup } from "../group";
import { TabListProps } from "./props";

export const TabMap = <T extends readonly string[]>({
  elements,
  className,
  defaultValue,
  onChange,
}: TabListProps<T>) => {
  return (
    <TabGroup
      onChange={onChange}
      defaultValue={defaultValue}
      className={cn("w-full", className)}
    >
      {elements.map((tab, index) => (
        <TabElement key={index}>{tab}</TabElement>
      ))}
    </TabGroup>
  );
};
