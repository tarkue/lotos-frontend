import { CourseProps } from "@/src/entity/course";
import { ModuleContent } from "@/src/entity/module";

export const CourseContent = ({ course }: CourseProps) => {
  if (!course.modules) {
    return undefined;
  }

  return (
    <ul className="w-full overflow-hidden rounded-2xl">
      {course.modules.map((module, i) => (
        <li key={i} className="w-full">
          <ModuleContent module={module} />
        </li>
      ))}
    </ul>
  );
};
