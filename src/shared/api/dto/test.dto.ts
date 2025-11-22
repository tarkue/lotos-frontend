import { QuestionType } from "../enum/question-type.enum";

export interface TestCreateRequestDTO {
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
  status?: string;
}

export interface TestUpdateRequestDTO {
  title?: string | null;
  num_questions?: number | null;
  time_limit_seconds?: number | null;
  pass_threshold?: number | null;
  status?: string | null;
}

export interface TestResponseDTO {
  id: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
  status: string;
  generated_by_nn: boolean;
  created_by?: number | null;
  module_id?: number | null;
  material_id?: number | null;
}

export interface TestWithQuestionsResponseDTO {
  id: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
  status: string;
  generated_by_nn: boolean;
  created_by?: number | null;
  module_id?: number | null;
  material_id?: number | null;
  questions: QuestionResponseDTO[];
}

export interface QuestionCreateRequestDTO {
  text: string;
  type: QuestionType;
  position: number;
  hint_text?: string | null;
  options?: AnswerOptionCreateDTO[];
}

export interface QuestionUpdateRequestDTO {
  text?: string | null;
  type?: QuestionType | null;
  position?: number | null;
  hint_text?: string | null;
}

export interface QuestionResponseDTO {
  id: number;
  test_id: number;
  text: string;
  type: QuestionType;
  position: number;
  hint_text?: string | null;
  options: AnswerOptionResponseDTO[];
}

export interface AnswerOptionCreateDTO {
  content: string;
  is_correct: boolean;
}

export interface AnswerOptionUpdateDTO {
  content?: string | null;
  is_correct?: boolean | null;
}

export interface AnswerOptionResponseDTO {
  id: number;
  question_id: number;
  content: string;
  is_correct: boolean;
}
