import { forwardRef } from "react";
import { cn } from "../../libs/utils";
import { TimerProps } from "./props";
import { TimeSlot } from "./time-slot";

export const Timer = forwardRef<HTMLDivElement, TimerProps>(
  ({ className, time, ...props }, ref) => {
    return (
      <div className={cn("flex", className)} ref={ref} {...props}>
        {time.hours !== undefined && (
          <>
            <div
              className={cn(
                "flex transition-all duration-200 ease-out",
                time.hours === 0 && "origin-right scale-0 width-0"
              )}
            >
              <TimeSlot value={time.hours ? time.hours : 0} />:
            </div>
          </>
        )}
        <TimeSlot value={time.minutes ? time.minutes : 0} />
        {":"}
        <TimeSlot value={time.seconds} />
      </div>
    );
  }
);
Timer.displayName = "Timer";
