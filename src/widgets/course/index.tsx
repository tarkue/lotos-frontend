"use client";
import { CourseDescription, CourseProps } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { CourseAction } from "@/src/features/course-action";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Suspense, useMemo } from "react";
import { TeacherCourseActions } from "./teacher-actions";
import { Typography } from "@/src/shared/ui/typography";
import { SidebarPortal } from "@/src/shared/ui/sidebar";

export const Course = ({ course }: CourseProps) => {
  const action = useMemo(
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
        {course.modules && <ModuleList modules={course.modules} />}
        <Suspense>
          <TeacherCourseActions course={course} />
        </Suspense>
      </SidebarPortal>
      <div className="pt-9 w-full">
        <CourseDescription course={course} action={action} />
      </div>
    </>
  );
};
