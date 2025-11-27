import { Enroll } from "./ui/enroll";
import { None } from "./ui/none";
import { ProgressPercentage } from "./ui/progress";
import { ProgressBarAction } from "./ui/progress-bar";

export const CourseAction = Object.assign(
  {},
  {
    None,
    Enroll,
    ProgressPercentage,
    ProgressBar: ProgressBarAction,
  }
);
