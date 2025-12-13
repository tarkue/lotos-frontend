"use client";
import { AddCourse } from "./ui/add";
import { AddModule } from "./ui/add-module";
import { Enroll } from "./ui/enroll";
import { None } from "./ui/none";
import { OpenSettings } from "./ui/open-settings";
import { ProgressPercentage } from "./ui/progress";
import { ProgressBarAction } from "./ui/progress-bar";

export const CourseAction = Object.assign(
  {},
  {
    None,
    Enroll,
    ProgressPercentage,
    AddModule,
    Add: AddCourse,
    OpenSettings,
    ProgressBar: ProgressBarAction,
  }
);
