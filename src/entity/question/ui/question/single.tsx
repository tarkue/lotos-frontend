import { RadioField } from "@/src/shared/ui/radio/field";
import { QuestionProps } from "../../models/question";
import { QuestionBody } from "./wrapper";
import { getVariant } from "./utils";

interface SingleProps extends QuestionProps {
  isSubmitted?: boolean;
  correctOptionIds?: number[];
  selectedOptionIds?: number[];
}

export const Single = ({
  question,
  isSubmitted = false,
  correctOptionIds,
  selectedOptionIds,
}: SingleProps) => {
  const name = question.id.toString();
  if (question.type !== "single") {
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
              <RadioField
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
