"use client";
import { Button } from "@/src/shared/ui/button";
import { MaterialActionProps } from "../models/material-action";

export const StartTest = ({ material }: MaterialActionProps) => {
  console.log(material);
  const handle = () => {
    if (material.completed_at) {
    }
  };
  return (
    <Button
      onClick={handle}
      variant="primary"
      size="large"
      className="h-max group font-semibold lower"
      disabled={!!material.completed_at}
    >
      Начать тест
    </Button>
  );
};
