import { Material } from "@/src/entity/material";

export interface MaterialActionProps {
  nextMaterial?: Material;
  material: Material;
  courseId: string;
}
