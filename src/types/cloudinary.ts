export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  original_filename: string;
}

export type UploadStatus = "idle" | "uploading" | "success" | "failure";
