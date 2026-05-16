import { CheckboxField } from "@/src/shared/ui/checkbox";
import { QuestionProps } from "../../models/question";
import { QuestionBody } from "./wrapper";
import { getVariant } from "./utils";

export const Multiple = ({ question }: QuestionProps) => {
  const name = question.id.toString();
  if (question.type !== "multiple") {
    return <></>;
  }

  return (
    <QuestionBody title={question.text}>
      <ul className="flex flex-col gap-2 w-full">
        {question.options.map((option, i) => (
          <li key={i}>
            <CheckboxField
              name={name}
              value={option.id}
              field={option.content}
              variant={getVariant(option.is_correct)}
            />
          </li>
        ))}
      </ul>
    </QuestionBody>
  );
};
