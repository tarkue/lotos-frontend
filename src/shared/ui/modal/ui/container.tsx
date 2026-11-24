"use client";
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
    <div className="fixed inset-0 z-30 overflow-y-auto overscroll-contain bg-modal backdrop-blur-xs">
      <div
        className="flex min-h-full items-start justify-center p-3 sm:p-4"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <dialog
          aria-modal="true"
          open
          style={{ maxWidth }}
          className="relative m-auto w-full max-w-max rounded-3xl bg-transparent"
        >
          <div className="flex w-full min-w-0 justify-center [&>*]:max-w-full">
            {children}
          </div>
        </dialog>
      </div>
    </div>
  );
};
