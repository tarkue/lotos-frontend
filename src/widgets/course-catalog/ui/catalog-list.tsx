import { CourseList, CourseListProps } from "@/src/entity/course";

export const CourseCatalogList = ({ courses }: CourseListProps) => (
  <CourseList className="grid grid-cols-3 gap-10" courses={courses} />
);
