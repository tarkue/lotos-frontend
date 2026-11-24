"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "../../libs/utils";

export const Sidebar = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const [isExpanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <aside
      className={cn(
        "relative w-full border-b border-base-border bg-white md:h-[calc(100dvh-var(--header-height))] md:w-[333px] md:shrink-0 md:border-0",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        aria-controls={contentId}
        aria-expanded={isExpanded}
        className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2 text-left font-roboto font-medium text-dark-gray md:hidden"
        onClick={() => setExpanded(!isExpanded)}
      >
        Разделы и действия
        <ChevronDown
          size={18}
          className={cn("shrink-0", isExpanded && "rotate-180")}
          aria-hidden
        />
      </button>
      <div
        id={contentId}
        className={cn(
          "min-w-0 flex-col gap-4 px-4 pb-4 [overflow-wrap:anywhere] md:fixed md:top-(--header-height) md:flex md:h-[calc(100dvh-var(--header-height))] md:w-[333px] md:overflow-y-auto md:border-r md:border-r-base-border md:bg-white md:py-5",
          isExpanded ? "flex" : "hidden",
        )}
      >
        {children}
      </div>
    </aside>
  );
};
