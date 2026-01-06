"use client";
import { CourseProps } from "@/src/entity/course";
import { UserList } from "@/src/entity/user";
import { UserListProps } from "@/src/entity/user/models/user.model";
import { generateDeleteFromCourse } from "@/src/features/teacher-actions";
import { Typography } from "@/src/shared/ui/typography";

export const EditorListForDelete = ({
  users,
  course,
}: UserListProps & CourseProps) => {
  const DeleteEditorAction = generateDeleteFromCourse(course);
  if (users.length === 0) {
    return (
      <Typography.Subtitle className="text-gray w-full text-center">
        Тут пока ничего нет
      </Typography.Subtitle>
    );
  }
  return <UserList users={users} action={DeleteEditorAction} />;
};
