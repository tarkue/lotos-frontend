import { cn } from "@/src/shared/libs/utils";
import { CourseCard } from "../card";
import { CourseListProps } from "./props";

export const CourseList = ({ courses, className, action }: CourseListProps) => {
  console.log(courses);
  return (
    <ul className={cn("w-full", className)}>
      {courses.map((course, i) => (
        <li key={i}>
          <CourseCard course={course} action={action} />
        </li>
      ))}
    </ul>
  );
};
