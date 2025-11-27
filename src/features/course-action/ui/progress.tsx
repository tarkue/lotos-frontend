import { CourseProps } from "@/src/entity/course";
import { Typography } from "@/src/shared/ui/typography";

export const ProgressPercentage: React.FC<CourseProps> = ({ course }) => (
  <Typography.Body className="text-black">
    {course.overall_progress ? course.overall_progress : "0%"}
  </Typography.Body>
);
