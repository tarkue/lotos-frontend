import { PaginationParams } from "./common.dto";

export interface CoursesCatalogParams extends PaginationParams {
  search?: string | null;
}
