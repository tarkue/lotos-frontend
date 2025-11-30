import { div } from "../../libs/time";
import { cn } from "../../libs/utils";
import { Typography } from "../typography";
import { AnimatedSlot } from "./animated-slot";

export const TimeSlot = ({
  value = 0,
  className,
  withColon,
}: {
  value: number;
  className?: string;
  withColon?: boolean;
}) => {
  return (
    <div className={cn("flex overflow-hidden h-[22px]", className)}>
      {withColon && (
        <Typography.Subtitle component="span" className="leading-[19px]!">
          :
        </Typography.Subtitle>
      )}
      <AnimatedSlot value={div(value, 10)}></AnimatedSlot>
      <AnimatedSlot value={value % 10}></AnimatedSlot>
    </div>
  );
};
