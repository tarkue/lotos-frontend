"use client";
import { CourseListProps } from "@/src/entity/course";
import { CourseAction } from "@/src/features/course-action";
import { CourseCatalog } from "../course-catalog";

export const AllCourseList: React.FC<CourseListProps> = ({ courses }) => {
  return <CourseCatalog.List courses={courses} action={CourseAction.Enroll} />;
};
