"use client";
import { Time } from "@/src/shared/ui/timer/props";
import { Timer } from "@/src/shared/ui/timer/timer";
import { useEffect, useRef, useState } from "react";

interface CountDownTimerProps {
  startedAt: string;
  initialTime?: Time; // Начальное время таймера
}

export const CountDownTimer = ({
  startedAt,
  initialTime = { hours: 1, minutes: 1, seconds: 1 },
}: CountDownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<Time>(initialTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetTimeRef = useRef<number>(0);

  useEffect(() => {
    // Вычисляем время окончания на основе startedAt и initialTime
    // Парсим startedAt явно, чтобы избежать проблем с таймзоной
    const start_date = new Date(startedAt);
    // Если startedAt в формате "YYYY-MM-DD", явно сбрасываем время в 00:00:00
    // чтобы избежать влияния таймзоны сервера
    if (startedAt.length === 10) {
      start_date.setHours(0, 0, 0, 0);
    }
    const startTime = start_date.getTime();
    const totalMilliseconds =
      (initialTime.hours ? initialTime.hours * 60 * 60 * 1000 : 0) +
      (initialTime.minutes ? initialTime.minutes * 60 * 1000 : 0) +
      initialTime.seconds * 1000;

    targetTimeRef.current = startTime + totalMilliseconds;

    const updateTimer = () => {
      const now = Date.now();
      const difference = targetTimeRef.current - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    // Первоначальное обновление
    updateTimer();

    // Запускаем интервал
    intervalRef.current = setInterval(updateTimer, 1000);

    // Очистка при размонтировании
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startedAt, initialTime]);

  // Visibility API для корректной работы при сворачивании
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const now = Date.now();
        const difference = targetTimeRef.current - now;

        if (difference <= 0) {
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <Timer time={timeLeft} />;
};
