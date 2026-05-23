import { Material } from "@/src/entity/material";

export interface MaterialActionProps {
  prevMaterial?: Material;
  nextMaterial?: Material;
  material: Material;
  courseId: string;
}
