"use client";

import { cn } from "@/src/shared/libs/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { labelVariants } from "./variants";

const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { required?: boolean }
>(({ className, required, ...props }, ref) => {
  if (required)
    props.children = (
      <>
        {props.children} <span className="text-red">*</span>
      </>
    );
  return (
    <div className={cn(labelVariants({ required, className }))}>
      <LabelPrimitive.Root ref={ref} {...props} />
    </div>
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
