import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';
import path from 'path';
import { FileMetadata, UploadResponse } from '../types';
import { validateFile } from '../middleware/validation';
import { isImage, getDisplayFileName } from '../utils/file-utils';
import { ImageService } from './image.service';
import { config } from '../config/config';

export class FileService {
  private files: FileMetadata[] = [];
  private imageService = new ImageService();

  // TODO 1: Handle file upload with validation & image processing
  async uploadFile(file: Express.Multer.File): Promise<UploadResponse> {
    const { error } = validateFile(file);
    if (error) {
      await fs.remove(file.path);
      return {
        success: false,
        message: 'File validation failed',
        error
      };
    }

    const metadata: FileMetadata = {
      id: uuidv4(),
      originalName: getDisplayFileName(file.filename),
      mimeType: file.mimetype,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      versions: {
        original: path.join('originals', file.filename)
      }
    };

    if (isImage(file.mimetype)) {
      const processed = await this.imageService.processImage(file.path, file.filename);
      metadata.versions = {
        ...metadata.versions,
        ...processed
      };
    }

    this.files.push(metadata);

    return {
      success: true,
      file: metadata,
      message: 'File uploaded successfully'
    };
  }

  // TODO 2: List all uploaded files
  listFiles(): FileMetadata[] {
    return this.files;
  }

  // TODO 3: Get file by ID
  getFile(fileId: string): FileMetadata | null {
    return this.files.find(f => f.id === fileId) || null;
  }

  // TODO 4: Delete file from array and disk (all versions)
  async deleteFile(fileId: string): Promise<boolean> {
    const index = this.files.findIndex(f => f.id === fileId);
    if (index === -1) return false;

    const [removed] = this.files.splice(index, 1);

    if (removed.versions) {
      const paths = Object.values(removed.versions).filter(Boolean) as string[];
      await Promise.all(
        paths.map(relPath => fs.remove(path.join(config.uploadDir, relPath)))
      );
    }

    return true;
  }

  // TODO 5: Get statistics (totalFiles, totalSize in MB, imageCount)
  getStatistics(): { totalFiles: number; totalSize: number; imageCount: number } {
    const totalFiles = this.files.length;
    const totalBytes = this.files.reduce((sum, f) => sum + f.size, 0);
    const totalSize = Number((totalBytes / (1024 * 1024)).toFixed(2));
    const imageCount = this.files.filter(f => isImage(f.mimeType)).length;

    return {
      totalFiles,
      totalSize,
      imageCount
    };
  }
}