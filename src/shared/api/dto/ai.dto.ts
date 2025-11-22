export interface GenerateTestRequestDTO {
  num_questions?: number;
  question_types?: string[];
  pass_threshold?: number;
  time_limit_minutes?: number;
}
