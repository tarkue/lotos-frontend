"use client";
import { ModuleProps } from "@/src/entity/module";
import { api } from "@/src/shared/api";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { HomeworkSubmissionFormat } from "@/src/shared/api/enum/homework-submission-format.enum";
import { Pair } from "@/src/shared/ui/select/pair";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { MultiSelect } from "@/src/shared/ui/select";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useState } from "react";
import { Label } from "@/src/shared/ui/label";

interface HomeworkFormProps extends ModuleProps {
  lessonTitle: string;
}

export const HomeworkForm: React.FC<HomeworkFormProps> = ({
  module,
  lessonTitle,
}) => {
  const { clear } = useModals();
  const [description, setDescription] = useState<string>("");
  const [allowedFormats, setAllowedFormats] = useState<Pair<string, string>[]>(
    [],
  );
  const [deadline, setDeadline] = useState<string>("");

  const formatOptions: Pair<string, string>[] = [
    { label: "Файлы", value: HomeworkSubmissionFormat.FILES },
    { label: "Текст", value: HomeworkSubmissionFormat.TEXT },
    { label: "Видео", value: HomeworkSubmissionFormat.VIDEO },
    { label: "Фото", value: HomeworkSubmissionFormat.PHOTO },
  ];

  const handleSave = async () => {
    if (!description.trim()) {
      return;
    }

    if (allowedFormats.length === 0) {
      return;
    }

    if (!deadline) {
      return;
    }

    try {
      const position = (module.materials?.length || 0) + 1;

      // Сначала создаём материал типа TEXT (лекция)
      const material = await api.teacher.createMaterial(
        module.course_id,
        module.id,
        {
          type: MaterialType.TEXT,
          title: lessonTitle,
          position,
          content_url: null,
          text_content: null,
          transcript: null,
        },
      );

      // Создаём дату из локального времени и переводим в UTC
      const localDate = new Date(deadline);
      const utcTimestamp =
        localDate.getTime() + localDate.getTimezoneOffset() * 60000;
      const deadlineISO = new Date(utcTimestamp).toISOString();

      await api.teacher.createHomework(
        module.course_id,
        module.id,
        material.id,
        {
          description: description.trim(),
          allowed_formats: allowedFormats.map(
            (f) => f.value as HomeworkSubmissionFormat,
          ),
          deadline: deadlineISO,
        },
      );

      clear();
      toast({
        title: "Успешно",
        description: "Лекция и домашнее задание созданы",
        variant: "success",
      });

      window.location.reload();
    } catch {
      toast({
        title: "Ошибка",
        description: "Не удалось создать урок и домашнее задание",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        placeholder="Название урока"
        value={lessonTitle}
        disabled
        className="bg-base-100"
      />
      <div className="flex flex-col gap-2 w-full">
        <Label className="text-black">Описание домашнего задания:</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание домашнего задания..."
          className="font-roboto text-black placeholder-dark-gray font-medium w-full outline-0 resize-none min-h-[100px] max-h-[300px] rounded-xl border border-base-border bg-base px-4 py-2"
          rows={4}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-black">Разрешённые форматы:</Label>
        <MultiSelect
          isMulti
          options={formatOptions}
          value={allowedFormats}
          onChange={(newValue) =>
            setAllowedFormats((newValue as Pair<string, string>[] | null) || [])
          }
          placeholder="Выберите форматы..."
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-black">Дедлайн (UTC):</Label>
        <Input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.currentTarget.value)}
          placeholder="Выберите дату и время"
        />
      </div>
      <div className="flex justify-end w-full">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={
            !description.trim() || allowedFormats.length === 0 || !deadline
          }
          className="w-min"
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};
