import { ApplicationStatus } from "@/src/shared/api/enum/application-status.enum";
import { Module } from "../../module";

export interface Course {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  overall_progress?: number;
  completed_materials?: number;
  application_status?: ApplicationStatus | null;
  total_materials?: number;
  is_enrolled?: boolean;
  progress?: {
    progress_percentage?: number;
  } | null;
  modules?: Module[];
}

export interface CourseProps {
  course: Course;
}
