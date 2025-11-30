export interface QuestionOption {
  id: number;
  question_id?: number;
  content: string;
  is_correct?: boolean;
}

export interface Question {
  id: number;
  test_id?: number;
  text: string;
  type: "single" | "multiple" | "text";
  position: number;
  hint_text?: string | null;
  options: QuestionOption[];
}

export interface QuestionProps {
  question: Question;
}
