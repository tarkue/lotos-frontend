"use client";
import { ModuleProps } from "@/src/entity/module";
import { TeacherAddLesson } from "@/src/features/create-lesson";
import { DeleteModule } from "@/src/features/delete-module";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Typography } from "@/src/shared/ui/typography";

export const ModuleNotFound: React.FC<ModuleProps> = ({ module }) => {
  const { role } = useAuth();

  if (role === undefined || role === RoleType.STUDENT) {
    return (
      <Typography.Body className="text-base-300 text-center w-full">
        <strong>Здесь пока ничего нет</strong>
      </Typography.Body>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <Typography.Body className="text-base-300 text-center w-full">
        <strong>Этот модуль пуст. Выберите действие ниже:</strong>
      </Typography.Body>
      <div className="flex flex-col md:flex-row gap-4 md:top-6 w-full md:w-min m-auto">
        <DeleteModule module={module} />
        <TeacherAddLesson module={module} />
      </div>
    </div>
  );
};
