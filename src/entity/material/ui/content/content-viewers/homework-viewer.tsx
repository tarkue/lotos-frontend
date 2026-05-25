import { MarkdownContent } from "@/src/shared/ui/markdown-content";
import { HomeworkStudentItemResponseDTO } from "@/src/shared/api/exports";
import { HomeworkHeader } from "../homework-header";

export const MaterialHomeWorkViewer = ({
  homework,
}: {
  homework: HomeworkStudentItemResponseDTO;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <HomeworkHeader homework={homework} />
      <MarkdownContent content={homework.description} />
    </div>
  );
};
