"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { DragEvent, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

interface PresentationFormProps extends ModuleProps {
  lessonTitle: string;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({
  module,
  lessonTitle,
}) => {
  const { clear } = useModals();
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: number; name: string; file: File }>
  >([]);
  const [isDragging, setIsDragging] = useState(false);
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
        setUploadedFiles((prev) => [
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
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: number) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSave = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Ошибка",
        description: "Необходимо загрузить хотя бы одну презентацию",
        variant: "warning",
      });
      return;
    }

    try {
      const position = (module.materials?.length || 0) + 1;

      const material = await api.teacher.createMaterial(
        module.course_id,
        module.id,
        {
          type: MaterialType.PRESENTATION,
          title: lessonTitle,
          position,
          content_url: "",
          text_content: "",
          transcript: "",
        }
      );

      const fileIds = uploadedFiles.map((file) => file.id);
      await api.teacher.attachFiles(
        module.course_id,
        module.id,
        material.id,
        fileIds
      );

      clear();
      toast({
        title: "Успешно",
        description: "Презентация создана",
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
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium">
          Список загруженных материалов:
        </span>
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            {uploadedFiles.map((file, index) => (
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
                  onClick={() => removeFile(file.id)}
                >
                  <Icon glyph="close" size="12" color="black" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-20">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            borderRadius: "24px",
            border: "2px dashed var(--color-base-200)",
            height: "80px",
          }}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`flex flex-col items-center min-h-20 justify-center gap-2 p-8 border-2 border-dashed rounded-lg transition-colors ${
            isUploading
              ? "cursor-not-allowed opacity-50"
              : isDragging
              ? "border-primary bg-primary/10 cursor-pointer"
              : "border-base-300 hover:border-base-400 cursor-pointer"
          }`}
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
              Нажмите сюда, чтобы загрузить презентацию, или просто перетащите
              ее сюда
            </span>
          )}
        </div>
      </div>

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: pptx, ppt, pdf
      </span>

      <div className="flex justify-end w-full">
        <Button
          variant="primary"
          size="large"
          onClick={handleSave}
          disabled={uploadedFiles.length === 0}
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
