"use client";
import { CourseProps } from "@/src/entity/course";
import { UserList } from "@/src/entity/user";
import { UserListProps } from "@/src/entity/user/models/user.model";
import { generateDeleteFromCourse } from "@/src/features/user-action";
import { Typography } from "@/src/shared/ui/typography";

export const UserListForDelete = ({
  users,
  course,
}: UserListProps & CourseProps) => {
  const DeleteUserAction = generateDeleteFromCourse(course);
  if (users.length === 0) {
    return (
      <Typography.Subtitle className="text-gray w-full text-center">
        Тут пока ничего нет
      </Typography.Subtitle>
    );
  }
  return <UserList users={users} action={DeleteUserAction} />;
};
