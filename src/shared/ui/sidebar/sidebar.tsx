import { forwardRef } from "react";
import { cn } from "../../libs/utils";

export const Sidebar = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <aside
      className={cn(
        "w-full max-w-[333px] flex flex-col px-4 py-5 gap-4 h-[calc(100dvh-var(--header-width))] bg-white border-r border-r-base-border",
        className,
      )}
      {...props}
      ref={ref}
    ></aside>
  );
});
Sidebar.displayName = "Sidebar";
