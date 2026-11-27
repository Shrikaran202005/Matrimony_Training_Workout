import fs from 'fs-extra';
import path from 'path';
import { config } from '../config/config';

/**
 * Create upload directories if they don't exist
 */
export async function ensureUploadDirectories(): Promise<void> {
  const dirs = Object.values(config.uploadPaths);
  for (const dir of dirs) {
    await fs.ensureDir(dir);
  }
}

/**
 * Check if file is an image
 */
export function isImage(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

/**
 * Get file extension
 */
export function getFileExtension(filename: string): string {
  return path.extname(filename).toLowerCase();
}

/**
 * Get original file name for display
 */
export function getDisplayFileName(filename: string): string {
  // Remove UUID prefix: "uuid-originalname" -> "originalname"
  const parts = filename.split('-');
  if (parts.length > 1) {
    return parts.slice(1).join('-');
  }
  return filename;
}