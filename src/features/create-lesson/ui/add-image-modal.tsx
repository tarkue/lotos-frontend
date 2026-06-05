/* eslint-disable @next/next/no-img-element */
"use client";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { UploadFile } from "@/src/shared/ui/upload-file";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { useState } from "react";
import { TextArea } from "@/src/shared/ui/textarea";

export const AddImageModal: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    file_url: string;
    original_filename: string;
  } | null>(null);
  const [markdownCode, setMarkdownCode] = useState<string>("");

  const handleFilesChange = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const isValidType =
      validTypes.includes(file.type) ||
      file.name.endsWith(".jpeg") ||
      file.name.endsWith(".jpg") ||
      file.name.endsWith(".png") ||
      file.name.endsWith(".webp");

    if (!isValidType) {
      toast({
        title: "Некорректный формат",
        description: "Поддерживаемые форматы: jpeg, png, webp",
        variant: "warning",
      });
      return;
    }

    setIsUploading(true);
    try {
      const uploadedFile = await api.teacher.uploadFile(file);
      const fileUrl = api.getFile(uploadedFile.file_url);
      const markdown = `![${uploadedFile.original_filename}](${fileUrl})`;

      setUploadedFile({
        file_url: fileUrl,
        original_filename: uploadedFile.original_filename,
      });
      setMarkdownCode(markdown);
    } catch {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить изображение",
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownCode);
      toast({
        title: "Скопировано",
        description: "Markdown разметка скопирована в буфер обмена",
        variant: "success",
      });
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать в буфер обмена",
        variant: "error",
      });
    }
  };

  if (uploadedFile && markdownCode) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <span className="text-base font-medium">
            Изображение успешно загружено!
          </span>
          <div className="flex items-center justify-center p-4 bg-base-100 rounded-lg">
            <img
              src={uploadedFile.file_url}
              alt={uploadedFile.original_filename}
              className="max-w-full max-h-48 object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Typography.Body>
            Вставьте эту строку туда, где вы хотите разместить изображение:
          </Typography.Body>
          <div
            className={cn(
              "items-start min-h-20",
              "border border-light-gray rounded-lg p-2",
            )}
          >
            <TextArea value={markdownCode} readOnly rows={3} />
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <Button variant="primary" onClick={handleCopy} className="flex-1">
            Копировать
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <UploadFile
        onFilesChange={handleFilesChange}
        accept="image/jpeg,image/png,image/webp"
        multiple={false}
        className={cn(isUploading && "opacity-50 pointer-events-none")}
      />
      <span className="text-sm text-base-500">
        Поддерживаемые форматы: jpeg, png, webp
      </span>
    </div>
  );
};
