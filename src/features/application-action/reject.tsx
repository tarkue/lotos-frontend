"use client";
import { api } from "@/src/shared/api";
import { CourseApplicationResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

export const Reject = ({
  application,
}: {
  application: CourseApplicationResponseDTO;
}) => {
  const router = useRouter();
  const approveApplication = async () => {
    try {
      await api.teacher.rejectApplication(application.id);
      router.refresh();
      toast({
        title: "Заявка отклонена",
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
      <Icon glyph="trash" color="black" />
    </Button>
  );
};
