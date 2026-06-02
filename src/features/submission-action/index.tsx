import { AnswerSubmission } from "./ui/answer";
import { ViewSubmission } from "./ui/view";

export const SubmissionAction = Object.assign(
  {},
  {
    View: ViewSubmission,
    Answer: AnswerSubmission,
  },
);
