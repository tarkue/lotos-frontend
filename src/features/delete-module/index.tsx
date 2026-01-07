"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

const DeleteModuleConfirm: React.FC<ModuleProps> = ({ module }) => {
  const router = useRouter();
  const { clear } = useModals();
  const handle = async () => {
    try {
      await api.teacher.deleteModule(module.course_id, module.id);
      clear();
      router.push(formatEndpoint(Endpoint.COURSE, [module.course_id]));
    } catch {
      toast({
        title: "Произошла непредвиденная ошибка!",
        description: "Попробуйте перезагрузить страницу",
        variant: "warning",
      });
    }
  };

  return (
    <Button onClick={handle} variant="primary" size="large">
      Удалить модуль
    </Button>
  );
};

export const DeleteModule: React.FC<ModuleProps> = ({ module }) => {
  const { addModal } = useModals();
  const { role } = useAuth();
  const handle = () => {
    addModal({
      title: "Удаление модуля",
      description: `Вы действительно хотите удалить модуль "${module.title}"?`,
      buttons: <DeleteModuleConfirm module={module} />,
    });
  };

  if (role === RoleType.STUDENT) {
    return <></>;
  }

  return (
    <Button variant="ghost" size="large" onClick={handle} className="w-full">
      <Icon glyph="trash" color="black" />
      Удалить этот модуль
    </Button>
  );
};
