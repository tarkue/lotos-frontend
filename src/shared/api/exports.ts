// DTO exports
export type {
  AddEditorRequestDTO,
  CourseApplicationDetailResponseDTO,
  CourseApplicationResponseDTO,
  CourseCreateRequestDTO,
  CourseProgressOverviewResponseDTO,
  CourseResponseDTO,
  CourseUpdateRequestDTO,
  CourseWithModulesResponseDTO,
  EditorListResponse,
  EditorResponseDTO,
  EnrolledStudentsListResponse,
  FileResponseDTO,
  HomeworkCreateRequestDTO,
  HomeworkResponseDTO,
  HomeworkReviewRequestDTO,
  HomeworkSubmissionResponseDTO,
  HomeworkStudentItemResponseDTO,
  MaterialCreateRequestDTO,
  MaterialFileResponseDTO,
  MaterialFileInfoDTO,
  MaterialResponseDTO,
  MaterialUpdateRequestDTO,
  ModuleCreateRequestDTO,
  ModuleResponseDTO,
  ModuleUpdateRequestDTO,
  ModuleWithMaterialsResponseDTO,
  TestsListResponseDTO,
  TestSummaryResponseDTO,
} from "./dto/teacher.dto";

export type {
  CommentReactionRequestDTO,
  CommentReactionSummaryResponseDTO,
  CommentResponseDTO,
  CreateCommentRequestDTO,
  PaginatedCommentsResponseDTO,
} from "./dto/common.dto";

export type {
  CourseCardResponseDTO,
  CourseProgressResponseDTO,
  EnrolledCourseDetailResponseDTO,
  EnrolledCourseResponseDTO,
  LessonProgressResponseDTO,
  MaterialDetailForStudentDTO,
  MaterialProgressInfoDTO,
  MyCoursesResponseDTO,
  MyTestAttemptSummaryDTO,
  PaginatedCoursesResponseDTO,
  QuestionAttemptResponseDTO,
  QuestionAnswerBatchDTO,
  QuestionResultDTO,
  StudentProgressRowDTO,
  SubmitAnswerRequestDTO,
  SubmitTestRequestDTO,
  TestAttemptResponseDTO,
  TestAttemptWithBlockResponseDTO,
  TestAttemptWithFeedbackResponseDTO,
  TestBriefInfoDTO,
  TestForStudentDTO,
  TestOptionForStudentDTO,
  TestQuestionForStudentDTO,
  TestResultResponseDTO,
} from "./dto/student.dto";

export type { GenerateTestRequestDTO } from "./dto/ai.dto";

export type {
  AnswerOptionCreateDTO,
  AnswerOptionResponseDTO,
  AnswerOptionUpdateDTO,
  QuestionCreateRequestDTO,
  QuestionResponseDTO,
  QuestionUpdateRequestDTO,
  TestCreateRequestDTO,
  TestResponseDTO,
  TestUpdateRequestDTO,
  TestWithQuestionsResponseDTO,
} from "./dto/test.dto";

export type {
  HTTPValidationError,
  PaginationParams,
  ValidationError,
} from "./dto/common.dto";

// Enum exports
export { MaterialType } from "./enum/material-type.enum";
export { ApplicationStatus } from "./enum/application-status.enum";
export { RoleType } from "./enum/role-type.enum";
export { QuestionType } from "./enum/question-type.enum";
export { HomeworkSubmissionFormat } from "./enum/homework-submission-format.enum";
export { HomeworkReviewResult } from "./enum/homework-review-result.enum";

// Client exports
export { AdminClient } from "./controllers/admin.controller";
export { AIClient } from "./controllers/ai.controller";
export { AuthClient } from "./controllers/auth.controller";
export { CourseClient } from "./controllers/course.controller";
export { StudentClient } from "./controllers/student.controller";
export { TeacherClient } from "./controllers/teacher.controller";
export { TestClient } from "./controllers/test.controller";
export { UsersClient } from "./controllers/user.controller";

// Main API export
export { ApiClient, api } from "./index";
