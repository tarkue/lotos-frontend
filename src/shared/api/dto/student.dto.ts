import { ApplicationStatus } from "../enum/application-status.enum";
import { MaterialType } from "../enum/material-type.enum";
import { QuestionType } from "../enum/question-type.enum";
import { UserResponseDTO } from "./auth.dto";
import { MaterialFileInfoDTO, ModuleResponseDTO } from "./teacher.dto";

export interface CourseCardResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  created_at: string;
  creator?: UserResponseDTO | null;
  is_enrolled?: boolean;
  application_status?: ApplicationStatus | null;
  modules?: ModuleWithMaterialsResponse[];
}

export interface PaginatedCoursesResponseDTO {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  courses: CourseCardResponseDTO[];
}

export interface EnrolledCourseResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  progress?: CourseProgressResponseDTO | null;
}

export interface EnrolledCourseDetailResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  creator?: UserResponseDTO | null;
  is_enrolled?: boolean;
  created_at: string;
  overall_progress: number;
  completed_materials: number;
  total_materials: number;
  modules: ModuleWithMaterialsResponse[];
}

export interface CourseProgressResponseDTO {
  id: number;
  course_id: number;
  user_id: number;
  completed_items: number;
  total_items: number;
  progress_percentage: number;
  last_accessed_at: string;
}

export interface ModuleWithMaterialsResponse {
  id: number;
  title: string;
  position: number;
  course_id: number;
  materials?: MaterialProgressInfoDTO[] | null;
  completed_materials: number;
  total_materials: number;
  progress_percentage: number;
}

export interface MaterialProgressInfoDTO {
  id: number;
  material_id: number;
  module_id: number;
  title: string;
  type: string;
  position: number;
  is_completed: boolean;
  completed_at?: string | null;
  is_locked?: boolean;
  lock_reason?: string | null;
  has_tests?: boolean;
}

export interface MaterialDetailForStudentDTO {
  id: number;
  module: ModuleResponseDTO;
  type: MaterialType;
  title: string;
  content_url?: string | null;
  text_content?: string | null;
  transcript?: string | null;
  position: number;
  files: MaterialFileInfoDTO[];
  has_tests: boolean;
  tests: TestBriefInfoDTO[];
  is_completed: boolean;
  completed_at?: string | null;
}

export interface TestBriefInfoDTO {
  id: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
}

export interface TestForStudentDTO {
  id: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
  questions: TestQuestionForStudentDTO[];
}

export interface TestQuestionForStudentDTO {
  id: number;
  text: string;
  type: QuestionType;
  position: number;
  hint_text?: string | null;
  options: TestOptionForStudentDTO[];
}

export interface TestOptionForStudentDTO {
  id: number;
  content: string;
}

export interface TestAttemptResponseDTO {
  id: number;
  test_id: number;
  user_id: number;
  score?: number | null;
  passed?: boolean | null;
  attempt_number: number;
  started_at: string;
  finished_at?: string | null;
  blocked_until?: string | null;
  current_question_id?: number | null;
}

export interface SubmitAnswerRequestDTO {
  question_id: number;
  answer: Record<string, string | number[]>;
  hint_used?: boolean;
}

export interface QuestionAttemptResponseDTO {
  id: number;
  test_attempt_id: number;
  question_id: number;
  answer?: Record<string, string> | null;
  is_correct?: boolean | null;
  hint_used: boolean;
  attempt_number: number;
}

export interface TestAttemptWithBlockResponseDTO {
  id: number;
  test_id: number;
  user_id: number;
  score?: number | null;
  passed?: boolean | null;
  attempt_number: number;
  started_at: string;
  finished_at?: string | null;
  blocked_until?: string | null;
  current_question_id?: number | null;
  blocked: boolean;
  feedback_text?: string;
  consecutive_fails: number;
  message?: string | null;
}

export interface TestResultResponseDTO {
  attempt_id: number;
  test_id: number;
  test_title: string;
  attempt_number: number;
  started_at: string;
  finished_at?: string | null;
  total_questions: number;
  correct_answers: number;
  score?: number | null;
  passed?: boolean | null;
  questions_results: QuestionResultDTO[];
}

export interface QuestionResultDTO {
  question_id: number;
  question_text: string;
  student_answer?: Record<string, string> | null;
  correct_option_ids: number[];
  is_correct: boolean;
  hint_used: boolean;
  partial_score: number;
  hint_text: string | null;
}

export interface MyTestAttemptSummaryDTO {
  id: number;
  test_id: number;
  test_title: string;
  attempt_number: number;
  started_at: string;
  finished_at?: string | null;
  score?: number | null;
  passed?: boolean | null;
}

export interface LessonProgressResponseDTO {
  id: number;
  lesson_id: number;
  completed_at: string;
}

export interface MyCoursesResponseDTO {
  courses: EnrolledCourseResponseDTO[];
}
