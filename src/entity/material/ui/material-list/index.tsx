import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { MaterialCard } from "../card";
import { ThemeListProps } from "./props";

export const MaterialList = ({ materials }: ThemeListProps) => {
  if (materials === undefined) {
    return <></>;
  }

  return (
    <ScrollArea className="h-full overflow-y-hidden w-full">
      {materials.map((material, index) => (
        <MaterialCard material={material} key={index} />
      ))}
    </ScrollArea>
  );
};
