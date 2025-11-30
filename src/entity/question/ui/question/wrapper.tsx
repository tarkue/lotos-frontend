import { Typography } from "@/src/shared/ui/typography";
import React from "react";

export const QuestionWrapper = ({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) => (
  <div className="w-full flex flex-col gap-4">
    <Typography.Body className="w-full select-none">
      <strong>{title}</strong>
    </Typography.Body>
    {children}
  </div>
);
