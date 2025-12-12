"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { MaterialActionProps } from "./models/material-action";
import { MaterialComplete } from "./ui/complete";
import { StartTest } from "./ui/start-test";

export const MaterialAction = (props: MaterialActionProps) => {
  const { role } = useAuth();

  if (role !== RoleType.STUDENT) {
    return <></>;
  }

  const Action = props.material.has_tests ? StartTest : MaterialComplete;
  return <Action {...props} />;
};
