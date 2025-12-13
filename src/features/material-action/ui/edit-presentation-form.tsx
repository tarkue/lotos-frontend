"use client";
import { Material } from "@/src/entity/material";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { DragEvent, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

interface EditPresentationFormProps {
  material: Material;
  courseId: number;
  moduleId: number;
}

export const EditPresentationForm: React.FC<EditPresentationFormProps> = ({
  material,
  courseId,
  moduleId,
}) => {
  const { clear } = useModals();
  const [title, setTitle] = useState<string>(material.title || "");
  const [existingFiles, setExistingFiles] = useState(
    material.files?.map((f) => ({
      id: f.file_id,
      name: f.file.original_filename,
      isExisting: true,
    })) || []
  );
  const [newFiles, setNewFiles] = useState<
    Array<{ id: number; name: string; file: File }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const presentationFiles = Array.from(files).filter((file) => {
      return (
        file.name.endsWith(".pptx") ||
        file.name.endsWith(".ppt") ||
        file.name.endsWith(".pdf") ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
        file.type === "application/vnd.ms-powerpoint" ||
        file.type === "application/pdf"
      );
    });

    if (presentationFiles.length === 0) {
      toast({
        title: "Некорректный формат",
        description: "Поддерживаемые форматы: pptx, ppt, pdf",
        variant: "warning",
      });
      return;
    }

    setIsUploading(true);
    for (const file of presentationFiles) {
      try {
        const uploadedFile = await api.teacher.uploadFile(file);
        setNewFiles((prev) => [
          ...prev,
          { id: uploadedFile.id, name: file.name, file },
        ]);
      } catch {
        toast({
          title: "Ошибка загрузки",
          description: `Не удалось загрузить файл ${file.name}`,
          variant: "error",
        });
      }
    }
    setIsUploading(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
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

  const removeNewFile = (id: number) => {
    setNewFiles((prev) => prev.filter((file) => file.id !== id));
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

    if (existingFiles.length === 0 && newFiles.length === 0) {
      toast({
        title: "Ошибка",
        description: "Необходимо загрузить хотя бы одну презентацию",
        variant: "warning",
      });
      return;
    }

    try {
      await api.teacher.updateMaterial(courseId, moduleId, material.id, {
        title,
      });

      if (newFiles.length > 0) {
        const fileIds = newFiles.map((file) => file.id);
        await api.teacher.attachFiles(courseId, moduleId, material.id, fileIds);
      }

      clear();
      toast({
        title: "Успешно",
        description: "Презентация обновлена",
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

  const allFiles = [
    ...existingFiles.map((f) => ({ ...f, isExisting: true })),
    ...newFiles.map((f) => ({ ...f, isExisting: false })),
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Название урока"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />

      <div className="flex flex-col gap-2">
        <span className="text-base font-medium">
          Список загруженных материалов:
        </span>
        {allFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            {allFiles.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-base-100 rounded"
              >
                <Typography.Caption className="text-sm text-black">
                  {index + 1}. {file.name}
                </Typography.Caption>
                <Button
                  variant="ghost"
                  size="icon-large"
                  onClick={() =>
                    file.isExisting
                      ? removeExistingFile(file.id)
                      : removeNewFile(file.id)
                  }
                >
                  <Icon glyph="close" size="12" color="black" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {allFiles.length === 0 && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            borderRadius: "24px",
            border: "2px dashed var(--color-base-200)",
          }}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 p-8 transition-colors",
            isUploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pptx,.ppt,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,application/pdf"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <ClipLoader size={20} color="#6366f1" />
          ) : (
            <span className="text-center text-gray p-4">
              Нажмите сюда, чтобы загрузить презентацию, или просто перетащите
              ее сюда
            </span>
          )}
        </div>
      )}

      {allFiles.length > 0 && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            borderRadius: "24px",
            border: "2px dashed var(--color-base-200)",
            height: "80px",
          }}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 transition-colors",
            isUploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pptx,.ppt,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,application/pdf"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <ClipLoader size={20} color="#6366f1" />
          ) : (
            <span className="text-center text-gray">
              Добавить еще презентацию
            </span>
          )}
        </div>
      )}

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: pptx, ppt, pdf
      </span>

      <div className="flex justify-end w-full">
        <Button
          variant="primary"
          size="large"
          onClick={handleSave}
          disabled={allFiles.length === 0}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
