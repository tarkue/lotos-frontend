import { BaseClient } from "../base/base.client";
import { MessageResponseDTO } from "../dto/auth.dto";
import { CoursesCatalogParams } from "../dto/course.dto";
import {
  CourseCardResponseDTO,
  EnrolledCourseDetailResponseDTO,
  LessonProgressResponseDTO,
  MaterialDetailForStudentDTO,
  ModuleWithMaterialsResponse,
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

export class StudentClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);

    this.getCoursesCatalog = this.getCoursesCatalog.bind(this);
    this.getCoursePublicInfo = this.getCoursePublicInfo.bind(this);
    this.applyForCourse = this.applyForCourse.bind(this);
    this.getMyApplications = this.getMyApplications.bind(this);
    this.cancelApplication = this.cancelApplication.bind(this);
    this.getMyCourses = this.getMyCourses.bind(this);
    this.getEnrolledCourse = this.getEnrolledCourse.bind(this);
    this.getModule = this.getModule.bind(this);
    this.getMaterialDetail = this.getMaterialDetail.bind(this);
    this.completeMaterial = this.completeMaterial.bind(this);
    this.getTest = this.getTest.bind(this);
    this.startTest = this.startTest.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.finishTest = this.finishTest.bind(this);
    this.getTestResult = this.getTestResult.bind(this);
    this.getMyTestAttempts = this.getMyTestAttempts.bind(this);
  }

  // Courses Catalog
  async getCoursesCatalog(
    params?: CoursesCatalogParams,
  ): Promise<PaginatedCoursesResponseDTO> {
    return await this.get("/students/courses", { params });
  }

  async getCoursePublicInfo(courseId: number): Promise<CourseCardResponseDTO> {
    return await this.get(`/students/courses/${courseId}`);
  }

  async applyForCourse(
    courseId: number,
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
  async getMyCourses(options?: {
    accessToken?: string;
  }): Promise<MyCoursesResponseDTO> {
    return await this.get(
      "/students/my-courses",
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async getEnrolledCourse(
    courseId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<EnrolledCourseDetailResponseDTO> {
    return await this.get(
      `/students/my-courses/${courseId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async getModule(
    courseId: number,
    moduleId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<ModuleWithMaterialsResponse> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async getMaterialDetail(
    courseId: number,
    moduleId: number,
    materialId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<MaterialDetailForStudentDTO> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async completeMaterial(
    courseId: number,
    moduleId: number,
    materialId: number,
  ): Promise<LessonProgressResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/complete`,
    );
  }

  // Tests
  async getTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<TestForStudentDTO> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options?.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async startTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<TestAttemptResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/start`,
      undefined,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options?.accessToken}`,
            },
          }
        : undefined,
    );
  }

  async submitAnswer(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    attemptId: number,
    data: SubmitAnswerRequestDTO,
  ): Promise<QuestionAttemptResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts/${attemptId}/answer`,
      data,
    );
  }

  async submitAnswerAll(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    attemptId: number,
    data: SubmitAnswerRequestDTO[],
    access_token: string,
  ): Promise<TestAttemptWithBlockResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts/${attemptId}/submit-with-feedback`,
      {
        answers: data,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
  }

  async finishTest(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    attemptId: number,
  ): Promise<TestAttemptWithBlockResponseDTO> {
    return await this.post(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts/${attemptId}/finish`,
    );
  }

  async getTestResult(
    attemptId: number,
    access_token?: string,
  ): Promise<TestResultResponseDTO> {
    return await this.get(
      `/students/test-attempts/${attemptId}/result`,
      access_token
        ? {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        : undefined,
    );
  }

  async getMyTestAttempts(
    courseId: number,
    moduleId: number,
    materialId: number,
    testId: number,
    options?: {
      accessToken?: string;
    },
  ): Promise<MyTestAttemptSummaryDTO[]> {
    return await this.get(
      `/students/my-courses/${courseId}/modules/${moduleId}/materials/${materialId}/tests/${testId}/attempts`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options?.accessToken}`,
            },
          }
        : undefined,
    );
  }
}
