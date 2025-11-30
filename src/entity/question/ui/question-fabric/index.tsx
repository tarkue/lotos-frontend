import { QuestionProps } from "../../models/question";
import { QuestionItem } from "../question";

export const QuestionFabric = ({ question }: QuestionProps) => {
  return (
    <>
      {question.type === "multiple" && (
        <QuestionItem.Multiple question={question} />
      )}
      {question.type === "single" && (
        <QuestionItem.Single question={question} />
      )}
      {question.type === "text" && <QuestionItem.Text question={question} />}
    </>
  );
};
