import { BaseClient } from "../base/base.client";
import { MessageResponseDTO } from "../dto/auth.dto";
import {
  AnswerOptionCreateDTO,
  AnswerOptionResponseDTO,
  AnswerOptionUpdateDTO,
  QuestionCreateRequestDTO,
  QuestionResponseDTO,
  QuestionUpdateRequestDTO,
  TestCreateRequestDTO,
  TestResponseDTO,
  TestUpdateRequestDTO,
  TestWithQuestionsResponseDTO,
} from "../dto/test.dto";

export class TestClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);

    this.createTest = this.createTest.bind(this);
    this.getTest = this.getTest.bind(this);
    this.updateTest = this.updateTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.addAnswerOption = this.addAnswerOption.bind(this);
    this.updateAnswerOption = this.updateAnswerOption.bind(this);
    this.deleteAnswerOption = this.deleteAnswerOption.bind(this);
  }

  // Tests
  async createTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    data: TestCreateRequestDTO
  ): Promise<TestResponseDTO> {
    return await this.post(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests`,
      data
    );
  }

  async getTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number
  ): Promise<TestWithQuestionsResponseDTO> {
    return await this.get(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}`
    );
  }

  async updateTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    data: TestUpdateRequestDTO
  ): Promise<TestResponseDTO> {
    return await this.put(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}`,
      data
    );
  }

  async deleteTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}`
    );
  }

  // Questions
  async createQuestion(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    data: QuestionCreateRequestDTO
  ): Promise<QuestionResponseDTO> {
    return await this.post(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions`,
      data
    );
  }

  async updateQuestion(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    questionId: number,
    data: QuestionUpdateRequestDTO
  ): Promise<QuestionResponseDTO> {
    return await this.put(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions/${questionId}`,
      data
    );
  }

  async deleteQuestion(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    questionId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete<MessageResponseDTO>(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions/${questionId}`
    );
  }

  // Answer Options
  async addAnswerOption(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    questionId: number,
    data: AnswerOptionCreateDTO
  ): Promise<AnswerOptionResponseDTO> {
    return await this.post(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions/${questionId}/options`,
      data
    );
  }

  async updateAnswerOption(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    questionId: number,
    optionId: number,
    data: AnswerOptionUpdateDTO
  ): Promise<AnswerOptionResponseDTO> {
    return await this.put(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions/${questionId}/options/${optionId}`,
      data
    );
  }

  async deleteAnswerOption(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    questionId: number,
    optionId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete<MessageResponseDTO>(
      `/test/courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/questions/${questionId}/options/${optionId}`
    );
  }
}
