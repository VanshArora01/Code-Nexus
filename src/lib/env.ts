import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary Cloud Name is required"),
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string().min(1, "Cloudinary Upload Preset is required"),
  // Add other required env vars here
});

export const env = envSchema.parse({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
});

/**
 * Validate environment variables.
 * Call this in layout.tsx or a central entry point.
 */
export function validateEnv() {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
      throw new Error("Invalid environment variables");
    }
  }
}
