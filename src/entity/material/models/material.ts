import { File } from "../../files/models/file";
import { Test } from "../../test/models/test";

export interface Material {
  id: number;
  material_id?: number;
  module?: { id: number; title: string; position: number; course_id: number };
  type: string;
  title?: string;
  content_url?: string | null;
  text_content?: string | null;
  transcript?: string | null;
  position: number;
  files?: File[];
  has_tests?: boolean;
  is_locked?: boolean;
  tests?: Test[];
  is_completed?: boolean;
  completed_at?: null | string;
}

export interface MaterialProps {
  material: Material;
}
