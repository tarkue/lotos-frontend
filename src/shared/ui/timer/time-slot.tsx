import { div } from "../../libs/time";
import { cn } from "../../libs/utils";
import { AnimatedSlot } from "./animated-slot";

export const TimeSlot = ({
  value = 0,
  className,
}: {
  value: number;
  className?: string;
}) => {
  return (
    <div className={cn("flex overflow-hidden h-[22px]", className)}>
      <AnimatedSlot value={div(value, 10)}></AnimatedSlot>
      <AnimatedSlot value={value % 10}></AnimatedSlot>
    </div>
  );
};
