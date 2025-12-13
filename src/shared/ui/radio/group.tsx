"use client";
import { cn } from "@/src/shared/libs/utils";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
};
