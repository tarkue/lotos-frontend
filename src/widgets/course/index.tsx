"use client";
import { CourseDescription, CourseProps } from "@/src/entity/course";
import { ModuleList } from "@/src/entity/module";
import { BackButton } from "@/src/features/back";
import { CourseAction } from "@/src/features/course-action";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Suspense, useMemo } from "react";
import { TeacherCourseActions } from "./teacher-actions";

export const Course = ({ course }: CourseProps) => {
  const action = useMemo(
    () => (course.is_enrolled ? CourseAction.ProgressBar : CourseAction.Enroll),
    [course.is_enrolled]
  );
  return (
    <>
      <div className="w-full">
        <BackButton endpoint={Endpoint.ALL_COURSES} />
      </div>
      <CourseDescription course={course} action={action} />
      <Suspense>
        <TeacherCourseActions course={course} />
      </Suspense>
      {course.modules && <ModuleList modules={course.modules} />}
    </>
  );
};
