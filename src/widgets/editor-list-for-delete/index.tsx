"use client";
import { CourseProps } from "@/src/entity/course";
import { UserList } from "@/src/entity/user";
import { generateDeleteFromCourse } from "@/src/features/teacher-actions";
import { EditorResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Typography } from "@/src/shared/ui/typography";
import { useMemo } from "react";

export const EditorListForDelete = ({
  editors,
  course,
}: { editors: EditorResponseDTO[] } & CourseProps) => {
  const users = useMemo(() => editors.map((el) => el.user), [editors]);
  const DeleteEditorAction = generateDeleteFromCourse(course, editors);

  if (users.length === 0) {
    return (
      <Typography.Subtitle className="text-gray w-full text-center">
        Тут пока ничего нет
      </Typography.Subtitle>
    );
  }
  return <UserList users={users} action={DeleteEditorAction} />;
};
