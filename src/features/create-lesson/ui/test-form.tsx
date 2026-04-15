"use client";

import { ModuleProps } from "@/src/entity/module";
import { QuestionField } from "@/src/entity/question";
import { api } from "@/src/shared/api";
import { QuestionType } from "@/src/shared/api/enum/question-type.enum";
import { TestResponseDTO } from "@/src/shared/api/dto/test.dto";
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
import { useCallback, useMemo, useState, useEffect } from "react";
import { loadMaterials } from "../api/load-material";

export interface Question {
  title: string;
  fields: {
    title: string;
    isTrue: boolean;
  }[];
}

type Mode = "init" | "ai" | "hand";

interface AddTestFormProps extends ModuleProps {
  editMode?: boolean;
  existingTest?: {
    id: number;
    num_questions: number;
    time_limit_seconds?: number | null;
    material_id?: number | null;
  };
  onSuccess?: () => void;
}

export const AddTestForm = ({ module, editMode = false, existingTest, onSuccess }: AddTestFormProps) => {
  const loadMaterialForModule = loadMaterials(module.course_id, module.id);
  const [mode, setMode] = useState<Mode>(editMode ? "hand" : "init");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { clear } = useModals();
  const router = useRouter();

  const [materialIdPair, setMaterialIdPair] = useState<Pair<string, string>>();
  const [testId, setTestId] = useState<number>();
  const [answersCount, setAnswersCount] = useState<number>();
  const [time, setTime] = useState<number>();
  useEffect(() => {
    if (editMode && existingTest && existingTest.material_id) {
      // Загружаем данные существующего теста
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTestId(existingTest.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswersCount(existingTest.num_questions);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTime(Math.ceil((existingTest.time_limit_seconds || 0) / 60));

      // Находим материал
      const material = module.materials?.find(m => m.id === existingTest.material_id);
      if (material && material.title) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaterialIdPair({ label: material.title, value: material.id.toString() });
      }

      // Загружаем вопросы теста
      api.test.getTest(module.course_id, module.id, existingTest.material_id, existingTest.id)
        .then(testData => {
          if (testData.questions) {
            const loadedQuestions: Question[] = testData.questions.map(q => ({
              title: q.text,
              fields: q.options.map(o => ({
                title: o.content,
                isTrue: o.is_correct,
              })),
            }));
            setQuestions(loadedQuestions);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCurrentQuestionIndex(0); // Устанавливаем индекс на первый вопрос
          }
        })
        .catch(error => {
          console.error("Ошибка загрузки теста:", error);
          toast({
            title: "Ошибка загрузки",
            description: "Не удалось загрузить данные теста",
            variant: "warning",
          });
        });
    }
  }, [editMode, existingTest, module]);
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
    if (!answersCount || currentQuestionIndex + 1 >= answersCount) return;

    const nextIndex = currentQuestionIndex + 1;
    if (!questions[nextIndex]) {
      setQuestions((prevQuestions) => [...prevQuestions, createEmptyQuestion()]);
    }
    setCurrentQuestionIndex(nextIndex);
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      if (editMode) {
        // В режиме редактирования возвращаемся к списку действий
        clear();
        return;
      }
      setMode("init");
      return;
    }
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleSave = async () => {
    try {
      toast({ title: editMode ? "Обновление теста..." : "Сохранение теста..." });

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

      if (editMode && existingTest) {
        // Режим редактирования - обновляем существующие вопросы
        const currentTestData = await api.test.getTest(module.course_id, module.id, materialId, testId!);

        // Удаляем вопросы, которые больше не существуют
        if (currentTestData.questions) {
          for (const existingQuestion of currentTestData.questions) {
            const questionStillExists = questions.some(q => q.title === existingQuestion.text);
            if (!questionStillExists) {
              await api.test.deleteQuestion(
                module.course_id,
                module.id,
                materialId,
                testId!,
                existingQuestion.id
              );
            }
          }
        }

        // Обновляем или создаем вопросы
        for (const [index, question] of questions.entries()) {
          const validAnswers = question.fields.filter((f) => f.title.trim());
          const type =
            validAnswers.filter((f) => f.isTrue).length > 1
              ? QuestionType.MULTIPLE
              : QuestionType.SINGLE;

          const existingQuestion = currentTestData.questions?.find(q => q.text === question.title);

          if (existingQuestion) {
            // Обновляем существующий вопрос
            await api.test.updateQuestion(
              module.course_id,
              module.id,
              materialId,
              testId!,
              existingQuestion.id,
              {
                text: question.title,
                type,
                position: index + 1,
              }
            );

            // Удаляем старые опции и добавляем новые
            for (const existingOption of existingQuestion.options) {
              await api.test.deleteAnswerOption(
                module.course_id,
                module.id,
                materialId,
                testId!,
                existingQuestion.id,
                existingOption.id
              );
            }

            // Добавляем новые опции
            for (const answer of validAnswers) {
              await api.test.addAnswerOption(
                module.course_id,
                module.id,
                materialId,
                testId!,
                existingQuestion.id,
                {
                  content: answer.title,
                  is_correct: answer.isTrue,
                }
              );
            }
          } else {
            // Создаем новый вопрос
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
        }

        // Обновляем настройки теста
        await api.test.updateTest(
          module.course_id,
          module.id,
          materialId,
          testId!,
          {
            num_questions: answersCount!,
            time_limit_seconds: time! * 60,
            status: "published"
          }
        );
      } else {
        // Режим создания - создаем новые вопросы
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
      }

      toast({ title: editMode ? "Тест обновлен ✅" : "Тест сохранён ✅" });

      if (onSuccess) {
        onSuccess();
      } else {
        clear();
        router.push(
          formatEndpoint(Endpoint.MATERIAL, [
            module.course_id,
            module.id,
            materialId,
          ])
        );
      }
    } catch (error) {
      console.error("Ошибка при сохранении теста:", error);
      toast({
        title: "Ошибка сохранения теста",
        description: error instanceof Error ? error.message : "Неизвестная ошибка",
        variant: "warning",
      });
    }
  };

  if (mode === "init" && !editMode) {
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

        {answersCount && currentQuestionIndex + 1 === answersCount ? (
          <Button onClick={handleSave}>
            {editMode ? "Обновить тест" : "Сохранить"}
          </Button>
        ) : (
          <Button onClick={handleNext}>Далее</Button>
        )}
      </div>
    </div>
  );
};
