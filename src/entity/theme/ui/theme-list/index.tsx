import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { ThemeCard } from "../card";
import { ThemeListProps } from "./props";

export const ThemeList = ({ themes }: ThemeListProps) => {
  if (themes === undefined) {
    return <></>;
  }

  return (
    <ScrollArea className="h-full overflow-y-hidden w-full">
      {themes.map((module, index) => (
        <ThemeCard theme={module} key={index} />
      ))}
    </ScrollArea>
  );
};
