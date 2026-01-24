"use client";
import { TestProps } from "@/src/entity/test";
import { useState } from "react";
import { useSubmitTestComplete } from "../hooks/submit-handle";
import { CompleteTestButton } from "./complete";

export const TestFormWrapper = ({
  test,
  courseId,
  moduleId,
  materialId,
  attemptId,
  children,
}: TestProps & {
  courseId: number;
  moduleId: number;
  attemptId: number;
  materialId: number;
  children?: React.ReactNode;
}) => {
  const submit = useSubmitTestComplete(
    test,
    courseId,
    moduleId,
    materialId,
    attemptId,
  );
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-6 w-full pb-8"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        await submit(new FormData(e.currentTarget));
        setLoading(false);
      }}
    >
      {children}

      <CompleteTestButton disable={loading} />
    </form>
  );
};
