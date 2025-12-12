"use client";
import { Typography } from "@/src/shared/ui/typography";
import { useMemo } from "react";
import { getFullName } from "../libs/full-name";
import { UserProps } from "../models/user.model";

export const UserCard: React.FC<
  UserProps & { action?: React.FC<UserProps> }
> = ({ user, action }) => {
  const Act = action;
  const fullName = useMemo(() => getFullName(user), [user]);
  return (
    <div className="flex w-full">
      <Typography.Subtitle className="flex-1 w-max text-wrap">
        {fullName}
      </Typography.Subtitle>
      {Act && <Act user={user} />}
    </div>
  );
};
