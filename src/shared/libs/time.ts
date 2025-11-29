import { Time } from "../ui/timer/props";

export const div = (a: number, b: number) => (a - (a % b)) / b;

export const secondsToTime = (seconds: number): Time => {
  if (seconds < 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    hours: (seconds / 3600) | 0,
    minutes: ((seconds % 3600) / 60) | 0,
    seconds: seconds % 60 | 0,
  };
};
