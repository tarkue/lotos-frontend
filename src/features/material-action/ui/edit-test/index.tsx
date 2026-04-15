import { MaterialProps } from "@/src/entity/material";
import { AddTestForm } from "@/src/features/create-lesson";
import { api } from "@/src/shared/api";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

const HandleEditButton: React.FC<MaterialProps> = ({ material }) => {
  const router = useRouter();
  const { clear } = useModals();

  const handleSuccess = () => {
    clear();
    router.refresh();
    toast({
      title: "Тест обновлен",
      description: "Изменения сохранены успешно",
      variant: "success",
    });
  };

  if (!material.tests || material.tests.length === 0) {
    return null;
  }

  // Получаем первый тест (предполагаем, что у материала может быть только один тест)
  const test = material.tests[0];

  return (
    <AddTestForm
      module={material.module!}
      onSuccess={handleSuccess}
      editMode={true}
      existingTest={test}
    />
  );
};

export const EditTest: React.FC<MaterialProps> = ({ material }) => {
  const { role } = useAuth();
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Редактирование теста",
      description: `Редактирование теста для урока "${material.title}"`,
      fields: <HandleEditButton material={material} />,
    });
  };

  if (
    material.tests === undefined ||
    material.tests.length === 0 ||
    role === undefined ||
    role === RoleType.STUDENT
  ) {
    return <></>;
  }

  return (
    <Button
      variant="ghost"
      size="large"
      className="w-full md:w-min"
      onClick={handle}
    >
      Редактировать тест
    </Button>
  );
};