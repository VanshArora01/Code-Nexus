import { env } from "@/lib/env";
import { CloudinaryUploadResponse } from "@/types/cloudinary";

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Validate file size (10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File size exceeds 10MB limit.");
  }

  // Validate extension
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const fileName = file.name.toLowerCase();
  const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));
  if (!isValid) {
    throw new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "code-nexus/resumes");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary upload failed.");
  }

  const data: CloudinaryUploadResponse = await response.json();
  return data.secure_url;
}
