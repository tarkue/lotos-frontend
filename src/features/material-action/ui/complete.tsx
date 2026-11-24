"use client";
import { api } from "@/src/shared/api";
import { cn } from "@/src/shared/libs/utils";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MaterialActionProps } from "../models/material-action";

export const MaterialComplete = ({ material, courseId }: MaterialActionProps) => {
  const [isCompleted, setIsCompleted] = useState(!!material.is_completed);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handle = async () => {
    if (!material.module || isSaving) return;

    setIsSaving(true);
    try {
      await api.student.completeMaterial(
        Number.parseInt(courseId),
        material.module.id,
        material.id,
      );
      setIsCompleted(true);
      router.refresh();
    } catch {
      toast({
        title: "Не удалось отметить урок изученным",
        description: "Попробуйте ещё раз.",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handle}
      variant={isCompleted ? "ghost" : "primary"}
      className={cn(
        "mt-4 min-h-11 w-full sm:w-fit",
        isCompleted && "disabled:cursor-default! disabled:bg-status-success disabled:text-green",
      )}
      disabled={isCompleted || isSaving}
    >
      Изучено
      {isCompleted && <Icon size="20" glyph="done" color="green" />}
    </Button>
  );
};
