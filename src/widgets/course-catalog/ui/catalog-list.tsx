import { CourseList, CourseListProps } from "@/src/entity/course";

export const CourseCatalogList = ({ courses, action }: CourseListProps) => (
  <CourseList
    className="flex flex-col w-full gap-2"
    courses={courses}
    action={action}
  />
);
