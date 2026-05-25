"use client";
import { cn } from "@/src/shared/libs/utils";
import { useModal } from "../context/hooks";

export const ModalContainer = ({
  children,
  maxWidth,
  id,
}: {
  children: React.ReactNode;
  id: number;
  maxWidth?: `${number}px`;
}) => {
  const { close } = useModal(id);

  return (
    <div className="flex justify-center items-center fixed scroll-auto  z-30 snap-y overflow-y-auto overflow-x-hidden top-0 left-0 backdrop-filter backdrop-blur-xs bg-modal w-dvw h-dvh">
      <dialog
        role="dialog"
        aria-modal="true"
        open={true}
        style={{ maxWidth }}
        className={cn(
          "flex justify-center items-center sticky z-30 bg-transparent top-0 rounded-3xl m-auto px-4 md:px-0",
          maxWidth && `w-full`,
        )}
      >
        <div className="flex justify-center relative w-full">{children}</div>
      </dialog>
      <div
        className="absolute z-20 top-0 left-0 w-full h-full"
        onClick={close}
      ></div>
    </div>
  );
};
