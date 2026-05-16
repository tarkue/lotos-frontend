import { ReactNode } from "react";
import { cn } from "../../libs/utils";

export const Container = ({
  children,
  className,
  variant = "large",
  component = "div",
}: {
  children?: ReactNode;
  className?: string;
  variant?: "small" | "large";
  component?: "div" | "main" | "section" | "aside";
}) => {
  const Comp = component;
  return (
    <Comp
      className={cn(
        "flex w-full m-0 mx-auto px-2.5 md:px-0",
        variant === "large" && "max-w-[1100px]",
        variant === "small" && "max-w-[900px]",
        className,
      )}
    >
      {children}
    </Comp>
  );
};
