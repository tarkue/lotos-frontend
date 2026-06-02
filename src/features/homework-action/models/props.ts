import {
  FileResponseDTO,
  HomeworkSubmissionFormat,
} from "@/src/shared/api/exports";

export interface HomeworkSendProps {
  courseId: number;
  moduleId: number;
  materialId: number;
  assignmentId?: number;
  onSuccess?: () => void;
}

export interface HomeworkFileManagerProps {
  courseId: number;
  moduleId: number;
  materialId: number;
  assignmentId?: number;
  existingFiles?: FileResponseDTO[];
  allowedFormats?: HomeworkSubmissionFormat[];
  onFilesChange?: (files: FileResponseDTO[]) => void;
  disabled?: boolean;
}
