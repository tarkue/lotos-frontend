import { forwardRef } from "react";
import { cn } from "../../libs/utils";

export const Sidebar = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  return (
    <aside
      className={cn(
        "min-w-[333px] w-[333px] h-[calc(100dvh-var(--header-height))] block relative",
        className,
      )}
      {...props}
      ref={ref}
    >
      <div className="flex flex-col bg-white border-r gap-4 px-4 py-5 h-[calc(100dvh-var(--header-height))] border-r-base-border w-[333px] fixed top-(--header-height)">
        {children}
      </div>
    </aside>
  );
});
Sidebar.displayName = "Sidebar";
