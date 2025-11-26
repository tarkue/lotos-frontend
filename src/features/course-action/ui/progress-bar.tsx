import { CourseProps } from "@/src/entity/course";
import { ProgressBar } from "@/src/shared/ui/progress-bar";
import { Typography } from "@/src/shared/ui/typography";
import React from "react";

export const ProgressBarAction: React.FC<CourseProps> = ({
  course,
}: CourseProps) => {
  const percent =
    course.progress && course.progress
      ? course.progress.progress_percentage * 100
      : 0;

  return (
    <div className="flex gap-3 items-center">
      <ProgressBar percent={percent} />
      <Typography.Caption className="text-base-300 w-max min-w-44 text-right">
        {course.progress?.completed_items}/{course.progress?.total_items}{" "}
        занятий пройдено
      </Typography.Caption>
    </div>
  );
};
