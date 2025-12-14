"use client";
import { ModuleProps } from "@/src/entity/module";
import { QuestionField } from "@/src/entity/question";
import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { toast } from "@/src/shared/ui/toast";
import { useState } from "react";

export interface Question {
  title: string;
  fields: {
    title: string;
    isTrue: boolean;
  }[];
}

interface TestLessonFormProps extends ModuleProps {
  lessonTitle: string;
}

const QuestionForm = ({
  handleAddQuestion,
}: {
  handleAddQuestion: (question: Question) => void;
}) => {
  return (
    <form>
      <Input placeholder="Текст вопроса" />;
      <QuestionField placeholder="Вариант ответа" />
      <QuestionField placeholder="Вариант ответа" />
      <QuestionField placeholder="Вариант ответа" />
      <QuestionField placeholder="Вариант ответа" />
    </form>
  );
};

const NextButton = () => {};

export const AddTestForm = ({}: TestLessonFormProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answersCount, setAnswersCount] = useState<number | undefined>(
    undefined
  );
  const [time, setTime] = useState<number | undefined>(undefined);

  const handleAddQuestion = (question: Question, position: number) => {
    if (position === 0) {
      setQuestions([question]);
      return;
    }

    if (questions.length > position) {
      setQuestions((v) =>
        v.map((el, i) => {
          if (i === position) {
            return question;
          }
          return el;
        })
      );
      return;
    }

    setQuestions((val) => [...val, question]);
  };

  const handleNumeric = (value: string) => {
    try {
      if (value === "") {
        return undefined;
      }
      return Number.parseInt(value);
    } catch {}
  };

  const validate = () => {
    if (time === undefined || answersCount === undefined) {
      toast({
        title: "Необходимо указать время и количество вопросов",
        variant: "warning",
      });
      return false;
    }

    if (time < 5) {
      toast({
        title: "Время на прохождение теста не может быть меньше 5 минут",
        variant: "warning",
      });
      return false;
    }

    if (answersCount < 1) {
      toast({
        title: "Должен быть хотя бы один вопрос",
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  const handleAi = () => {
    if (!validate()) {
      return;
    }
  };

  const handleHand = () => {
    if (!validate()) {
      return;
    }
  };

  return (
    <div className="flex">
      <Input
        className="w-full"
        placeholder="Введите число вопросов в тесте"
        value={answersCount}
        onChange={(e) => setAnswersCount(handleNumeric(e.currentTarget.value))}
      />
      <Input
        className="w-full"
        placeholder="Установите время для прохождения теста (в минутах)"
        value={time}
        onChange={(e) => setTime(handleNumeric(e.currentTarget.value))}
      />
      <Button variant="primary" size="large" onClick={handleAi}>
        Сгенерировать тест
      </Button>
      <Button variant="ghost" size="large" onClick={handleHand}>
        Создать тест вручную
      </Button>
    </div>
  );
};
