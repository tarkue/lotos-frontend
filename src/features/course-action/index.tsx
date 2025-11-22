import { Enroll } from "./ui/enroll";
import { None } from "./ui/none";
import { ProgressBarAction } from "./ui/progress-bar";

export const CourseAction = Object.assign(
  {},
  {
    None,
    Enroll,
    ProgressBar: ProgressBarAction,
  }
);
