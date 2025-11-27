import { Module } from "../../module";

export interface Course {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  overall_progress?: number;
  completed_materials?: number;
  total_materials?: number;
  is_enrolled?: boolean;
  modules?: Module[];
}

export interface CourseProps {
  course: Course;
}
