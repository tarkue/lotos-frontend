import { cn } from "../../libs/utils";

export const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div className="flex w-full h-2.5 rounded-[19px] bg-base-200">
      <div
        className={cn(`h-2.5 rounded-[19px] bg-primary-200`)}
        style={{ width: `${percent % 100}%` }}
      ></div>
    </div>
  );
};
