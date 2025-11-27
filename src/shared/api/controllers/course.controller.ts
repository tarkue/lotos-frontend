import { BaseClient } from "../base/base.client";
import { CoursesCatalogParams } from "../dto/course.dto";
import {
  CourseCardResponseDTO,
  PaginatedCoursesResponseDTO,
} from "../dto/student.dto";

export class CourseClient extends BaseClient {
  constructor(baseURL?: string) {
    super(baseURL);

    this.getCoursePublicInfo.bind(this);
    this.getCoursesCatalog.bind(this);
  }

  // Courses Catalog
  async getCoursesCatalog(
    params?: CoursesCatalogParams
  ): Promise<PaginatedCoursesResponseDTO> {
    return await this.get("/public/courses", { params });
  }

  async getCoursePublicInfo(courseId: number): Promise<CourseCardResponseDTO> {
    return await this.get(`/public/courses/${courseId}`);
  }
}
