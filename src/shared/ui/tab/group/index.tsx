/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/src/shared/libs/utils";
import { useMemo, useState } from "react";
import { TabGroupProps } from "./props";
import { validateChildrenOrThrow } from "./utils/validate-children";
import { TabGroupVariant } from "./variant";

// Добавляем дженерик к компоненту
export const TabGroup = ({
  size = "small",
  className,
  defaultValue,
  children,
  onChange,
  ...props
}: TabGroupProps) => {
  useMemo(
    () => validateChildrenOrThrow(children, size),
    [children.length, size]
  );

  const [activeTab, setActiveTab] = useState<string | undefined>(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <ul className={cn(TabGroupVariant({ size, className }))} {...props}>
      {children.map((child, index) => (
        <child.type
          {...child.props}
          isActive={child.props.children === activeTab}
          key={index}
          onClick={() => handleTabChange(child.props.children)}
        />
      ))}
    </ul>
  );
};
