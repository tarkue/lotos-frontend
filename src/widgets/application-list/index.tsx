"use client";
import { UserProps } from "@/src/entity/user";
import { ApplicationAction } from "@/src/features/application-action";
import { QueryPagination } from "@/src/features/pagination";
import { QuerySearch } from "@/src/features/search";
import { CourseApplicationResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { TableBuilder } from "@/src/shared/ui/table";
import { Typography } from "@/src/shared/ui/typography";

const generateApplicationActions = (
  applications: CourseApplicationResponseDTO[],
) => {
  const ApplicationActions: React.FC<UserProps> = ({ user }) => {
    const application = applications.find((el) => el.user.id === user.id);

    if (application === undefined) {
      return <></>;
    }
    return (
      <div className="flex gap-2">
        <ApplicationAction.Approve application={application} />
        <ApplicationAction.Reject application={application} />
      </div>
    );
  };
  return ApplicationActions;
};

export const ApplicationList = ({
  applications,
  total,
  page,
  pageSize,
}: {
  applications: CourseApplicationResponseDTO[];
  total: number;
  page: number;
  pageSize: number;
}) => {
  const totalPages = Math.ceil(total / pageSize);

  const ActionWrapper: React.FC<{ row: CourseApplicationResponseDTO }> = ({
    row,
  }) => {
    const Actions = generateApplicationActions(applications);
    return <Actions user={row.user} />;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-1 w-full">
          <Typography.Title className="text-dark-gray">
            Заявки на курс
          </Typography.Title>
          <Typography.Body className="text-light-gray">
            Все люди, подавшие заявку
          </Typography.Body>
        </div>
        <QuerySearch alias="applications_q" />
      </div>
      <TableBuilder
        data={applications}
        columns={[
          {
            key: "user.full_name",
            header: "Студент",
          },
          {
            key: "user.group_name",
            header: "Группа",
          },
          {
            key: "applied_at",
            header: "Дата заявки",
            cell: (value) =>
              new Date(value as string).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }),
          },
        ]}
        action={ActionWrapper}
      />
      {totalPages > 1 && <QueryPagination total={totalPages} />}
    </div>
  );
};
