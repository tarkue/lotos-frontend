import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { Material } from "../../models/material";
import { MaterialCard } from "../card";
import { MaterialListProps } from "./props";

export const MaterialList = ({
  materials,
  courseId,
  moduleId,
}: MaterialListProps) => {
  if (
    materials === undefined ||
    courseId === undefined ||
    moduleId === undefined
  ) {
    return <></>;
  }

  const generateHref = (material: Material) =>
    formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, material.id]);

  return (
    <ScrollArea className="h-full overflow-y-hidden w-full pr-3">
      {materials
        .sort((a, b) => a.position - b.position)
        .map((material, index) => (
          <MaterialCard
            material={material}
            key={index}
            href={generateHref(material)}
          />
        ))}
    </ScrollArea>
  );
};
