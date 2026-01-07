"use client";
import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";

const DeleteModuleConfirm: React.FC<CourseProps> = ({ course }) => {
  const router = useRouter();
  const { clear } = useModals();
  const handle = async () => {
    try {
      await api.teacher.deleteCourse(course.id);
      clear();
      router.push(Endpoint.ALL_COURSES);
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
      Удалить курс
    </Button>
  );
};

export const Delete: React.FC<CourseProps> = ({ course }) => {
  const { addModal } = useModals();
  const handle = () => {
    addModal({
      title: "Удаление курса",
      description: `Вы действительно хотите удалить курс "${course.title}"?`,
      buttons: <DeleteModuleConfirm course={course} />,
    });
  };

  return (
    <Button
      variant="ghost"
      size="large"
      onClick={handle}
      className="w-fit"
      type="button"
    >
      Удалить этот курс
    </Button>
  );
};
