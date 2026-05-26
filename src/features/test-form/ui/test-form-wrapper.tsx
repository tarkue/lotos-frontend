"use client";
import { Test } from "@/src/entity/test";
import { useState, useEffect } from "react";
import { useSubmitTestComplete } from "../hooks/submit-handle";
import { CompleteTestButton } from "./complete";
import { Typography } from "@/src/shared/ui/typography";
import { Icon } from "@/src/shared/ui/icon";
import {
  TestResultsProvider,
  useTestResults,
  type QuestionResult,
} from "@/src/features/test-results-context";
import { QuestionResultDTO } from "@/src/shared/api/dto/student.dto";
import { TestHeader } from "@/src/widgets/test-header";
import { TestContent } from "@/src/entity/test";

interface UserAnswer {
  questionId: number;
  selectedOptionIds: number[];
  textAnswer?: string;
}

interface TestFormWrapperProps {
  test: Test;
  courseId: number;
  moduleId: number;
  materialId: number;
  attemptId: number;
  startedAt: string;
}

const TestFormContent = ({
  children,
  questionResults,
  userAnswers,
  isSubmitted,
}: {
  children: React.ReactNode;
  questionResults: QuestionResultDTO[] | undefined;
  userAnswers: UserAnswer[] | undefined;
  isSubmitted: boolean;
}) => {
  const { setResults, resetResults } = useTestResults();

  useEffect(() => {
    if (questionResults && questionResults.length > 0) {
      const resultsMap = new Map<number, QuestionResult>();

      questionResults.forEach((result) => {
        const userAnswer = userAnswers?.find(
          (a) => a.questionId === result.question_id,
        );
        const selectedOptionIds = userAnswer?.selectedOptionIds || [];

        resultsMap.set(result.question_id, {
          questionId: result.question_id,
          correctOptionIds: result.correct_option_ids,
          selectedOptionIds,
          isCorrect: result.is_correct,
        });
      });

      setResults(resultsMap);
    } else if (isSubmitted) {
      resetResults();
    }
  }, [questionResults, userAnswers, isSubmitted]);

  return <>{children}</>;
};

export const TestFormWrapper = ({
  test,
  courseId,
  moduleId,
  materialId,
  attemptId,
  startedAt,
}: TestFormWrapperProps) => {
  const submit = useSubmitTestComplete(
    test,
    courseId,
    moduleId,
    materialId,
    attemptId,
  );
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string | null | undefined>(null);
  const [questionResults, setQuestionResults] = useState<
    QuestionResultDTO[] | undefined
  >(undefined);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[] | undefined>(
    undefined,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    // Собираем ответы пользователя перед отправкой
    const formData = new FormData(e.currentTarget);
    const answers: UserAnswer[] = [];

    for (const question of test.questions || []) {
      if (question.type === "text") {
        const res = formData.get(question.id.toString());
        if (res) {
          answers.push({
            questionId: question.id,
            selectedOptionIds: [],
            textAnswer: res as string,
          });
        }
      } else {
        const res = formData
          .getAll(question.id.toString())
          .map((i) => Number.parseInt(i as string));
        if (res.length > 0) {
          answers.push({
            questionId: question.id,
            selectedOptionIds: res,
          });
        }
      }
    }
    setUserAnswers(answers);

    const response = await submit(formData);

    if (response) {
      setHint(response.feedbackText);
      setQuestionResults(response.questionResults);
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <TestResultsProvider>
      <TestFormContent
        questionResults={questionResults}
        userAnswers={userAnswers}
        isSubmitted={isSubmitted}
      >
        <form
          className="flex flex-col gap-6 w-full mb-8 p-6 bg-white rounded-2xl mt-9"
          onSubmit={handleSubmit}
        >
          <TestHeader test={test} startedAt={startedAt + "+00:00"} />
          <TestContent test={test} />

          <CompleteTestButton disable={loading} />
          {hint && (
            <div className="flex flex-col gap-3 w-full bg-base-raised rounded-xl px-4 py-3">
              <div className="flex gap-2 w-full">
                <Icon glyph="ai" color="black" size="20" />
                <Typography.Body bold className="text-black w-full">
                  Подсказка от нейросети
                </Typography.Body>
              </div>
              <Typography.Body className="text-black w-full break-all">
                {hint}
              </Typography.Body>
            </div>
          )}
        </form>
      </TestFormContent>
    </TestResultsProvider>
  );
};
