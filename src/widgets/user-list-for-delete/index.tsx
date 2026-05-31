"use client";
import { CourseProps } from "@/src/entity/course";
import { getFullName } from "@/src/entity/user";
import { QuerySearch } from "@/src/features/search";
import { generateDeleteFromCourse } from "@/src/features/user-action";
import { UserResponseDTO } from "@/src/shared/api/dto/auth.dto";
import { CourseProgressResponseDTO } from "@/src/shared/api/exports";
import { TableBuilder } from "@/src/shared/ui/table";
import { Typography } from "@/src/shared/ui/typography";

export const UserListForDelete = ({
  users,
  course,
}: {
  users: {
    user: UserResponseDTO;
    progress: CourseProgressResponseDTO;
  }[];
} & CourseProps) => {
  const DeleteUserAction = generateDeleteFromCourse(course);

  const ActionWrapper: React.FC<{ row: (typeof users)[0] }> = ({ row }) => {
    const DeleteAction = DeleteUserAction;
    return <DeleteAction user={row.user} />;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1 w-full">
          <Typography.Title className="text-dark-gray">
            Студенты курса
          </Typography.Title>
          <Typography.Body className="text-light-gray">
            Все люди, обучающиеся на курсе
          </Typography.Body>
        </div>
        <div className="flex gap-3 w-full justify-end">
          <QuerySearch alias="students_q" />
        </div>
      </div>
      <TableBuilder
        data={users}
        columns={[
          {
            key: "user",
            header: "Пользователь",
            cell: (value, row) => {
              const r = row as (typeof users)[0];
              return getFullName(r.user);
            },
          },
          {
            key: "user.group_name",
            header: "Группа",
          },
        ]}
        action={ActionWrapper}
      />
    </div>
  );
};
