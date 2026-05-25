"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/button";
import { Typography } from "@/src/shared/ui/typography";
import { HomeworkSubmissionFormat } from "@/src/shared/api/exports";
import { api } from "@/src/shared/api";
import { getAcceptForFormats } from "@/src/shared/api/exports";
import { toast } from "@/src/shared/ui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HomeworkFileManagerProps } from "../models/props";
import { UploadFile } from "@/src/shared/ui/upload-file";

interface HomeworkSubmissionActionProps extends HomeworkFileManagerProps {
  assignmentId: number;
  onSuccess?: () => void;
}

export const HomeworkSubmissionAction: React.FC<
  HomeworkSubmissionActionProps
> = ({
  courseId,
  moduleId,
  materialId,
  assignmentId,
  allowedFormats,
  disabled = false,
  onSuccess,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const queryClient = useQueryClient();

  const submitHomeworkMutation = useMutation({
    mutationFn: async ({
      textAnswer,
      files,
    }: {
      textAnswer?: string;
      files?: File[];
    }) => {
      const formData = new FormData();
      if (textAnswer && textAnswer.trim()) {
        formData.append("text_answer", textAnswer);
      }
      // Добавляем файлы напрямую в FormData
      if (files && files.length > 0) {
        for (const file of files) {
          formData.append("files", file);
        }
      }
      return api.student.submitHomework(
        courseId,
        moduleId,
        materialId,
        assignmentId,
        formData,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Homework"] });
    },
  });

  const handleUploadAndSubmit = async () => {
    const hasTextAnswer = textAnswer.trim() !== "";

    if (selectedFiles.length === 0 && !hasTextAnswer) {
      toast({
        title: "Добавьте ответ или файлы",
        variant: "warning",
      });
      return;
    }

    try {
      // Отправляем задание с файлами напрямую
      await submitHomeworkMutation.mutateAsync({
        textAnswer: textAnswer.trim() || undefined,
        files: selectedFiles.length > 0 ? selectedFiles : undefined,
      });

      setSelectedFiles([]);
      setTextAnswer("");

      toast({
        title: "Задание отправлено",
        description:
          selectedFiles.length > 0
            ? `Загружено ${selectedFiles.length} файл(ов)`
            : "Текстовый ответ отправлен",
        variant: "success",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch {
      toast({
        title: "Ошибка отправки задания",
        description: "Попробуйте еще раз",
        variant: "warning",
      });
    }
  };

  const accept = getAcceptForFormats(allowedFormats || []);
  const hasTextFormat = allowedFormats?.includes(HomeworkSubmissionFormat.TEXT);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {hasTextFormat && (
        <div className="flex flex-col gap-4 w-full">
          <Typography.Subtitle>Текстовый ответ</Typography.Subtitle>
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="Введите ваш ответ..."
            rows={4}
            disabled={disabled || submitHomeworkMutation.isPending}
            className="font-roboto text-black placeholder-light-gray bg-base-raised font-medium w-full outline-0 px-4 py-3 rounded-xl"
          />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <Typography.Subtitle>Прикрепить файлы</Typography.Subtitle>
        <UploadFile
          accept={accept}
          multiple
          onFilesChange={setSelectedFiles}
          disabled={disabled || submitHomeworkMutation.isPending}
        />
      </div>

      <Button
        onClick={handleUploadAndSubmit}
        variant="primary"
        className="w-fit"
        disabled={
          disabled ||
          (selectedFiles.length === 0 && textAnswer.trim() === "") ||
          submitHomeworkMutation.isPending
        }
      >
        {submitHomeworkMutation.isPending ? "Отправка..." : "Отправить задание"}
      </Button>
    </div>
  );
};
