"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { MaterialActionProps } from "./models/material-action";
import { MaterialComplete } from "./ui/complete";
import { DeleteMaterial } from "./ui/delete";
import { StartTest } from "./ui/start-test";
import { UpdateMaterial } from "./ui/update-material";

export const MaterialAction = (props: MaterialActionProps) => {
  const { role } = useAuth();

  if (role === RoleType.STUDENT) {
    const Action = props.material.has_tests ? StartTest : MaterialComplete;
    return <Action {...props} />;
  }

  if (role === RoleType.ADMIN || role === RoleType.TEACHER) {
    return (
      <>
        <UpdateMaterial {...props} />
        <DeleteMaterial {...props} />
      </>
    );
  }

  return <></>;
};
