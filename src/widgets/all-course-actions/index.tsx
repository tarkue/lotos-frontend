"use client";
import { CourseAction } from "@/src/features/course-action";
import { QuerySearch } from "@/src/features/search";

export const AllCoursesActions = () => (
  <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:justify-end">
    <QuerySearch />
    <CourseAction.Add />
  </div>
);
