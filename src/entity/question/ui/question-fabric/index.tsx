"use client";
import { QuestionProps } from "../../models/question";
import { QuestionItem } from "../question";
import { useTestResults } from "@/src/features/test-results-context";

export const QuestionFabric = ({ question }: QuestionProps) => {
  const { results, isSubmitted } = useTestResults();
  const result = results.get(question.id);

  return (
    <>
      {question.type === "multiple" && (
        <QuestionItem.Multiple
          question={question}
          isSubmitted={isSubmitted}
          correctOptionIds={result?.correctOptionIds}
          selectedOptionIds={result?.selectedOptionIds}
        />
      )}
      {question.type === "single" && (
        <QuestionItem.Single
          question={question}
          isSubmitted={isSubmitted}
          correctOptionIds={result?.correctOptionIds}
          selectedOptionIds={result?.selectedOptionIds}
        />
      )}
      {question.type === "text" && <QuestionItem.Text question={question} />}
    </>
  );
};
