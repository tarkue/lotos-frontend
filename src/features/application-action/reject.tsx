"use client";
import { api } from "@/src/shared/api";
import { CourseApplicationResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";

export const Reject = ({
  application,
}: {
  application: CourseApplicationResponseDTO;
}) => {
  const approveApplication = async () => {
    await api.teacher.rejectApplication(application.id);
  };

  return (
    <Button variant="ghost" size="icon-small" onClick={approveApplication}>
      <Icon glyph="trash" color="black" />
    </Button>
  );
};
