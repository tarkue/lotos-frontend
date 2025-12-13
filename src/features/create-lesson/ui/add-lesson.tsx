"use client";
import { ModuleProps } from "@/src/entity/module";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { CreateLessonModal } from "./create-lesson-modal";

export const AddLesson: React.FC<ModuleProps> = ({ module }) => {
  const { addModal } = useModals();

  const handle = () => {
    addModal({
      title: "Создать урок",
      fields: <CreateLessonModal module={module} />,
    });
  };

  return (
    <Button size="large" variant="primary" onClick={handle} className="w-full">
      Создать урок
    </Button>
  );
};
