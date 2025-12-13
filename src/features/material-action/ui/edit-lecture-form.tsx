"use client";
import { Material } from "@/src/entity/material";
import { AddImageModal } from "@/src/features/create-lesson/ui/add-image-modal";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { InputVariant } from "@/src/shared/ui/input/variant";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRef, useState } from "react";

interface EditLectureFormProps {
  material: Material;
  courseId: number;
  moduleId: number;
}

export const EditLectureForm: React.FC<EditLectureFormProps> = ({
  material,
  courseId,
  moduleId,
}) => {
  const { addModal, clear } = useModals();
  const [title, setTitle] = useState<string>(material.title || "");
  const [textContent, setTextContent] = useState<string>(
    material.text_content || ""
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddImage = () => {
    addModal({
      title: "Добавить изображение",
      fields: <AddImageModal />,
    });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Необходимо ввести название урока",
        variant: "warning",
      });
      return;
    }

    if (!textContent.trim()) {
      toast({
        title: "Ошибка",
        description: "Необходимо ввести содержимое лекции",
        variant: "warning",
      });
      return;
    }

    try {
      await api.teacher.updateMaterial(courseId, moduleId, material.id, {
        title,
        text_content: textContent,
      });

      clear();
      toast({
        title: "Успешно",
        description: "Лекция обновлена",
        variant: "success",
      });

      window.location.reload();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить урок",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Название урока"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <div
        className={cn(
          InputVariant({ size: "large" }),
          "items-start min-h-[200px]"
        )}
      >
        <textarea
          ref={textareaRef}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Введите содержимое лекции..."
          className="font-nunito text-black placeholder-base-300 font-medium w-full outline-0 resize-none min-h-[180px] max-h-[500px]"
          rows={10}
        />
      </div>

      <div className="flex justify-end w-full gap-2">
        <Button
          variant="ghost"
          size="large"
          onClick={handleAddImage}
          className="w-min"
        >
          Добавить изображение
        </Button>
        <Button
          variant="primary"
          size="large"
          onClick={handleSave}
          disabled={!title.trim() || !textContent.trim()}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
