import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { MaterialActionProps } from "../models/material-action";

const ConfirmDelete = ({ material }: Pick<MaterialActionProps, "material">) => {
  const router = useRouter();
  const { clear } = useModals();

  const handle = async () => {
    try {
      await api.teacher.deleteMaterial(
        material.module!.course_id,
        material.module!.id,
        material.id
      );
      clear();
      router.push(
        formatEndpoint(Endpoint.MODULE, [
          material.module?.course_id,
          material.module?.id,
        ])
      );
      toast({
        title: "Урок успешно удалён",
        variant: "success",
      });
    } catch {
      toast({
        title: "Произошла непредвиденная ошибка",
        description: "Перезагрузите страницу",
        variant: "warning",
      });
    }
  };

  return (
    <Button onClick={handle} variant="primary" size="large">
      Подтвердить удаление
    </Button>
  );
};

export const DeleteMaterial = ({ material }: MaterialActionProps) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Удаление урока",
      description: `Вы действительно хотите удалить урок "${material.title}"`,
      buttons: <ConfirmDelete material={material} />,
    });
  };

  return (
    <Button variant="ghost" size="large" onClick={handle}>
      Удалить урок
    </Button>
  );
};
