"use client";
import { TestProps } from "@/src/entity/test";
import { CountDownTimer } from "@/src/features/countdown-timer";
import { secondsToTime } from "@/src/shared/libs/time";
import { Typography } from "@/src/shared/ui/typography";

export const TestHeader = ({
  test,
  startedAt,
  isSubmitted = false,
}: TestProps & { startedAt: string; isSubmitted?: boolean }) => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <Typography.Title className="min-w-0 flex-1 [overflow-wrap:anywhere]">{test.title}</Typography.Title>
      {test.time_limit_seconds && (
        <CountDownTimer
          startedAt={startedAt}
          initialTime={secondsToTime(test.time_limit_seconds)}
          isSubmitted={isSubmitted}
        />
      )}
    </div>
  );
};
