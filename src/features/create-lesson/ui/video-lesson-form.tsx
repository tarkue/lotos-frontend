"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { DragEvent, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

interface VideoLessonFormProps extends ModuleProps {
  lessonTitle: string;
}

export const VideoLessonForm: React.FC<VideoLessonFormProps> = ({
  module,
  lessonTitle,
}) => {
  const { clear } = useModals();
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{ id: number; name: string; file: File }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const videoFiles = Array.from(files).filter((file) => {
      const validTypes = [
        "video/mp4",
        "video/mpeg",
        "video/quicktime",
        "video/x-ms-wmv",
      ];
      return (
        validTypes.includes(file.type) ||
        file.name.endsWith(".mp4") ||
        file.name.endsWith(".mov") ||
        file.name.endsWith(".wmv")
      );
    });

    if (videoFiles.length === 0) {
      toast({
        title: "Некорректный формат",
        description: "Поддерживаемые форматы: mp4, mov, wmv",
        variant: "warning",
      });
      return;
    }

    setIsUploading(true);
    for (const file of videoFiles) {
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
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: number) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleSave = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "Ошибка",
        description: "Необходимо загрузить хотя бы одно видео",
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
          type: MaterialType.VIDEO,
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
        description: "Видео-урок создан",
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

      {uploadedFiles.length === 0 && (
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
            accept="video/mp4,video/mpeg,video/quicktime,video/x-ms-wmv,.mp4,.mov,.wmv"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <ClipLoader size={20} color="#6366f1" />
          ) : (
            <span className="text-center text-gray p-4">
              Нажмите сюда, чтобы загрузить видео, или просто перетащите его
              сюда
            </span>
          )}
        </div>
      )}

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: mp4, mov, wmv
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
