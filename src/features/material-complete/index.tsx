"use client";
import { Material } from "@/src/entity/material";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const MaterialComplete = ({
  material,
  nextMaterial,
  courseId,
}: {
  nextMaterial?: Material;
  material: Material;
  courseId: string;
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(
    material.is_completed
  );
  const router = useRouter();
  const handle = async () => {
    if (material.module) {
      const ids = [Number.parseInt(courseId), material.module.id];
      await api.student.completeMaterial(ids[0], ids[1], material.id);
      setIsCompleted(true);
      if (nextMaterial !== undefined) {
        router.push(
          formatEndpoint(Endpoint.MATERIAL, [...ids, nextMaterial.material_id])
        );
      }
    }
  };

  return (
    <Button
      onClick={handle}
      variant={isCompleted ? "primary" : "outline"}
      size="large"
      className="h-max group font-semibold lower"
      disabled={isCompleted}
    >
      Изучено
      <Icon
        size="20"
        glyph="arrow-right"
        color="gray"
        className="duration-300 transition group-hover:bg-black group-disabled:group-hover:bg-gray"
      />
    </Button>
  );
};
