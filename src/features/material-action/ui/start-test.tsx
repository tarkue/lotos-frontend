"use client";
import { Button } from "@/src/shared/ui/button";
import { useStartTestSubmit } from "../hooks/start-test-submit";
import { MaterialActionProps } from "../models/material-action";

export const StartTest = ({ material }: MaterialActionProps) => {
  const submit = useStartTestSubmit(material);

  return (
    <Button
      onClick={submit}
      variant="primary"
      size="large"
      className="h-max group font-semibold lower"
      disabled={!!material.completed_at}
    >
      Начать тест
    </Button>
  );
};
