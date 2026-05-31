"use client";
import React from "react";

import { User, UserListProps } from "@/src/entity/user/models/user.model";
import { TeacherAction } from "@/src/features/teacher-actions";
import { TableBuilder } from "@/src/shared/ui/table";
import { getFullName } from "@/src/entity/user";

const ActionWrapper: React.FC<{ row: User }> = ({ row }) => (
  <TeacherAction.SetRoleStudent user={row} />
);

export const TeacherListForDelete = ({ users }: UserListProps) => {
  return (
    <TableBuilder
      data={users}
      columns={[
        {
          key: "first_name",
          header: "Преподаватель",
          cell: (value, row) => getFullName(row),
        },
        {
          key: "email",
          header: "Email",
        },
      ]}
      action={ActionWrapper}
      emptyMessage="Тут пока ничего нет"
    />
  );
};
