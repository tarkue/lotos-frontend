"use client";
import { cn } from "@/src/shared/libs/utils";
import { TabGroupProps } from "./props";

export const TabGroup = ({
  className,
  children,
  onChange,
  ...props
}: TabGroupProps) => {
  const handleTabChange = (value: string) => {
    onChange?.(value);
  };

  return (
    <ul
      className={cn("flex w-auto gap-0 first:rounded-l-2xl", className)}
      {...props}
    >
      {children.map((child, index) => (
        <child.type
          {...child.props}
          key={index}
          onClick={() => handleTabChange(child.props.children)}
        />
      ))}
    </ul>
  );
};
