export interface FileMetadata {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  versions?: {
    original?: string;
    thumbnail?: string;
    medium?: string;
    large?: string;
  };
}

export interface UploadResponse {
  success: boolean;
  file?: FileMetadata;
  message: string;
  error?: string;
}

export interface FileValidationRequest {
  filename: string;
  mimetype: string;
  size: number;
}