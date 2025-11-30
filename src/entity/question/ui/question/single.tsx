import { RadioField } from "@/src/shared/ui/radio/field";
import { QuestionProps } from "../../models/question";
import { QuestionWrapper } from "./wrapper";

export const Single = ({ question }: QuestionProps) => {
  const name = question.id.toString();
  if (question.type !== "single") {
    return <></>;
  }

  return (
    <QuestionWrapper title={question.text}>
      <ul className="flex flex-col gap-2 w-full">
        {question.options.map((option, i) => (
          <li key={i}>
            <RadioField
              name={name}
              value={option.id}
              field={option.content}
              variant={option.is_correct ? "success" : "primary"}
            />
          </li>
        ))}
      </ul>
    </QuestionWrapper>
  );
};
