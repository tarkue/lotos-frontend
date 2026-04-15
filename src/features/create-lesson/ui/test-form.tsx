"use client";

import { ModuleProps } from "@/src/entity/module";
import { QuestionField } from "@/src/entity/question";
import { api } from "@/src/shared/api";
import { QuestionType } from "@/src/shared/api/enum/question-type.enum";
import { formatEndpoint } from "@/src/shared/libs/endpoint";
import { Endpoint } from "@/src/shared/models/endpoint-enum";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import { useModals } from "@/src/shared/ui/modal";
import { AsyncSelect } from "@/src/shared/ui/select";
import { Pair } from "@/src/shared/ui/select/pair";
import { toast } from "@/src/shared/ui/toast";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { loadMaterials } from "../api/load-material";

export interface Question {
  title: string;
  fields: {
    title: string;
    isTrue: boolean;
  }[];
}

type Mode = "init" | "ai" | "hand";

export const AddTestForm = ({ module }: ModuleProps) => {
  const loadMaterialForModule = loadMaterials(module.course_id, module.id);
  const [mode, setMode] = useState<Mode>("init");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { clear } = useModals();
  const router = useRouter();

  const [materialIdPair, setMaterialIdPair] = useState<Pair<string, string>>();
  const [testId, setTestId] = useState<number>();
  const [answersCount, setAnswersCount] = useState<number>();
  const [time, setTime] = useState<number>();

  const createEmptyQuestion = useCallback((): Question => ({
    title: "",
    fields: Array(4)
      .fill(null)
      .map(() => ({
        title: "",
        isTrue: false,
      })),
  }), []);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex] || createEmptyQuestion(),
    [questions, currentQuestionIndex, createEmptyQuestion]
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

    if (!materialIdPair?.value) {
      toast({
        title: "Необходимо выбрать урок",
        description: "К уроку будет привязан тест",
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
  }, [time, answersCount, materialIdPair]);

  const handleAi = async () => {
    if (!validate()) return;

    try {
      toast({ title: "Генерация теста..." });

      const res = await api.ai.generateTest(
        module.course_id,
        module.id,
        Number.parseInt(materialIdPair!.value),
        {
          num_questions: answersCount!,
          time_limit_minutes: time!,
        }
      );

      setTestId(res.id);

      const data: Question[] = res.questions.map((el) => ({
        title: el.text,
        fields: el.options.map((o) => ({
          title: o.content,
          isTrue: o.is_correct,
        })),
      }));

      // Удаляем автоматически сгенерированные вопросы если нужно редактировать
      if (res.questions && res.questions.length > 0) {
        for (const q of res.questions) {
          try {
            await api.test.deleteQuestion(
              module.course_id,
              module.id,
              Number.parseInt(materialIdPair!.value),
              q.test_id,
              q.id
            );
          } catch (deleteError) {
            console.warn("Не удалось удалить вопрос:", deleteError);
          }
        }
      }

      setQuestions(data);
      setMode("ai");
      setCurrentQuestionIndex(0);
      toast({ title: "Тест сгенерирован 🎉" });
    } catch (error) {
      console.error("Ошибка генерации теста:", error);
      toast({
        title: "Ошибка генерации теста",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "warning",
      });
    }
  };

  const handleHand = async () => {
    if (!validate()) return;

    try {
      const materialId = parseInt(materialIdPair!.value);
      const res = await api.test.createTest(
        module.course_id,
        module.id,
        materialId,
        {
          num_questions: answersCount!,
          time_limit_seconds: time! * 60,
          status: "draft",
          title: module.title,
          pass_threshold: 100,
        }
      );

      setTestId(res.id);
      setQuestions([]);
      setMode("hand");
      setCurrentQuestionIndex(0);
      toast({ title: "Тест создан, начните добавлять вопросы" });
    } catch (error) {
      console.error("Ошибка при создании теста:", error);
      toast({
        title: "Ошибка создания теста",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "warning",
      });
    }
  };

  const updateCurrentQuestion = useCallback(
    (updates: Partial<Question>) => {
      setQuestions((prev) => {
        const newQuestions = [...prev];
        newQuestions[currentQuestionIndex] = {
          ...(newQuestions[currentQuestionIndex] || createEmptyQuestion()),
          ...updates,
        };
        return newQuestions;
      });
    },
    [currentQuestionIndex, createEmptyQuestion]
  );

  const handleNext = () => {
    if (currentQuestionIndex + 1 >= answersCount!) return;

    const nextIndex = currentQuestionIndex + 1;
    if (!questions[nextIndex]) {
      setQuestions((prevQuestions) => [...prevQuestions, createEmptyQuestion()]);
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

      const materialId = parseInt(materialIdPair!.value);

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

        await api.test.createQuestion(
          module.course_id,
          module.id,
          materialId,
          testId!,
          {
            text: question.title,
            type,
            position: index + 1,
            options: validAnswers.map((q) => ({
              content: q.title,
              is_correct: q.isTrue,
            })),
          }
        );
      }

      await api.test.updateTest(
        module.course_id,
        module.id,
        materialId,
        testId!,
        { status: "published" }
      );

      toast({ title: "Тест сохранён ✅" });
      clear();
      router.push(
        formatEndpoint(Endpoint.MATERIAL, [
          module.course_id,
          module.id,
          materialId,
        ])
      );
    } catch (error) {
      console.error("Ошибка при сохранении теста:", error);
      toast({
        title: "Ошибка сохранения теста",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "warning",
      });
    }
  };

  if (mode === "init") {
    return (
      <div className="flex flex-col gap-4 max-w-xl">
        <div className="flex flex-col gap-1">
          <Label isValid={true}>
            Выберите урок, к которому нужно привязать тест:
          </Label>
          <AsyncSelect
            cacheOptions
            defaultOptions
            isClearable
            loadOptions={loadMaterialForModule}
            placeholder="Выберите урок"
            value={materialIdPair}
            onChange={(e) =>
              setMaterialIdPair(
                e ? { label: e.label, value: e.value } : undefined
              )
            }
          />
        </div>
        <Input
          placeholder="Введите число вопросов в тесте"
          value={answersCount ?? ""}
          onChange={(e) => setAnswersCount(handleNumeric(e.target.value))}
        />

        <div className="flex flex-col gap-1">
          <Label isValid={true}>
            Установите время для прохождения теста в минутах:
          </Label>
          <Input
            placeholder="Время прохождения теста"
            value={time ?? ""}
            onChange={(e) => setTime(handleNumeric(e.target.value))}
          />
        </div>

        <Button size="large" onClick={handleAi}>
          Сгенерировать тест
        </Button>

        <Button variant="ghost" size="large" onClick={handleHand}>
          Создать тест вручную
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl">
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
