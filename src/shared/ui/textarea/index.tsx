"use client";
import { forwardRef, useRef } from "react";
import { cn } from "../../libs/utils";
import { TextAreaProps } from "./props";
import { TextAreaVariant } from "./variant";

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ className, size, isValid, leftIcon, rightIcon, ...props }, elementRef) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    return (
      <div
        className={cn(
          TextAreaVariant({ size }),
          isValid === false && "border-error hover:border-none",
          className,
        )}
        onClick={() => ref.current?.focus()}
        ref={elementRef}
      >
        {leftIcon}
        <textarea
          ref={ref}
          rows={2}
          className="font-roboto text-black placeholder-light-gray font-medium w-full outline-0 resize-none"
          {...props}
        />
        {rightIcon}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
