"use client";
import { Material } from "@/src/entity/material";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { UploadFile } from "@/src/shared/ui/upload-file";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { useState } from "react";
import { EditTestForm } from "./edit-test-form";

interface EditVideoLessonFormProps {
  material: Material;
  courseId: number;
  moduleId: number;
}

export const EditVideoLessonForm: React.FC<EditVideoLessonFormProps> = ({
  material,
  courseId,
  moduleId,
}) => {
  const { clear, addModal } = useModals();
  const [title, setTitle] = useState<string>(material.title || "");
  const [existingFiles, setExistingFiles] = useState(
    material.files?.map((f) => ({
      id: f.file_id,
      name: f.file.original_filename,
      isExisting: true,
    })) || [],
  );
  const [newFile, setNewFile] = useState<{
    id: number;
    name: string;
    file: File;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleFilesChange = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const validTypes = [
      "video/mp4",
      "video/mpeg",
      "video/quicktime",
      "video/x-ms-wmv",
    ];
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith(".mp4") ||
      file.name.endsWith(".mov") ||
      file.name.endsWith(".wmv");

    if (!isValidType) {
      toast({
        title: "Некорректный формат",
        description: "Поддерживаемые форматы: mp4, mov, wmv",
        variant: "warning",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFile = await api.teacher.uploadFile(file);
      setNewFile({ id: uploadedFile.id, name: file.name, file });

      // Если есть существующее видео, удаляем его
      if (existingFiles.length > 0) {
        const existingFileId = existingFiles[0].id;
        try {
          await api.teacher.detachFile(
            courseId,
            moduleId,
            material.id,
            existingFileId,
          );
          setExistingFiles([]);
        } catch {
          // Игнорируем ошибку удаления, так как новое видео уже загружено
        }
      }
    } catch {
      toast({
        title: "Ошибка загрузки",
        description: `Не удалось загрузить файл ${file.name}`,
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeExistingFile = async (fileId: number) => {
    try {
      await api.teacher.detachFile(courseId, moduleId, material.id, fileId);
      setExistingFiles((prev) => prev.filter((file) => file.id !== fileId));
      toast({
        title: "Успешно",
        description: "Файл удален",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить файл",
        variant: "error",
      });
    }
  };

  const removeNewFile = () => {
    setNewFile(null);
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

    if (existingFiles.length === 0 && !newFile) {
      toast({
        title: "Ошибка",
        description: "Необходимо загрузить видео",
        variant: "warning",
      });
      return;
    }

    try {
      await api.teacher.updateMaterial(courseId, moduleId, material.id, {
        title,
      });

      if (newFile) {
        await api.teacher.attachFiles(courseId, moduleId, material.id, [
          newFile.id,
        ]);
      }

      clear();
      toast({
        title: "Успешно",
        description: "Видео-урок обновлен",
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

  const currentFile = newFile
    ? { ...newFile, isExisting: false }
    : existingFiles.length > 0
      ? { ...existingFiles[0], isExisting: true }
      : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Название урока"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      {currentFile && (
        <div className="flex flex-col gap-2">
          <span className="text-base font-medium">Видео:</span>
          <div className="flex items-center justify-between p-2 bg-base-100 rounded">
            <Typography.Caption className="text-sm text-black">
              {currentFile.name}
            </Typography.Caption>
            <Button
              variant="ghost"
              onClick={() =>
                currentFile.isExisting
                  ? removeExistingFile(currentFile.id)
                  : removeNewFile()
              }
            >
              <Icon glyph="close" size="12" color="black" />
            </Button>
          </div>
        </div>
      )}

      {!currentFile && (
        <UploadFile
          onFilesChange={handleFilesChange}
          accept="video/mp4,video/mpeg,video/quicktime,video/x-ms-wmv"
          multiple={false}
          className={cn(isUploading && "opacity-50 pointer-events-none")}
        />
      )}

      {currentFile && (
        <div className="flex items-center justify-between p-2 bg-base-100 rounded">
          <Typography.Caption className="text-sm text-black">
            {currentFile.name}
          </Typography.Caption>
          <Button
            variant="ghost"
            onClick={() =>
              currentFile.isExisting
                ? removeExistingFile(currentFile.id)
                : removeNewFile()
            }
          >
            <Icon glyph="close" size="12" color="black" />
          </Button>
        </div>
      )}

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: mp4, mov, wmv
      </span>

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
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!currentFile}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
