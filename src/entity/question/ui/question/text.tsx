import { Input } from "@/src/shared/ui/input";
import { QuestionProps } from "../../models/question";
import { QuestionBody } from "./wrapper";

export const Text = ({ question }: QuestionProps) => {
  if (question.type !== "text") {
    return <></>;
  }

  return (
    <QuestionBody title={question.text}>
      <ul className="flex flex-col gap-2 w-full">
        <Input name={question.id.toString()} placeholder="Ответ" />
      </ul>
    </QuestionBody>
  );
};
