"use client";
import { Material } from "@/src/entity/material";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { secondsToTime } from "@/src/shared/libs/time";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { useRouter } from "next/navigation";

export const useStartTestSubmit = (material: Material) => {
  const router = useRouter();
  const { clear, addModal } = useModals();
  const test = material.tests?.[0];
  const lessonModule = material.module;

  if (!test || !lessonModule) return;

  const link = formatEndpoint(Endpoint.TEST, [
    lessonModule.course_id,
    lessonModule.id,
    material.id,
    test.id,
  ]);

  const startTest = () => {
    clear();
    router.push(link);
  };

  if (!test.time_limit_seconds) return startTest;

  const { hours, minutes, seconds } = secondsToTime(test.time_limit_seconds);
  const duration = [
    hours ? `${hours} ч` : null,
    minutes ? `${minutes} мин` : null,
    seconds ? `${seconds} с` : null,
  ].filter(Boolean).join(" ");

  return () => {
    clear();
    addModal({
      title: "Начать тест",
      description: `На тест отведено ${duration}. Таймер запустится после начала теста.`,
      buttons: (
        <Button type="button" variant="primary" onClick={startTest}>
          Начать тест
        </Button>
      ),
    });
  };
};
