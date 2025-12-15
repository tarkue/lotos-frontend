"use client";
import { CourseProps } from "@/src/entity/course";
import { CourseAction } from "@/src/features/course-action";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";

export const TeacherCourseActions: React.FC<CourseProps> = ({ course }) => {
  const { role } = useAuth();
  if (role !== RoleType.TEACHER && role !== RoleType.ADMIN) {
    return <></>;
  }
  return (
    <div className="flex w-full justify-between flex-col md:flex-row gap-2">
      <CourseAction.OpenSettings course={course} />
      <CourseAction.AddModule course={course} />
    </div>
  );
};
