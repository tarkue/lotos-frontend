import { CourseList, CourseListProps } from "@/src/entity/course";

export const CourseCatalogList = ({ courses, action }: CourseListProps) => (
  <CourseList
    className="grid w-full gap-x-4 grid-cols-1 sm:grid-cols-2 sm-2:grid-cols-3 md:grid-cols-4 gap-y-6"
    courses={courses}
    action={action}
  />
);
