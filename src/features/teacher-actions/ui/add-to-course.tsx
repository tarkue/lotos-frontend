"use client";
import { getFullName } from "@/src/entity/user";
import { api } from "@/src/shared/api";
import { EditorResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Button } from "@/src/shared/ui/button";
import { CheckboxField } from "@/src/shared/ui/checkbox";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const AdditionalList = ({
  editors,
  courseId,
}: {
  editors: EditorResponseDTO[];
  courseId: number;
}) => {
  const router = useRouter();
  const { clear } = useModals();
  const [search, setSearch] = useState<string>("");
  const selectedUsers = useMemo(
    () => editors.map((el) => el.user.id),
    [editors]
  );
  const { data } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: () =>
      api.admin.getUsers({
        role: "teacher",
        search: search !== "" ? search : undefined,
      }),
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newEditorsList = new FormData(e.currentTarget).getAll("editors");

    const editorsForDelete = editors.filter(
      (ed) =>
        !newEditorsList.some(
          (newEditor) => Number.parseInt(newEditor.toString()) === ed.user.id
        )
    );
    const editorsIdsForAdd = newEditorsList.filter(
      (newEditor) =>
        !editors.some(
          (editor) => Number.parseInt(newEditor.toString()) === editor.user.id
        )
    );

    editorsForDelete.forEach(
      async (editor) => await api.teacher.removeEditor(courseId, editor.id)
    );

    editorsIdsForAdd.forEach(
      async (editor) =>
        await api.teacher.addEditor(courseId, {
          user_id: Number.parseInt(editor.toString()),
        })
    );

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
          <div className="flex flex-col gap-2 w-full">
            {data?.users.map((el, i) => {
              return (
                <div key={i} className="flex w-full items-center gap-1">
                  <CheckboxField
                    defaultChecked={selectedUsers.some(
                      (user) => user === el.id
                    )}
                    name="editors"
                    value={el.id}
                    field={getFullName(el)}
                  />
                </div>
              );
            })}
          </div>
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

export const AddToCourse = ({
  editors,
  courseId,
}: {
  editors: EditorResponseDTO[];
  courseId: number;
}) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Изменить преподавательский состав",
      fields: <AdditionalList courseId={courseId} editors={editors} />,
    });
  };
  return (
    <Button variant="primary" size="large" onClick={handle}>
      Изменить состав
    </Button>
  );
};
