import { CourseProps } from "@/src/entity/course";
import { ProgressBar } from "@/src/shared/ui/progress-bar";
import { Typography } from "@/src/shared/ui/typography";
import React from "react";

export const ProgressBarAction: React.FC<CourseProps> = ({
  course,
}: CourseProps) => {
  const percent =
    course.total && course.all ? (course.total / course.all) * 100 : 0;
  return (
    <div className="flex gap-3 items-center">
      <ProgressBar percent={percent} />
      <Typography.Caption className="text-base-300 w-max min-w-44 text-right">
        {course.total}/{course.all} занятий пройдено
      </Typography.Caption>
    </div>
  );
};
