"use client";
import { CourseAction } from "@/src/features/course-action";
import { QuerySearch } from "@/src/features/search";

export const AllCoursesActions = () => (
  <div className="flex gap-4 w-full items-center justify-end">
    <QuerySearch />
    <CourseAction.Add />
  </div>
);
