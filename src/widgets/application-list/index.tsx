"use client";
import { UserList, UserProps } from "@/src/entity/user";
import { ApplicationAction } from "@/src/features/application-action";
import { CourseApplicationResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Typography } from "@/src/shared/ui/typography";
import { useMemo } from "react";

const generateApplicationActions = (
  applications: CourseApplicationResponseDTO[]
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
}: {
  applications: CourseApplicationResponseDTO[];
}) => {
  applications = applications?.filter?.((a) => a.status === "pending");
  const users = useMemo(() => applications?.map((a) => a.user), [applications]);
  const action = useMemo(
    () => generateApplicationActions(applications),
    [applications]
  );
  if (!applications || applications?.length === 0) {
    return (
      <Typography.Subtitle className="text-gray w-full text-center">
        Тут пока ничего нет
      </Typography.Subtitle>
    );
  }
  return <UserList users={users} action={action} />;
};
