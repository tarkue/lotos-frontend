"use client";
import { CourseProps } from "@/src/entity/course";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ModalContent: React.FC<CourseProps> = ({ course }) => {
  const router = useRouter();
  const { clear } = useModals();
  const [title, setTitle] = useState<string>("");

  const handleModal = async () => {
    if (course.modules?.length !== undefined) {
      try {
        const m = await api.teacher.createModule(course.id, {
          title: title,
          position: course.modules?.length + 1,
        });
        router.push(formatEndpoint(Endpoint.MODULE, [m.course_id, m.id]));
        clear();
      } catch {
        toast({
          title: "Некорректные данные",
          description: "Имя модуля обязательно",
          variant: "warning",
        });
      }
    } else {
      toast({
        title: "Непредвиденная ошибка!",
        variant: "warning",
        description: "Перезагрузите страницу",
      });
    }
  };

  return (
    <>
      <Input
        placeholder="Модуль 6. Название модуля"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <Button
        variant="primary"
        size="large"
        onClick={handleModal}
        className="w-min"
      >
        Создать
      </Button>
    </>
  );
};

export const AddModule: React.FC<CourseProps> = ({ course }) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Создать модуль",
      fields: <ModalContent course={course} />,
    });
  };
  return (
    <Button
      size="large"
      variant="primary"
      onClick={handle}
      className="md:w-min w-full"
    >
      Добавить модуль
    </Button>
  );
};
