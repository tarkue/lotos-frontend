"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useState } from "react";
import { AddImageModal } from "./add-image-modal";
import { TextArea } from "@/src/shared/ui/textarea";

interface LectureFormProps extends ModuleProps {
  lessonTitle: string;
}

export const LectureForm: React.FC<LectureFormProps> = ({
  module,
  lessonTitle,
}) => {
  const { addModal, clear } = useModals();
  const [textContent, setTextContent] = useState<string>("");

  const handleAddImage = () => {
    addModal({
      title: "Добавить изображение",
      fields: <AddImageModal />,
    });
  };

  const handleSave = async () => {
    if (!textContent.trim()) {
      toast({
        title: "Ошибка",
        description: "Необходимо ввести содержимое лекции",
        variant: "warning",
      });
      return;
    }

    try {
      const position = (module.materials?.length || 0) + 1;

      await api.teacher.createMaterial(module.course_id, module.id, {
        type: MaterialType.TEXT,
        title: lessonTitle,
        position,
        content_url: null,
        text_content: textContent,
        transcript: null,
      });

      clear();
      toast({
        title: "Успешно",
        description: "Лекция создана",
        variant: "success",
      });

      window.location.reload();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать урок",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <TextArea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Введите содержимое лекции..."
        rows={10}
      />

      <div className="flex justify-end w-full gap-2">
        <Button variant="ghost" onClick={handleAddImage} className="w-min">
          Добавить изображение
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!textContent.trim()}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
