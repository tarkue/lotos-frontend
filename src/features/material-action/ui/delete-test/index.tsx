import { MaterialProps } from "@/src/entity/material";
import { api } from "@/src/shared/api";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

const HandleDeleteButton: React.FC<MaterialProps> = ({ material }) => {
  const router = useRouter();
  const { clear } = useModals();

  const handle = async () => {
    material.tests!.forEach(async (el) => {
      try {
        await api.test.deleteTest(
          material.module!.course_id,
          material.module!.id,
          material.id,
          el.id
        );
        router.refresh();
        clear();
      } catch {
        toast({
          title: "Произошла непредвиденная ошибка.",
          description: "Перезагрузите страницу.",
          variant: "warning",
        });
      }
    });
  };
  return (
    <Button variant="primary" size="large" onClick={handle}>
      Удалить тест
    </Button>
  );
};

export const DeleteTest: React.FC<MaterialProps> = ({ material }) => {
  const { role } = useAuth();
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Удаление теста",
      description: `Вы действительно хотите удалить тест из урока "${material.title}"`,
      buttons: <HandleDeleteButton material={material} />,
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
      Удалить тест
    </Button>
  );
};
