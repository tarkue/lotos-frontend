"use client";
import { Module, ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ModalContent: React.FC<ModuleProps & { courseId: number }> = ({
  module,
  courseId,
}) => {
  const router = useRouter();
  const { clear } = useModals();
  const [title, setTitle] = useState<string>(module.title);

  const handleModal = async () => {
    try {
      const m = await api.teacher.updateModule(courseId, module.id, {
        title: title,
        position: module.position,
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
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-dark-gray">Название модуля</Label>
        <Input
          placeholder="Название модуля"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>
      <Button variant="primary" onClick={handleModal} className="w-min">
        Сохранить
      </Button>
    </>
  );
};

export const EditModule: React.FC<ModuleProps & { courseId: number }> = ({
  module,
  courseId,
}) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Редактировать модуль",
      fields: <ModalContent module={module} courseId={courseId} />,
      maxWidth: "700px",
    });
  };
  return (
    <Button variant="secondary" onClick={handle} className="w-full">
      Редактировать модуль
    </Button>
  );
};
