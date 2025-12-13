"use client";
import { api } from "@/src/shared/api";
import { CourseApplicationResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

export const Approve = ({
  application,
}: {
  application: CourseApplicationResponseDTO;
}) => {
  const router = useRouter();
  const approveApplication = async () => {
    try {
      await api.teacher.approveApplication(application.id);
      router.refresh();
      toast({
        title: "Заявка принята",
        variant: "success",
      });
    } catch {
      toast({
        title: "Произошла непредвиденная страница",
        description: "Перезагрузите страницу",
        variant: "warning",
      });
    }
  };

  return (
    <Button variant="ghost" size="icon-small" onClick={approveApplication}>
      <Icon glyph="add-user" color="black" />
    </Button>
  );
};
