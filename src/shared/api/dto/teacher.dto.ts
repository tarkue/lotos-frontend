import { ApplicationStatus } from "../enum/application-status.enum";
import { MaterialType } from "../enum/material-type.enum";
import { UserResponseDTO } from "./auth.dto";
import { CourseProgressResponseDTO } from "./student.dto";

export interface CourseCreateRequestDTO {
  title: string;
  description?: string | null;
  img_url?: string | null;
}

export interface CourseUpdateRequestDTO {
  title?: string | null;
  description?: string | null;
  img_url?: string | null;
}

export interface CourseResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  created_at: string;
  creator?: UserResponseDTO | null;
}

export interface CourseWithModulesResponseDTO {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  created_at: string;
  creator?: UserResponseDTO | null;
  modules: ModuleResponseDTO[];
}

export interface ModuleCreateRequestDTO {
  title: string;
  position: number;
}

export interface ModuleUpdateRequestDTO {
  title?: string | null;
  position?: number | null;
}

export interface ModuleResponseDTO {
  id: number;
  title: string;
  position: number;
  course_id: number;
}

export interface ModuleWithMaterialsResponseDTO {
  id: number;
  title: string;
  position: number;
  course_id: number;
  materials: MaterialResponseDTO[];
}

export interface MaterialCreateRequestDTO {
  type: MaterialType;
  title: string;
  content_url?: string | null;
  text_content?: string | null;
  transcript?: string | null;
  position: number;
}

export interface MaterialUpdateRequestDTO {
  type?: MaterialType | null;
  title?: string | null;
  content_url?: string | null;
  text_content?: string | null;
  transcript?: string | null;
  position?: number | null;
}

export interface MaterialResponseDTO {
  id: number;
  module_id: number;
  type: MaterialType;
  material_id?: number;
  title: string;
  content_url?: string | null;
  text_content?: string | null;
  transcript?: string | null;
  position: number;
  files: MaterialFileInfoDTO[];
}

export interface FileResponseDTO {
  id: number;
  filename: string;
  original_filename: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export interface MaterialFileInfoDTO {
  id: number;
  file_id: number;
  file: FileResponseDTO;
}

export interface MaterialFileResponseDTO {
  id: number;
  material_id: number;
  file: FileResponseDTO;
}

export interface AddEditorRequestDTO {
  user_id: number;
}

export interface EditorResponseDTO {
  id: number;
  user: UserResponseDTO;
  course_id: number;
  granted_at: string;
  granted_by?: number | null;
}

export interface EditorListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  editors: EditorResponseDTO[];
}


export interface CourseApplicationResponseDTO {
  id: number;
  course: CourseResponseDTO;
  user: UserResponseDTO;
  status: ApplicationStatus;
  applied_at: string;
  reviewed_at?: string | null;
  reviewer?: UserResponseDTO | null;
}

export interface CourseApplicationDetailResponseDTO {
  id: number;
  user: UserResponseDTO;
  course: CourseResponseDTO;
  status: ApplicationStatus;
  applied_at: string;
  reviewed_at?: string | null;
  reviewer?: UserResponseDTO | null;
}

export interface EnrolledStudentsListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  students: {
    user: UserResponseDTO;
    progress: CourseProgressResponseDTO | null;
  }[];
}
