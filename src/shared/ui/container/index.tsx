import { ReactNode } from "react";
import { cn } from "../../libs/utils";

export const Container = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full max-w-[980px] m-0 mx-auto", className)}>
      {children}
    </div>
  );
};
