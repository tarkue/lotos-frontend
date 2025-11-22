import { Module } from "../../module";

export interface Course {
  id: string;
  title: string;
  description?: string;
  img_url?: string;

  status?: string;
  modules?: Module[];

  total?: number;
  all?: number;
}

export interface CourseProps {
  course: Course;
}
