"use client";

import { QuestionField } from "@/src/entity/question/ui/question-field";
import { api } from "@/src/shared/api";
import { QuestionType } from "@/src/shared/api/enum/question-type.enum";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { useModals } from "@/src/shared/ui/modal";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Material } from "@/src/entity/material/models/material";

export interface EditableQuestion {
  id?: number;
  title: string;
  fields: {
    id?: number;
    title: string;
    isTrue: boolean;
  }[];
}

interface EditTestFormProps {
  material: Material;
  courseId: number;
  moduleId: number;
}

type Mode = "init" | "edit";

export const EditTestForm: React.FC<EditTestFormProps> = ({
  material,
  courseId,
  moduleId,
}) => {
  const [mode, setMode] = useState<Mode>("init");
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { clear } = useModals();
  const router = useRouter();

  const test = material.tests?.[0];

  const [testId, setTestId] = useState<number>();
  const [answersCount, setAnswersCount] = useState<number | undefined>(
    test?.num_questions,
  );
  const [time, setTime] = useState<number | undefined>(
    test?.time_limit_seconds ? test.time_limit_seconds / 60 : undefined,
  );

  // Если тест уже существует, загружаем его вопросы
  const loadExistingTest = useCallback(async () => {
    if (!test) return;

    try {
      // Используем teacher API для получения вопросов с is_correct
      const testDetail = await api.test.getTest(
        courseId,
        moduleId,
        material.id,
        test.id,
      );

      const loadedQuestions: EditableQuestion[] =
        testDetail.questions?.map((q) => ({
          id: q.id,
          title: q.text,
          fields: q.options.map((o) => ({
            id: o.id,
            title: o.content,
            isTrue: o.is_correct, // Теперь получаем правильный ответ
          })),
        })) || [];

      setQuestions(loadedQuestions);
      setTestId(testDetail.id);
      setAnswersCount(testDetail.num_questions ?? 0);
      setTime(
        testDetail.time_limit_seconds ? testDetail.time_limit_seconds / 60 : 0,
      );
      setMode("edit");
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error("Ошибка загрузки теста:", error);
      toast({
        title: "Ошибка загрузки теста",
        description:
          error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "error",
      });
    }
  }, [courseId, moduleId, material.id, test]);

  const createEmptyQuestion = useCallback(
    (): EditableQuestion => ({
      title: "",
      fields: Array(4)
        .fill(null)
        .map(() => ({
          title: "",
          isTrue: false,
        })),
    }),
    [],
  );

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex] || createEmptyQuestion(),
    [questions, currentQuestionIndex, createEmptyQuestion],
  );

  const handleNumeric = (value: string) => {
    if (value === "") return undefined;
    const n = parseInt(value);
    return isNaN(n) ? undefined : n;
  };

  const validate = useCallback(() => {
    if (!time || !answersCount) {
      toast({
        title: "Не все поля заполнены",
        description: "Необходимо указать время и количество вопросов",
        variant: "warning",
      });
      return false;
    }

    if (time < 5) {
      toast({
        title: "Неправильное время",
        description: "Время на прохождение теста не может быть меньше 5 минут",
        variant: "warning",
      });
      return false;
    }

    if (answersCount < 1) {
      toast({
        title: "Количество вопросов не указано",
        description: "Должен быть хотя бы один вопрос",
        variant: "warning",
      });
      return false;
    }

    return true;
  }, [time, answersCount]);

  const updateCurrentQuestion = useCallback(
    (updates: Partial<EditableQuestion>) => {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[currentQuestionIndex] = {
          ...(newQuestions[currentQuestionIndex] || createEmptyQuestion()),
          ...updates,
        };
        return newQuestions;
      });
    },
    [currentQuestionIndex, createEmptyQuestion],
  );

  const handleNext = () => {
    if (currentQuestionIndex + 1 >= answersCount!) return;

    const nextIndex = currentQuestionIndex + 1;
    if (!questions[nextIndex]) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        createEmptyQuestion(),
      ]);
    }
    setCurrentQuestionIndex(nextIndex);
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      setMode("init");
      return;
    }
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSave = async () => {
    try {
      toast({ title: "Сохранение теста..." });

      if (!testId) {
        toast({
          title: "Ошибка",
          description: "Тест не найден",
          variant: "error",
        });
        return;
      }

      // Валидация вопросов
      for (const [index, question] of questions.entries()) {
        if (!question.title.trim()) {
          toast({
            title: `Вопрос ${index + 1}: текст не заполнен`,
            variant: "warning",
          });
          return;
        }

        const validAnswers = question.fields.filter((f) => f.title.trim());
        if (validAnswers.length === 0) {
          toast({
            title: `Вопрос ${index + 1}: нет заполненных ответов`,
            variant: "warning",
          });
          return;
        }

        const correctAnswers = validAnswers.filter((f) => f.isTrue);
        if (correctAnswers.length === 0) {
          toast({
            title: `Вопрос ${index + 1}: нет отмеченного правильного ответа`,
            variant: "warning",
          });
          return;
        }
      }

      for (const [index, question] of questions.entries()) {
        const validAnswers = question.fields.filter((f) => f.title.trim());
        const type =
          validAnswers.filter((f) => f.isTrue).length > 1
            ? QuestionType.MULTIPLE
            : QuestionType.SINGLE;

        const questionData = {
          text: question.title,
          type,
          position: index + 1,
          options: validAnswers.map((q) => ({
            content: q.title,
            is_correct: q.isTrue,
          })),
        };

        if (question.id) {
          // Обновляем существующий вопрос
          await api.test.updateQuestion(
            courseId,
            moduleId,
            material.id,
            testId,
            question.id,
            questionData,
          );
        } else {
          // Создаем новый вопрос
          await api.test.createQuestion(
            courseId,
            moduleId,
            material.id,
            testId,
            questionData,
          );
        }
      }

      await api.test.updateTest(courseId, moduleId, material.id, testId, {
        status: "published",
      });

      toast({ title: "Тест сохранён ✅" });
      clear();
      router.push(
        formatEndpoint(Endpoint.MATERIAL, [courseId, moduleId, material.id]),
      );
    } catch (error) {
      console.error("Ошибка при сохранении теста:", error);
      toast({
        title: "Ошибка сохранения теста",
        description:
          error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "error",
      });
    }
  };

  const handleLoadTest = async () => {
    if (!validate()) return;
    await loadExistingTest();
  };

  const handleCreateNew = async () => {
    if (!validate()) return;

    try {
      toast({ title: "Создание теста..." });

      const res = await api.test.createTest(courseId, moduleId, material.id, {
        num_questions: answersCount!,
        time_limit_seconds: time! * 60,
        status: "draft",
        title: material.id.toString(),
        pass_threshold: 100,
      });

      setTestId(res.id);
      setQuestions([]);
      setMode("edit");
      setCurrentQuestionIndex(0);
      toast({ title: "Тест создан, начните добавлять вопросы" });
    } catch (error) {
      console.error("Ошибка при создании теста:", error);
      toast({
        title: "Ошибка создания теста",
        description:
          error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "error",
      });
    }
  };

  if (mode === "init") {
    return (
      <div className="flex flex-col gap-4">
        {test ? (
          <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-lg">
            <Label>Найден существующий тест:</Label>
            <div className="text-sm">
              <div>Название: {test.title}</div>
              <div>Вопросов: {test.num_questions}</div>
              <div>
                Время:{" "}
                {test.time_limit_seconds
                  ? `${test.time_limit_seconds / 60} мин`
                  : "не ограничено"}
              </div>
            </div>
            <Button onClick={handleLoadTest}>
              Редактировать существующий тест
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4 bg-base-100 rounded-lg">
            <p>
              Тест ещё не создан. Настройте параметры для создания нового теста.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <Label>Установите время для прохождения теста в минутах:</Label>
          <Input
            placeholder="Время прохождения теста"
            value={time ?? ""}
            onChange={(e) => setTime(handleNumeric(e.target.value))}
          />
        </div>

        <Input
          placeholder="Введите число вопросов в тесте"
          value={answersCount ?? ""}
          onChange={(e) => setAnswersCount(handleNumeric(e.target.value))}
        />

        {!test && <Button onClick={handleCreateNew}>Создать тест</Button>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Текст вопроса"
        value={currentQuestion.title}
        onChange={(e) => updateCurrentQuestion({ title: e.target.value })}
      />

      {currentQuestion.fields.map((field, index) => (
        <QuestionField
          key={`${currentQuestionIndex}-${index}`}
          placeholder="Вариант ответа"
          value={field.title}
          checked={field.isTrue}
          onChange={(e) => {
            const newFields = [...currentQuestion.fields];
            newFields[index] = {
              id: field.id,
              title: e.target.value,
              isTrue: e.target.checked,
            };
            updateCurrentQuestion({ fields: newFields });
          }}
        />
      ))}

      <div className="flex justify-between mt-4">
        <Button variant="ghost" onClick={handleBack}>
          Назад
        </Button>

        {currentQuestionIndex + 1 === answersCount ? (
          <Button onClick={handleSave}>Сохранить</Button>
        ) : (
          <Button onClick={handleNext}>Далее</Button>
        )}
      </div>
    </div>
  );
};
