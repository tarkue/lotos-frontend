"use client";
import { getFullName, UserProps } from "@/src/entity/user";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { useRouter } from "next/navigation";

export const SetRoleStudent: React.FC<UserProps> = ({ user }) => {
  const { addModal, clear } = useModals();
  const router = useRouter();
  const handle = async () => {
    addModal({
      title: "Изменение роли",
      description: `Вы действительно хотите разжаловать преподавателя ${getFullName(
        user
      )}?`,
      buttons: (
        <Button
          variant="primary"
          size="large"
          onClick={async () => {
            await api.admin.updateUser(user.id, {
              role: "students",
            });
            clear();
            router.refresh();
          }}
        >
          Разжаловать
        </Button>
      ),
    });
  };

  return (
    <Button variant="ghost" size="icon-small" onClick={handle}>
      <Icon glyph="trash" color="black" />
    </Button>
  );
};
