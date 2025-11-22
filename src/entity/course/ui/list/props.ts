import React from "react";
import { Course, CourseProps } from "../../models/course";

export interface CourseListProps {
  className?: string;
  courses: Course[];
  action?: React.FC<CourseProps>;
}
