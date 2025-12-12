"use client";
import { CourseProps } from "@/src/entity/course";
import { Tab } from "@/src/shared/ui/tab";
import { useSettingsTabBar } from "./libs/use-tab-bar";

export const CourseSettingsTabBar: React.FC<CourseProps> = ({ course }) => {
  const { elements, onChange, defaultValue } = useSettingsTabBar(course);
  return (
    <Tab.Map
      elements={elements}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};
