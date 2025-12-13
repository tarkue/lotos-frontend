"use client";
import { Course } from "@/src/entity/course";
import { getFullName, UserProps } from "@/src/entity/user";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";

export const generateDeleteFromCourse = (course: Course) => {
  const UserAction: React.FC<UserProps> = ({ user }) => {
    const { addModal } = useModals();
    const deleteFromCourse = async () => {
      addModal({
        title: "Отчисление с курса",
        description: `Вы действительно хотите отчислить пользователя ${getFullName(
          user
        )} с курса?`,
        buttons: (
          <Button
            variant="primary"
            size="large"
            onClick={async () => {
              await api.teacher.deleteUserFromCourse(course.id, user.id);
            }}
          >
            Отчислить
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
  return UserAction;
};
