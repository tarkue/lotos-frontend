"use client";
import { ModuleProps } from "@/src/entity/module";
import { MaterialType } from "@/src/shared/api/enum/material-type.enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useModals } from "@/src/shared/ui/modal";
import { RadioField, RadioGroup } from "@/src/shared/ui/radio";
import { useState } from "react";
import { LectureForm } from "./lecture-form";
import { PresentationForm } from "./presentation-form";
import { AddTestForm } from "./test-form";
import { VideoLessonForm } from "./video-lesson-form";

type LessonType =
  | MaterialType.VIDEO
  | MaterialType.TEXT
  | MaterialType.PRESENTATION
  | "test"
  | null;

export const CreateLessonModal: React.FC<ModuleProps> = ({ module }) => {
  const { addModal, clear } = useModals();
  const [title, setTitle] = useState<string>("");
  const [lessonType, setLessonType] = useState<LessonType>(null);

  const handleNext = () => {
    if (!title.trim() && lessonType !== "test") {
      return;
    }

    if (!lessonType) {
      return;
    }

    clear();

    if (lessonType === MaterialType.VIDEO) {
      addModal({
        title: "Создать видео-урок",
        fields: <VideoLessonForm module={module} lessonTitle={title} />,
      });
    } else if (lessonType === MaterialType.TEXT) {
      addModal({
        title: "Создать лекцию",
        fields: <LectureForm module={module} lessonTitle={title} />,
      });
    } else if (lessonType === MaterialType.PRESENTATION) {
      addModal({
        title: "Создать урок-презентацию",
        fields: <PresentationForm module={module} lessonTitle={title} />,
      });
    } else if (lessonType === "test") {
      addModal({
        title: "Создать тест",
        fields: <AddTestForm module={module} />,
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {lessonType !== "test" && (
        <Input
          placeholder="Название урока"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      )}
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium">Выберите тип урока:</span>
        <RadioGroup>
          <RadioField
            name="lessonType"
            value={MaterialType.VIDEO}
            checked={lessonType === MaterialType.VIDEO}
            onChange={(e) =>
              setLessonType(e.target.value as MaterialType.VIDEO)
            }
            field="Видео-урок"
          />
          <RadioField
            name="lessonType"
            value={MaterialType.TEXT}
            checked={lessonType === MaterialType.TEXT}
            onChange={(e) => setLessonType(e.target.value as MaterialType.TEXT)}
            field="Лекция"
          />
          <RadioField
            name="lessonType"
            value={"test"}
            checked={lessonType === "test"}
            onChange={(e) => setLessonType(e.target.value as MaterialType.TEXT)}
            field="Тест"
          />
          <RadioField
            name="lessonType"
            value={MaterialType.PRESENTATION}
            checked={lessonType === MaterialType.PRESENTATION}
            onChange={(e) =>
              setLessonType(e.target.value as MaterialType.PRESENTATION)
            }
            field="Презентация"
          />
        </RadioGroup>
      </div>
      <div className="flex justify-end w-full">
        <Button
          variant="primary"
          size="large"
          onClick={handleNext}
          disabled={(!title.trim() && lessonType !== "test") || !lessonType}
          className="w-min"
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
