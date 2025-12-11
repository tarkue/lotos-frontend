"use client";
import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { toast } from "@/src/shared/ui/toast";

export const Enroll: React.FC<CourseProps> = ({ course }) => {
  const { isAuthenticated, role } = useAuth();
  const handle = async () => {
    try {
      await api.student.applyForCourse(course.id);
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

  if (role !== undefined && role !== RoleType.STUDENT) {
    return <></>;
  }

  return (
    <Button
      size="large"
      variant="primary"
      onClick={handle}
      disabled={!isAuthenticated}
      className="md:w-min w-full"
    >
      Записаться
      <Icon glyph="plus" size="20" color={isAuthenticated ? "white" : "gray"} />
    </Button>
  );
};
