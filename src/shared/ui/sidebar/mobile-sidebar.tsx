"use client";
import { forwardRef } from "react";
import { cn } from "../../libs/utils";
import { useSidebar } from "./provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const MobileSidebar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { setOpened, opened, content } = useSidebar();
  const pathname = usePathname();
  const isOpen = opened ?? false;

  // Закрываем сайдбар при изменении пути
  useEffect(() => {
    if (setOpened) {
      setOpened(false);
    }
  }, [pathname, setOpened]);

  // Блокируем прокрутку фона при открытом меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && setOpened) {
      setOpened(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn("fixed inset-0 z-50 flex md:hidden", className)}
      onClick={handleBackdropClick}
      ref={ref}
      {...props}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar panel */}
      <aside
        className={`relative w-[280px] max-w-[85vw] h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 overflow-y-auto">{content}</div>
      </aside>
    </div>
  );
});
MobileSidebar.displayName = "MobileSidebar";
