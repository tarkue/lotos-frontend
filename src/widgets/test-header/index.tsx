"use client";
import { TestProps } from "@/src/entity/test";
import { CountDownTimer } from "@/src/features/countdown-timer";
import { secondsToTime } from "@/src/shared/libs/time";
import { Typography } from "@/src/shared/ui/typography";

export const TestHeader = ({
  test,
  startedAt,
}: TestProps & { startedAt: string }) => {
  return (
    <div className="flex w-full justify-between items-center">
      <Typography.Title className="w-full">{test.title}</Typography.Title>
      {test.time_limit_seconds && (
        <CountDownTimer
          startedAt={startedAt}
          initialTime={secondsToTime(test.time_limit_seconds)}
        />
      )}
    </div>
  );
};
