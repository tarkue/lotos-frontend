import { Typography } from "@/src/shared/ui/typography";
import { CourseProps } from "../../models/course";

export const CourseDescription = ({
  course,
  action,
}: CourseProps & { action?: React.FC<CourseProps> }) => {
  const Act = action;
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-col w-full gap-1">
        <Typography.Title className="text-black w-full">
          О курсе
        </Typography.Title>
        <div className="flex flex-col w-full gap-4 bg-white p-6 my-9 rounded-2xl">
          <Typography.Title className="w-full text-wrap">
            {course.title}
          </Typography.Title>
          <Typography.Body className="w-full text-wrap">
            {course.description}
          </Typography.Body>
        </div>
      </div>
      {Act && <Act course={course} />}
    </section>
  );
};
