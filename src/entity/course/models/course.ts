export interface Course {
  id: number;
  title: string;
  description?: string | null;
  img_url?: string | null;
  progress?: {
    id: number;
    course_id: number;
    user_id: number;
    completed_items: number;
    total_items: number;
    progress_percentage: number;
    last_accessed_at: string;
  } | null;
}

export interface CourseProps {
  course: Course;
}
