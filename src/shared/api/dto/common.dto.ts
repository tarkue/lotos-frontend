export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

export interface CommentResponseDTO {
  id: number;
  content: string;
  is_anonymous: boolean;
  author_name: string;
  created_at: string;
  likes_count: number;
  dislikes_count: number;
  my_reaction?: "like" | "dislike" | null;
}

export interface CreateCommentRequestDTO {
  content: string;
  is_anonymous?: boolean;
}

export interface CommentReactionRequestDTO {
  is_like: boolean;
}

export interface CommentReactionSummaryResponseDTO {
  comment_id: number;
  likes_count: number;
  dislikes_count: number;
  my_reaction?: "like" | "dislike" | null;
}

export interface PaginatedCommentsResponseDTO {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  comments: CommentResponseDTO[];
}
