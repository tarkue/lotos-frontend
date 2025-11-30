import { Question } from "../../question/models/question";

export interface Test {
  id: number;
  test_id?: number;
  title: string;
  num_questions: number;
  time_limit_seconds?: number | null;
  pass_threshold: number;
  questions?: Question[];
}

export interface TestProps {
  test: Test;
}
