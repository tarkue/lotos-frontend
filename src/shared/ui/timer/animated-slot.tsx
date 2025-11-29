"use client";
import { useMemo } from "react";
import { Slot } from "./slot";

export const AnimatedSlot = ({ value }: { value: number }) => {
  const translateY = useMemo(() => {
    return -22 * value;
  }, [value]);

  return (
    <div className="overflow-hidden h-[22px]">
      <div
        className="transition-transform duration-250 ease-out"
        style={{ transform: `translate(0, ${translateY}px)` }}
      >
        <Slot />
      </div>
    </div>
  );
};
