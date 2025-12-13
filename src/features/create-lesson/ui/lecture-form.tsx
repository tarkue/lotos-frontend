"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { InputVariant } from "@/src/shared/ui/input/variant";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRef, useState } from "react";
import { AddImageModal } from "./add-image-modal";

interface LectureFormProps extends ModuleProps {
  lessonTitle: string;
}

export const LectureForm: React.FC<LectureFormProps> = ({
  module,
  lessonTitle,
}) => {
  const { addModal, clear } = useModals();
  const [textContent, setTextContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          disabled={!textContent.trim()}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
