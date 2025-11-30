import { Question } from "../../models/question";
import { QuestionFabric } from "../question-fabric";

export const QuestionList = ({ questions }: { questions: Question[] }) => {
  return (
    <ul className="flex flex-col gap-6">
      {questions
        ?.sort((el) => el.position)
        ?.map((question, i) => (
          <li key={i} className="w-full">
            <QuestionFabric question={question} />
          </li>
        ))}
    </ul>
  );
};
