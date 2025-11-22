import { BaseClient } from "../base/base.client";
import { GenerateTestRequestDTO } from "../dto/ai.dto";
import { TestWithQuestionsResponseDTO } from "../dto/test.dto";

export class AIClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);
  }

  async generateTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    data: GenerateTestRequestDTO
  ): Promise<TestWithQuestionsResponseDTO> {
    return await this.post(
      `/ai/courses/${courseId}/modules/${moduleId}/materials/${materialId}/generate-test`,
      data
    );
  }
}
