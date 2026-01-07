"use client";
import { getFullName } from "@/src/entity/user";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { RadioField, RadioGroup } from "@/src/shared/ui/radio";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { toast } from "@/src/shared/ui/toast";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const UserList = () => {
  const { clear } = useModals();
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { data } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: () =>
      api.admin.getUsers({
        role: "students",
        search: search !== "" ? search : undefined,
      }),
  });
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userId = new FormData(e.currentTarget).get("user")?.toString();

    if (!userId) {
      toast({
        title: "Произошла ошибка",
        description: "Выберите пользователя",
        variant: "warning",
      });
      return;
    }

    await api.admin.updateUser(Number.parseInt(userId), {
      role: "teacher",
    });
    clear();
    router.refresh();
  };
  return (
    <form className="flex flex-col gap-3 w-full" onSubmit={handleSubmit}>
      <Input
        placeholder="Искать..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className="w-full">
        <ScrollArea className="w-full overflow-y-hidden">
          <RadioGroup className="flex flex-col gap-1 w-full">
            {data?.users.map((el, i) => (
              <div key={i} className="flex w-full items-center gap-1">
                <RadioField name="user" value={el.id} field={getFullName(el)} />
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </div>
      <div className="flex justify-end">
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export const Create = () => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Сделать пользователя преподавателем",
      fields: <UserList />,
    });
  };
  return (
    <Button variant="primary" size="large" onClick={handle}>
      Создать учителя
    </Button>
  );
};
