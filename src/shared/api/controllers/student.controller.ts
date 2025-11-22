import { BaseClient } from "../base/base.client";
import { MessageResponseDTO } from "../dto/auth.dto";
import { PaginationParams } from "../dto/common.dto";
import {
  CourseCardResponseDTO,
  EnrolledCourseDetailResponseDTO,
  LessonProgressResponseDTO,
  MaterialDetailForStudentDTO,
  ModuleWithProgressResponseDTO,
  MyCoursesResponseDTO,
  MyTestAttemptSummaryDTO,
  PaginatedCoursesResponseDTO,
  QuestionAttemptResponseDTO,
  SubmitAnswerRequestDTO,
  TestAttemptResponseDTO,
  TestAttemptWithBlockResponseDTO,
  TestForStudentDTO,
  TestResultResponseDTO,
} from "../dto/student.dto";
import { CourseApplicationResponseDTO } from "../dto/teacher.dto";

export interface CoursesCatalogParams extends PaginationParams {
  search?: string | null;
}

type NewType = CoursesCatalogParams;

export class StudentClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);
  }

  // Courses Catalog
  async getCoursesCatalog(
    params?: NewType
  ): Promise<PaginatedCoursesResponseDTO> {
    return await this.get("/students/courses", { params });
  }

  async getCoursePublicInfo(courseId: number): Promise<CourseCardResponseDTO> {
    return await this.get(`/students/courses/${courseId}`);
  }

  async applyForCourse(
    courseId: number
  ): Promise<CourseApplicationResponseDTO> {
    return await this.post(`/students/courses/${courseId}/apply`);
  }

  // Applications
  async getMyApplications(): Promise<CourseApplicationResponseDTO[]> {
    return await this.get("/students/applications");
  }

  async cancelApplication(applicationId: number): Promise<MessageResponseDTO> {
    return await this.delete(`/students/applications/${applicationId}`);
  }

  // My Courses
  async getMyCourses(): Promise<MyCoursesResponseDTO> {
    return await this.get("/students/my-courses");
  }

  async getEnrolledCourse(
    courseId: number
  ): Promise<EnrolledCourseDetailResponseDTO> {
    return await this.get(`/students/my-courses/${courseId}`);
  }

  async getModule(
    courseId: number,
    moduleId: number
  ): Promise<ModuleWithProgressResponseDTO> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}`
    );
  }

  async getMaterialDetail(
    courseId: number,
    moduleId: number,
    materialId: number
  ): Promise<MaterialDetailForStudentDTO> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}`
    );
  }

  async completeMaterial(
    courseId: number,
    moduleId: number,
    materialId: number
  ): Promise<LessonProgressResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/complete`
    );
  }

  // Tests
  async getTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number
  ): Promise<TestForStudentDTO> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}`
    );
  }

  async startTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number
  ): Promise<TestAttemptResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/start`
    );
  }

  async submitAnswer(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    attemptId: number,
    data: SubmitAnswerRequestDTO
  ): Promise<QuestionAttemptResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts/${attemptId}/answer`,
      data
    );
  }

  async finishTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    attemptId: number
  ): Promise<TestAttemptWithBlockResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts/${attemptId}/finish`
    );
  }

  async getTestResult(attemptId: number): Promise<TestResultResponseDTO> {
    return await this.get(`/students/test-attempts/${attemptId}/result`);
  }

  async getMyTestAttempts(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number
  ): Promise<MyTestAttemptSummaryDTO[]> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts`
    );
  }
}
