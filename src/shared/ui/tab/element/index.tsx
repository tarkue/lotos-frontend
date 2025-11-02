"use client";
import { forwardRef } from "react";
import { TabElementProps } from "./props";
import { TabElementVariant } from "./variant";

export const TabElement = forwardRef<HTMLLIElement, TabElementProps>(
  ({ isActive, size = "small", className, children, ...props }, ref) => {
    return (
      <li
        className={TabElementVariant({ isActive, size, className })}
        {...props}
        ref={ref}
      >
        {children}
      </li>
    );
  }
);
TabElement.displayName = "TabElement";
