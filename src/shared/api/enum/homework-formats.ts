import { HomeworkSubmissionFormat } from "./homework-submission-format.enum";

export const FORMAT_TO_EXTENSIONS: Record<HomeworkSubmissionFormat, readonly string[]> = {
  [HomeworkSubmissionFormat.FILES]: [".pdf", ".doc", ".docx", ".txt", ".zip", ".rar"] as const,
  [HomeworkSubmissionFormat.TEXT]: [] as const,
  [HomeworkSubmissionFormat.VIDEO]: [".mp4", ".mov", ".avi", ".mkv", ".webm"] as const,
  [HomeworkSubmissionFormat.PHOTO]: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"] as const,
} as const;

export const FORMAT_ACCEPT_STRING: Record<HomeworkSubmissionFormat, string> = {
  [HomeworkSubmissionFormat.FILES]: ".pdf,.doc,.docx,.txt,.zip,.rar",
  [HomeworkSubmissionFormat.TEXT]: "",
  [HomeworkSubmissionFormat.VIDEO]: ".mp4,.mov,.avi,.mkv,.webm",
  [HomeworkSubmissionFormat.PHOTO]: ".jpg,.jpeg,.png,.gif,.bmp,.webp",
} as const;

export function getAcceptForFormats(formats: HomeworkSubmissionFormat[]): string {
  const acceptList = formats
    .map((format) => FORMAT_ACCEPT_STRING[format])
    .filter((accept) => accept.length > 0);
  return acceptList.join(",");
}

export function getExtensionsForFormats(formats: HomeworkSubmissionFormat[]): string[] {
  const extensions = formats
    .map((format) => FORMAT_TO_EXTENSIONS[format])
    .flat();
  return extensions as string[];
}
