import multer from 'multer';
import path from 'path';
import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';

/**
 * Multer storage configuration
 * Files saved to uploads/originals/ with unique names
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // All files go to originals folder initially
    cb(null, config.uploadPaths.originals);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: uuid-originalname
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${uniqueSuffix}-${baseName}${ext}`);
  }
});

/**
 * Multer instance with size limit
 */
export const upload = multer({
  storage,
  limits: {
    fileSize: config.maxFileSize
  }
});