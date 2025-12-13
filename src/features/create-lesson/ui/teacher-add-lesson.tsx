"use client";
import { ModuleProps } from "@/src/entity/module";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { AddLesson } from "./add-lesson";

export const TeacherAddLesson: React.FC<ModuleProps> = ({ module }) => {
  const { role } = useAuth();

  if (role !== RoleType.TEACHER && role !== RoleType.ADMIN) {
    return <></>;
  }

  return <AddLesson module={module} />;
};
