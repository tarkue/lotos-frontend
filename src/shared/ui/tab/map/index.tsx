import { TabElement } from "../element";
import { TabGroup } from "../group";
import { TabListProps } from "./props";

export const TabMap = <T extends readonly string[]>({
  elements,
  defaultValue,
  onChange,
  width,
  size = "small",
  className,
}: TabListProps<T>) => {
  return (
    <TabGroup
      defaultValue={defaultValue}
      onChange={onChange}
      size={size}
      style={{ width }}
      className={className}
    >
      {elements.map((tab, index) => (
        <TabElement key={index}>{tab}</TabElement>
      ))}
    </TabGroup>
  );
};
