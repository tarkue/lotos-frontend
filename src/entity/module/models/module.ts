import { Material } from "../../material";

export interface Module {
  id: number;
  title: string;
  position: number;
  course_id: number;
  is_locked?: boolean;
  progress_percentage: number;
  completed_materials: number;
  total_materials: number;
  materials?: Material[] | null | undefined;
}
