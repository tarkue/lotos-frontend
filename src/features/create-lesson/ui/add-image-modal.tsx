/* eslint-disable @next/next/no-img-element */
"use client";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { InputVariant } from "@/src/shared/ui/input/variant";
import { toast } from "@/src/shared/ui/toast";
import { Typography } from "@/src/shared/ui/typography";
import { DragEvent, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

export const AddImageModal: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    file_url: string;
    original_filename: string;
  } | null>(null);
  const [markdownCode, setMarkdownCode] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

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
      setIsUploading(false);
    } finally {
      setIsUploading(false);
    }
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
              InputVariant({ size: "large" }),
              "items-start min-h-[80px]"
            )}
          >
            <textarea
              value={markdownCode}
              readOnly
              className="font-nunito text-black font-medium w-full outline-0 resize-none min-h-[60px]"
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            variant="primary"
            size="large"
            onClick={handleCopy}
            className="flex-1"
          >
            Копировать
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          borderRadius: "24px",
          border: "2px dashed var(--color-base-200)",
          height: "80px",
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-base-300 hover:border-base-400",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,.jpeg,.jpg,.png,.webp"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />
        {isUploading ? (
          <ClipLoader size={20} color="#6366f1" />
        ) : (
          <span className="text-center text-gray">
            Нажмите сюда, чтобы загрузить изображение, или просто перетащите его
            сюда
          </span>
        )}
      </div>

      <span className="text-sm text-base-500">
        Поддерживаемые форматы: jpeg, png, webp
      </span>
    </div>
  );
};
