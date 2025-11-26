"use client";
import { forwardRef, useRef } from "react";
import { cn } from "../../libs/utils";
import { InputProps } from "./props";
import { InputVariant } from "./variant";

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    { className, size, type, isValid, leftIcon, rightIcon, ...props },
    elementRef
  ) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div
        className={cn(
          InputVariant({ size }),
          isValid === false && "border-error hover:border-base-200",
          className
        )}
        onClick={() => ref.current?.focus()}
        ref={elementRef}
      >
        {leftIcon}
        <input
          type={type}
          ref={ref}
          className="font-nunito text-black placeholder-base-300 font-medium w-full outline-0"
          {...props}
        />
        {rightIcon}
      </div>
    );
  }
);
Input.displayName = "Input";
