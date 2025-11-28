import { cn } from "@/src/shared/libs/utils";
import { ModuleCard } from "../card";
import { ModuleListProps } from "./props";

export const ModuleList = ({ modules, className }: ModuleListProps) => {
  return (
    <ul className={cn("w-full flex flex-col gap-3", className)}>
      {modules.map((module, i) => (
        <li key={i}>
          <ModuleCard module={module} />
        </li>
      ))}
    </ul>
  );
};
