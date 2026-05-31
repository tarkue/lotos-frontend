"use client";
import { CourseDescription, CourseProps } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { CourseAction } from "@/src/features/course-action";
import { useMemo } from "react";
import { TeacherCourseActions } from "./teacher-actions";
import { Typography } from "@/src/shared/ui/typography";
import { SidebarPortal } from "@/src/shared/ui/sidebar";
import { AddModule } from "@/src/features/course-action/ui/add-module";

export const Course = ({ course }: CourseProps) => {
  const Action = useMemo(
    () => (course.is_enrolled ? CourseAction.ProgressBar : CourseAction.Enroll),
    [course.is_enrolled],
  );
  return (
    <>
      <SidebarPortal>
        <div className="flex flex-col gap-1 px-3">
          <Typography.Caption className="text-light-gray">
            КУРС
          </Typography.Caption>
          <Typography.Subtitle className="text-black">
            {course.title}
          </Typography.Subtitle>
        </div>
        <TeacherCourseActions course={course} />
        <Action course={course} />
      </SidebarPortal>
      <div className="pt-9 w-full">
        <CourseDescription course={course} action={AddModule} />
      </div>
    </>
  );
};
