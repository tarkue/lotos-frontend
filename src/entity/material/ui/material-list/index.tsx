import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { Material } from "../../models/material";
import { MaterialCard } from "../card";
import { MaterialListProps } from "./props";

export const MaterialList = ({ materials, courseId }: MaterialListProps) => {
  if (materials === undefined || courseId) {
    return <></>;
  }

  const generateHref = (material: Material) =>
    formatEndpoint(Endpoint.MATERIAL, [
      courseId,
      material.module_id,
      material.id,
    ]);

  return (
    <ScrollArea className="h-full overflow-y-hidden w-full">
      {materials.map((material, index) => (
        <MaterialCard
          material={material}
          key={index}
          href={generateHref(material)}
        />
      ))}
    </ScrollArea>
  );
};
