import { Material } from "@/src/entity/material";

export interface MaterialActionProps {
  material: Material;
  courseId: string;
}

export interface MaterialNavigationProps {
  prevMaterial?: Material;
  nextMaterial?: Material;
  courseId: string;
  moduleId: number;
}
