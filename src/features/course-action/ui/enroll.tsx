"use client";
import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { ApplicationStatus } from "@/src/shared/api/enum/application-status.enum";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { toast } from "@/src/shared/ui/toast";
import { useState } from "react";

export const Enroll: React.FC<CourseProps> = ({ course }) => {
  const { isAuthenticated, role } = useAuth();
  const [isSent, setIsSent] = useState(false);
  const isRequested =
    course.is_enrolled ||
    course.application_status === ApplicationStatus.PENDING ||
    isSent;
  const handle = async () => {
    try {
      await api.student.applyForCourse(course.id);
      setIsSent(true);
      toast({
        title: "Вы успешно записались",
        description: "Ожидайте подтверждение от учителя",
        variant: "success",
      });
    } catch {
      toast({
        title: "Вы уже отправили заявку или уже записаны",
        variant: "warning",
      });
    }
  };

  if (
    (role !== undefined && role !== RoleType.STUDENT) ||
    course?.application_status === ApplicationStatus.APPROVED
  ) {
    return <></>;
  }

  return (
    <Button
      variant="primary"
      onClick={handle}
      disabled={!isAuthenticated || isRequested}
      className="md:w-min w-full"
    >
      Записаться
    </Button>
  );
};
