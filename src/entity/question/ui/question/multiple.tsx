import { CheckboxField } from "@/src/shared/ui/checkbox";
import { QuestionProps } from "../../models/question";
import { QuestionBody } from "./wrapper";
import { getVariant } from "./utils";

interface MultipleProps extends QuestionProps {
  isSubmitted?: boolean;
  correctOptionIds?: number[];
  selectedOptionIds?: number[];
}

export const Multiple = ({
  question,
  isSubmitted = false,
  correctOptionIds,
  selectedOptionIds,
}: MultipleProps) => {
  const name = question.id.toString();
  if (question.type !== "multiple") {
    return <></>;
  }

  return (
    <QuestionBody title={question.text}>
      <ul className="flex flex-col gap-2 w-full">
        {question.options.map((option, i) => {
          const isCorrectOption = correctOptionIds?.includes(option.id);
          const isSelectedOption = selectedOptionIds?.includes(option.id);

          let variant: ReturnType<typeof getVariant> = "default";
          if (isSubmitted && correctOptionIds && selectedOptionIds) {
            if (isCorrectOption) {
              variant = "success";
            } else if (isSelectedOption) {
              variant = "error";
            }
          } else {
            variant = getVariant(option.is_correct);
          }

          return (
            <li key={i}>
              <CheckboxField
                name={name}
                value={option.id}
                field={option.content}
                variant={variant}
                disabled={isSubmitted}
                defaultChecked={option.is_correct}
              />
            </li>
          );
        })}
      </ul>
    </QuestionBody>
  );
};
