import { CourseProps } from "@/src/entity/course";
import { ProgressBar } from "@/src/shared/ui/progress-bar";
import { Typography } from "@/src/shared/ui/typography";
import React from "react";

export const ProgressBarAction: React.FC<CourseProps> = ({
  course,
}: CourseProps) => {
  if (course.overall_progress === undefined) {
    return <></>;
  }

  return (
    <div className="flex gap-3 items-center">
      <ProgressBar percent={course.overall_progress} />
      <Typography.Caption className="text-base-300 w-max min-w-44 text-right">
        {course.completed_materials}/{course.total_materials} занятий пройдено
      </Typography.Caption>
    </div>
  );
};
