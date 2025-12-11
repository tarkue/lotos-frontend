import { BaseClient } from "../base/base.client";
import { MessageResponseDTO } from "../dto/auth.dto";
import {
  AddEditorRequestDTO,
  CourseApplicationDetailResponseDTO,
  CourseApplicationResponseDTO,
  CourseCreateRequestDTO,
  CourseResponseDTO,
  CourseUpdateRequestDTO,
  CourseWithModulesResponseDTO,
  EditorResponseDTO,
  FileResponseDTO,
  MaterialCreateRequestDTO,
  MaterialFileResponseDTO,
  MaterialResponseDTO,
  MaterialUpdateRequestDTO,
  ModuleCreateRequestDTO,
  ModuleResponseDTO,
  ModuleUpdateRequestDTO,
  ModuleWithMaterialsResponseDTO,
} from "../dto/teacher.dto";

export class TeacherClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);

    this.getMyCourses = this.getMyCourses.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.createModule = this.createModule.bind(this);
    this.getModule = this.getModule.bind(this);
    this.updateModule = this.updateModule.bind(this);
    this.deleteModule = this.deleteModule.bind(this);
    this.createMaterial = this.createMaterial.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);
    this.deleteMaterial = this.deleteMaterial.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.attachFiles = this.attachFiles.bind(this);
    this.detachFile = this.detachFile.bind(this);
    this.addEditor = this.addEditor.bind(this);
    this.getEditors = this.getEditors.bind(this);
    this.removeEditor = this.removeEditor.bind(this);
    this.getCourseApplications = this.getCourseApplications.bind(this);
    this.approveApplication = this.approveApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
  }

  // Courses
  async getMyCourses(options?: {
    accessToken?: string;
  }): Promise<CourseResponseDTO[]> {
    return await this.get<CourseResponseDTO[]>(
      "/teacher/courses",
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined
    );
  }

  async createCourse(data: CourseCreateRequestDTO): Promise<CourseResponseDTO> {
    return await this.post("/teacher/courses", data);
  }

  async getCourse(
    courseId: number,
    options?: {
      accessToken?: string;
    }
  ): Promise<CourseWithModulesResponseDTO> {
    return await this.get<CourseWithModulesResponseDTO>(
      `/teacher/courses/${courseId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined
    );
  }

  async updateCourse(
    courseId: number,
    data: CourseUpdateRequestDTO
  ): Promise<CourseResponseDTO> {
    return await this.put(`/teacher/courses/${courseId}`, data);
  }

  async deleteCourse(courseId: number): Promise<MessageResponseDTO> {
    return await this.delete(`/teacher/courses/${courseId}`);
  }

  // Modules
  async createModule(
    courseId: number,
    data: ModuleCreateRequestDTO
  ): Promise<ModuleResponseDTO> {
    return await this.post(`/teacher/courses/${courseId}/modules`, data);
  }

  async getModule(
    courseId: number,
    moduleId: number,
    options?: {
      accessToken?: string;
    }
  ): Promise<ModuleWithMaterialsResponseDTO> {
    return await this.get(
      `/teacher/courses/${courseId}/modules/${moduleId}`,
      options
        ? {
            headers: {
              Authorization: `Bearer ${options.accessToken}`,
            },
          }
        : undefined
    );
  }

  async updateModule(
    courseId: number,
    moduleId: number,
    data: ModuleUpdateRequestDTO
  ): Promise<ModuleResponseDTO> {
    return await this.put(
      `/teacher/courses/${courseId}/modules/${moduleId}`,
      data
    );
  }

  async deleteModule(
    courseId: number,
    moduleId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete(
      `/teacher/courses/${courseId}/modules/${moduleId}`
    );
  }

  // Materials
  async createMaterial(
    courseId: number,
    moduleId: number,
    data: MaterialCreateRequestDTO
  ): Promise<MaterialResponseDTO> {
    return await this.post(
      `/teacher/courses/${courseId}/modules/${moduleId}/materials`,
      data
    );
  }

  async updateMaterial(
    courseId: number,
    moduleId: number,
    materialId: number,
    data: MaterialUpdateRequestDTO
  ): Promise<MaterialResponseDTO> {
    return await this.put(
      `/teacher/courses/${courseId}/modules/${moduleId}/materials/${materialId}`,
      data
    );
  }

  async deleteMaterial(
    courseId: number,
    moduleId: number,
    materialId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete(
      `/teacher/courses/${courseId}/modules/${moduleId}/materials/${materialId}`
    );
  }

  // Files
  async uploadFile(file: File): Promise<FileResponseDTO> {
    const formData = new FormData();
    formData.append("file", file);

    return await this.post("/teacher/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async attachFiles(
    courseId: number,
    moduleId: number,
    materialId: number,
    fileIds: number[]
  ): Promise<MaterialFileResponseDTO[]> {
    return await this.post(
      `/teacher/courses/${courseId}/modules/${moduleId}/materials/${materialId}/files`,
      fileIds
    );
  }

  async detachFile(
    courseId: number,
    moduleId: number,
    materialId: number,
    fileId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete(
      `/teacher/courses/${courseId}/modules/${moduleId}/materials/${materialId}/files/${fileId}`
    );
  }

  // Editors
  async addEditor(
    courseId: number,
    data: AddEditorRequestDTO
  ): Promise<EditorResponseDTO> {
    return await this.post(`/teacher/courses/${courseId}/editors`, data);
  }

  async getEditors(courseId: number): Promise<EditorResponseDTO[]> {
    return await this.get(`/teacher/courses/${courseId}/editors`);
  }

  async removeEditor(
    courseId: number,
    editorId: number
  ): Promise<MessageResponseDTO> {
    return await this.delete(
      `/teacher/courses/${courseId}/editors/${editorId}`
    );
  }

  // Applications
  async getCourseApplications(
    courseId: number
  ): Promise<CourseApplicationResponseDTO[]> {
    return await this.get(`/teacher/courses/${courseId}/applications`);
  }

  async approveApplication(
    applicationId: number
  ): Promise<CourseApplicationDetailResponseDTO> {
    return await this.post(`/teacher/applications/${applicationId}/approve`);
  }

  async rejectApplication(
    applicationId: number
  ): Promise<CourseApplicationDetailResponseDTO> {
    return await this.post(`/teacher/applications/${applicationId}/reject`);
  }
}
