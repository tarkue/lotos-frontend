"use client";
import { Material } from "@/src/entity/material";
import { AddImageModal } from "@/src/features/create-lesson/ui/add-image-modal";
import { api } from "@/src/shared/api";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { TextArea } from "@/src/shared/ui/textarea";
import { toast } from "@/src/shared/ui/toast";
import { useState } from "react";
import { EditTestForm } from "./edit-test-form";
import { Icon } from "@/src/shared/ui/icon";

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
    material.text_content || "",
  );

  const handleAddImage = () => {
    addModal({
      title: "Добавить изображение",
      fields: <AddImageModal />,
    });
  };

  const handleEditTest = () => {
    addModal({
      title: "Редактировать тест",
      maxWidth: "600px",
      fields: (
        <EditTestForm
          material={material}
          courseId={courseId}
          moduleId={moduleId}
        />
      ),
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

      <TextArea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="Введите содержимое лекции..."
        className="font-roboto text-black placeholder-base-300 font-medium w-full outline-0 resize-none min-h-[180px] max-h-[500px]"
        rows={10}
      />

      {material.has_tests && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Icon glyph="test" color="dark-gray" size="20" />
          <span className="text-sm text-gray-700">
            Тест привязан к этому материалу
          </span>
        </div>
      )}

      <div className="flex justify-end w-full gap-2">
        {material.has_tests && (
          <Button variant="ghost" onClick={handleEditTest} className="w-min">
            Редактировать тест
          </Button>
        )}
        <Button variant="ghost" onClick={handleAddImage} className="w-min">
          Добавить изображение
        </Button>
        <Button
          variant="primary"
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
