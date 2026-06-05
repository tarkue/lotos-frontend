"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { UploadFile } from "@/src/shared/ui/upload-file";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { useState } from "react";

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
  const [isUploading, setIsUploading] = useState(false);

  const handleFilesChange = async (files: File[]) => {
    if (files.length === 0) return;

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
        },
      );

      const fileIds = uploadedFiles.map((file) => file.id);
      await api.teacher.attachFiles(
        module.course_id,
        module.id,
        material.id,
        fileIds,
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
                <Button variant="ghost" onClick={() => removeFile(file.id)}>
                  <Icon glyph="close" size="12" color="black" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <UploadFile
        onFilesChange={handleFilesChange}
        accept=".pptx,.ppt,.pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint,application/pdf"
        multiple={true}
        className={cn(isUploading && "opacity-50 pointer-events-none")}
      />

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: pptx, ppt, pdf
      </span>

      <div className="flex justify-end w-full">
        <Button
          variant="primary"
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
