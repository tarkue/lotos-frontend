"use client";
import { Material } from "@/src/entity/material";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { secondsToTime } from "@/src/shared/libs/time";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { useModals } from "@/src/shared/ui/modal";
import { useRouter } from "next/navigation";

const StartTestButton = ({ material }: { material: Material }) => {
  const router = useRouter();

  const handle = () => {
    if (material.tests !== undefined && material.tests.length > 0) {
      const link = formatEndpoint(Endpoint.TEST, [
        material.module?.course_id,
        material.module?.id,
        material.id,
        material.tests[0].id,
      ]);
      router.push(link);
    }
  };

  return (
    <>
      <Button variant="primary" size="large" onClick={handle}>
        Начать тест
      </Button>
    </>
  );
};

export const useStartTestSubmit = (material: Material) => {
  const { clear, addModal } = useModals();
  if (!material.tests || !material.tests[0].time_limit_seconds) {
    return () => {};
  }

  const time = secondsToTime(material.tests[0].time_limit_seconds);

  return () => {
    clear();
    addModal({
      title: "Начать тест",
      description: `После нажатия кнопки ниже вас перенаправит на страницу с тестом и запуститься таймер, тест идет ${
        time.hours && time.hours > 0 ? time.hours + " час" : ""
      }${time.minutes > 0 ? time.minutes + " минут" : ""}`,
      buttons: <StartTestButton material={material} />,
    });
  };
};
