"use client";
import { Course } from "@/src/entity/course";
import { getFullName, UserProps } from "@/src/entity/user";
import { api } from "@/src/shared/api";
import { EditorResponseDTO } from "@/src/shared/api/dto/teacher.dto";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { useRouter } from "next/navigation";

export const generateDeleteFromCourse = (
  course: Course,
  editors: EditorResponseDTO[]
) => {
  const TeacherAction: React.FC<UserProps> = ({ user }) => {
    const { addModal, clear } = useModals();
    const router = useRouter();
    const deleteFromCourse = async () => {
      addModal({
        title: "Разжалование редактора",
        description: `Вы действительно хотите забрать доступ у редактора ${getFullName(
          user
        )}?`,
        buttons: (
          <Button
            variant="primary"
            size="large"
            onClick={async () => {
              const editor = editors.find((el) => el.user.id === user.id)?.id;

              if (editor === undefined) {
                return;
              }
              await api.teacher.removeEditor(course.id, editor);
              router.refresh();
              clear();
            }}
          >
            Разжаловать
          </Button>
        ),
      });
    };
    return (
      <Button variant="ghost" size="icon-small" onClick={deleteFromCourse}>
        <Icon glyph="trash" color="black" />
      </Button>
    );
  };
  return TeacherAction;
};
