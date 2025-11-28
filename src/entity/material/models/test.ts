export interface Test {
  id: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
}
