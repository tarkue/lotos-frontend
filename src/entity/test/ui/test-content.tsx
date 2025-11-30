import { QuestionList } from "../../question";
import { TestProps } from "../models/test";

export const TestContent = ({ test }: TestProps) => {
  return <>{test.questions && <QuestionList questions={test.questions} />}</>;
};
