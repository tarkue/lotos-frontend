"use client";
import { CourseProps } from "@/src/entity/course";
import { CourseAction } from "@/src/features/course-action";
import { CourseSettings } from "@/src/widgets/course-settings";

export default function SettingsAboutPage({ course }: CourseProps) {
  return <CourseSettings.Form course={course} action={CourseAction.Delete} />;
}
