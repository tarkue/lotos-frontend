"use client";
import { cn } from "@/src/shared/libs/utils";
import { Typography } from "../../typography";
import { useModal } from "../context/hooks";
import { DefaultFormModalProps } from "../models/form-modal-props";
import { CloseModal } from "./close";

export const DefaultFormModal = ({
  id,
  title,
  description,
  className,
  fields,
  buttons,
}: DefaultFormModalProps) => {
  const { close } = useModal(id);

  return (
    <div
      className={cn("flex min-w-0 flex-col gap-3 p-4 sm:p-5 bg-white rounded-3xl", className)}
    >
      <div className="flex w-full items-start gap-2">
        {title && (
          <Typography.Subtitle className="min-w-0 flex-1 [overflow-wrap:anywhere]">{title}</Typography.Subtitle>
        )}
        <CloseModal close={close} />
      </div>
      {description && (
        <Typography.Body className="w-full text-base-500">
          {description}
        </Typography.Body>
      )}
      {fields}
      {buttons && (
        <div className="flex w-full flex-wrap items-center gap-3 sm:gap-6">{buttons}</div>
      )}
    </div>
  );
};
