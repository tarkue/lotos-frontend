import { Input } from "@/src/shared/ui/input";
import { QuestionProps } from "../../models/question";
import { QuestionWrapper } from "./wrapper";

export const Text = ({ question }: QuestionProps) => {
  if (question.type !== "text") {
    return <></>;
  }

  return (
    <QuestionWrapper title={question.text}>
      <ul className="flex flex-col gap-2 w-full">
        <Input name={question.id.toString()} placeholder="Ответ" />
      </ul>
    </QuestionWrapper>
  );
};
