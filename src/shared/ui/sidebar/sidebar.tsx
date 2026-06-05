import { forwardRef } from "react";
import { cn } from "../../libs/utils";

export const Sidebar = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <aside className={cn("hidden md:block", className)} {...props} ref={ref}>
      <div className="flex flex-col bg-white border-r gap-4 px-4 py-5 h-[calc(100dvh-var(--header-height))] border-r-base-border w-[333px] fixed top-(--header-height) left-0">
        {children}
      </div>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";
