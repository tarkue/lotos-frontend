"use client";
import { useAuth } from "@/src/shared/api/context/auth-context";
import { RoleType } from "@/src/shared/api/enum/role-type.enum";
import { Typography } from "@/src/shared/ui/typography";
import { TestWithQuestionsResponseDTO } from "@/src/shared/api/dto/test.dto";
import { QuestionFabric } from "@/src/entity/question";
import { TestResultsProvider } from "@/src/features/test-results-context";

interface MaterialTestViewerProps {
  test: TestWithQuestionsResponseDTO;
}

export const MaterialTestViewer: React.FC<MaterialTestViewerProps> = ({
  test,
}) => {
  const { role } = useAuth();

  if (role === RoleType.STUDENT) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4 mt-6">
      <TestResultsProvider>
        <div className="w-full rounded-lg">
          {test?.questions && test.questions.length > 0 ? (
            <div className="flex flex-col gap-6">
              {test.questions.map((question, index) => (
                <QuestionFabric question={question} key={index} />
              ))}
            </div>
          ) : (
            <Typography.Body className="text-black">
              Вопросы не найдены
            </Typography.Body>
          )}
        </div>
      </TestResultsProvider>
    </div>
  );
};
