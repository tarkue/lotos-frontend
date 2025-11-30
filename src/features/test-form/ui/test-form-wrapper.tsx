"use client";
import { TestProps } from "@/src/entity/test";
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
    attemptId
  );

  return (
    <form
      className="flex flex-col gap-6 w-full pb-8"
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await submit(new FormData(e.currentTarget));
      }}
    >
      {children}
      <CompleteTestButton />
    </form>
  );
};
