import { Typography } from "@/src/shared/ui/typography";
import React from "react";

export const QuestionBody = ({
  children,
  title,
}: {
  title?: string;
  children?: React.ReactNode;
}) => (
  <div className="w-full flex flex-col gap-3">
    <Typography.Body bold className="w-full select-none">
      {title}
    </Typography.Body>
    {children}
  </div>
);
