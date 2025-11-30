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
      className={cn(
        "flex flex-col gap-3 p-5 bg-white max-w-[448px] rounded-3xl",
        className
      )}
    >
      <div className="flex w-full items-center">
        {title && (
          <Typography.Subtitle className="w-full">{title}</Typography.Subtitle>
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
        <div className="flex w-full items-center gap-6">{buttons}</div>
      )}
    </div>
  );
};
