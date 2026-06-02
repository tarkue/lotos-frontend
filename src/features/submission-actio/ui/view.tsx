"use client";
import { HomeworkSubmissionResponseDTO } from "@/src/shared/api/exports";
import { Button } from "@/src/shared/ui/button";
import { Icon } from "@/src/shared/ui/icon";
import { useModals } from "@/src/shared/ui/modal";
import { Typography } from "@/src/shared/ui/typography";
import { FileResponseDTO } from "@/src/shared/api/dto/teacher.dto";

const SubmissionFilesList: React.FC<{ files: FileResponseDTO[] }> = ({
  files,
}) => {
  const handleDownload = (file: FileResponseDTO) => {
    const link = document.createElement("a");
    link.href = file.file_url;
    link.download = file.original_filename;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Б";
    const k = 1024;
    const sizes = ["Б", "КБ", "МБ", "ГБ"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!files || files.length === 0) {
    return (
      <Typography.Body className="text-light-gray text-center py-4">
        Файлы не прикреплены
      </Typography.Body>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Icon glyph="file" size="20" color="dark-gray" />
            <div className="flex flex-col">
              <Typography.Body className="text-dark-gray">
                {file.original_filename}
              </Typography.Body>
              <Typography.Caption className="text-light-gray">
                {formatFileSize(file.file_size)}
              </Typography.Caption>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleDownload(file)}
            className="flex items-center gap-2"
            type="button"
          >
            <Icon glyph="download" size="20" color="dark-gray" />
            <Typography.Body>Скачать</Typography.Body>
          </Button>
        </div>
      ))}
    </div>
  );
};

const ViewSubmissionContent: React.FC<{
  submission: HomeworkSubmissionResponseDTO;
}> = ({ submission }) => {
  const { clear } = useModals();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Typography.Subtitle className="text-dark-gray">
            {submission.full_name || "Ученик"}
          </Typography.Subtitle>
          <Typography.Caption className="text-light-gray">
            {new Date(submission.submitted_at).toLocaleDateString("ru-RU")}
          </Typography.Caption>
        </div>
        {submission.group_name && (
          <Typography.Body className="text-light-gray">
            Группа: {submission.group_name}
          </Typography.Body>
        )}
      </div>

      {submission.text_answer && (
        <div className="flex flex-col gap-2">
          <Typography.Subtitle className="text-dark-gray">
            Текстовый ответ
          </Typography.Subtitle>
          <div className="p-3 bg-gray-50 rounded-lg">
            <Typography.Body className="text-dark-gray whitespace-pre-wrap">
              {submission.text_answer}
            </Typography.Body>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Typography.Subtitle className="text-dark-gray">
          Файлы
        </Typography.Subtitle>
        <SubmissionFilesList files={submission.files} />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={clear} type="button">
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export const ViewSubmission: React.FC<{
  submission: HomeworkSubmissionResponseDTO;
}> = ({ submission }) => {
  const { addModal } = useModals();

  const handleOpen = () => {
    addModal({
      title: "Просмотр работы",
      maxWidth: "600px",
      description: `Работа от ${new Date(submission.submitted_at).toLocaleDateString("ru-RU")}`,
      fields: <ViewSubmissionContent submission={submission} />,
    });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleOpen}
      size="small"
      className="w-full"
    >
      <Icon glyph="download" size="20" color="black" />
    </Button>
  );
};
