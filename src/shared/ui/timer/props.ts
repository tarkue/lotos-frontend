import React from "react";

export interface Time {
  hours?: number;
  minutes: number;
  seconds: number;
}

export interface TimerProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "chidlren"> {
  time: Time;
}
