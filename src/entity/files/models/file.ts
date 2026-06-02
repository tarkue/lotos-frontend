export interface FileData {
  id: number;
  filename: string;
  original_filename: string;
  file_url: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
}

export interface File {
  id: number;
  file_id: number;
  file: FileData;
}
