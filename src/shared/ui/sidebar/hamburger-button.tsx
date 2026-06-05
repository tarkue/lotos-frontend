"use client";
import { cn } from "@/src/shared/libs/utils";
import { useSidebar } from "./provider";

interface HamburgerButtonProps {
  className?: string;
}

export const HamburgerButton = ({ className }: HamburgerButtonProps) => {
  const { setOpened, opened } = useSidebar();

  const handleClick = () => {
    if (setOpened && opened !== undefined) {
      setOpened(!opened);
    }
  };

  const isOpen = opened ?? false;

  return (
    <button
      className={cn(
        "flex flex-col justify-between w-7 h-6 md:hidden",
        "focus:outline-none focus:ring-2 focus:ring-primary rounded-lg",
        "p-1.5 -ml-1",
        "transition-colors hover:bg-base-raised rounded-lg",
        className,
      )}
      onClick={handleClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      aria-expanded={isOpen}
    >
      <span
        className={cn(
          "w-full h-[2px] bg-black transition-all duration-300 ease-in-out",
          isOpen && "rotate-45 translate-y-[5px] bg-primary",
        )}
      />
      <span
        className={cn(
          "w-full h-[2px] bg-black transition-all duration-300 ease-in-out",
          isOpen && "opacity-0 translate-x-2",
        )}
      />
      <span
        className={cn(
          "w-full h-[2px] bg-black transition-all duration-300 ease-in-out",
          isOpen && "-rotate-45 -translate-y-[5px] bg-primary",
        )}
      />
    </button>
  );
};
