import { CourseProps } from "@/src/entity/course";
import { CourseSettings } from "@/src/widgets/course-settings";

export default function SettingsAboutPage({ course }: CourseProps) {
  return <CourseSettings.Form course={course} />;
}
