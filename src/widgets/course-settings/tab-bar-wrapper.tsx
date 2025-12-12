import { CourseProps } from "@/src/entity/course";
import { CourseSettingsTabBar } from "./tab-bar";

export const CourseSettingsTabBarWrapper: React.FC<
  CourseProps & { children?: React.ReactNode }
> = ({ course, children }) => {
  return (
    <section className="flex flex-col gap-6 w-full">
      <CourseSettingsTabBar course={course} />
      {children}
    </section>
  );
};
