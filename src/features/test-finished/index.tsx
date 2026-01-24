"use client";

import { Loader } from "@/src/shared/ui/loader";
import { toast } from "@/src/shared/ui/toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export const TestFinished = ({
  score,
  finished_at,
}: {
  score: number | null;
  finished_at: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const blockedUntilTime = useMemo(() => {
    const blockedUntilDate = new Date(finished_at);
    const nowDate = new Date();
    blockedUntilDate.setSeconds(
      new Date(finished_at).getSeconds() + 300 - nowDate.getSeconds()
    );
    blockedUntilDate.setSeconds(
      blockedUntilDate.getSeconds() + -blockedUntilDate.getTimezoneOffset() * 60
    );
    return blockedUntilDate.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [finished_at]);

  useEffect(() => {
    if (pathname && blockedUntilTime) {
      toast({
        title: `Тест будет доступен вам в ${blockedUntilTime}`,
        description: `Результат за прошлое прохождение в баллах: ${
          score === null ? "неизвестен" : score
        }.`,
        variant: "neuro",
      });
      router.push(pathname?.slice(0, pathname.length - 2));
    }
  }, [pathname, router, score, blockedUntilTime]);

  return <Loader />;
};
