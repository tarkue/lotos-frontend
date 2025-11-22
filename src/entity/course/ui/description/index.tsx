import { Typography } from "@/src/shared/ui/typography";
import { CourseProps } from "../../models/course";

export const CourseDescription = ({
  course,
  action,
}: CourseProps & { action?: React.FC<CourseProps> }) => {
  const Act = action;
  return (
    <section className="p-6 flex flex-col gap-4 bg-white border border-base-200 rounded-[13px] w-full">
      <div className="flex flex-col w-full gap-1">
        <Typography.Caption className="text-black opacity-20 font-black! w-full">
          КУРС
        </Typography.Caption>
        <div className="flex flex-col w-full gap-2">
          <Typography.H1 className="w-full text-wrap">
            {course.title}
          </Typography.H1>
          <Typography.Body className="w-full text-wrap">
            {course.description}
          </Typography.Body>
        </div>
      </div>
      {Act && <Act course={course} />}
    </section>
  );
};
