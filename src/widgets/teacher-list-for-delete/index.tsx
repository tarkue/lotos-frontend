"use client";
import { UserList } from "@/src/entity/user";
import { UserListProps } from "@/src/entity/user/models/user.model";
import { TeacherAction } from "@/src/features/teacher-actions";
import { Typography } from "@/src/shared/ui/typography";

export const TeacherListForDelete = ({ users }: UserListProps) => {
  if (users.length === 0) {
    return (
      <Typography.Subtitle className="text-gray w-full text-center">
        Тут пока ничего нет
      </Typography.Subtitle>
    );
  }
  return <UserList users={users} action={TeacherAction.SetRoleStudent} />;
};
