import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || 'image/jpeg,image/png,application/pdf').split(','),
  
  // Subdirectories for image versions
  uploadPaths: {
    originals: path.join(process.env.UPLOAD_DIR || './uploads', 'originals'),
    thumbnails: path.join(process.env.UPLOAD_DIR || './uploads', 'thumbnails'),
    medium: path.join(process.env.UPLOAD_DIR || './uploads', 'medium'),
    large: path.join(process.env.UPLOAD_DIR || './uploads', 'large')
  }
};