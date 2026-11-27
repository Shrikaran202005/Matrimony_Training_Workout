import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { config } from '../config/config';

export class ImageService {
  async processImage(inputPath: string, filename: string): Promise<{
    thumbnail: string;
    medium: string;
    large: string;
  }> {
    const buffer = await fs.readFile(inputPath);

    await Promise.all([
      sharp(buffer)
        .resize(100, 100, { fit: 'cover' })
        .jpeg({ quality: 80 })
        .toFile(path.join(config.uploadPaths.thumbnails, filename)),

      sharp(buffer)
        .resize(300, 300, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toFile(path.join(config.uploadPaths.medium, filename)),

      sharp(buffer)
        .resize(800, 800, { fit: 'inside' })
        .jpeg({ quality: 90 })
        .toFile(path.join(config.uploadPaths.large, filename))
    ]);

    return {
      thumbnail: path.join('thumbnails', filename),
      medium: path.join('medium', filename),
      large: path.join('large', filename)
    };
  }

  async getImageDimensions(filePath: string): Promise<{ width: number; height: number }> {
    const metadata = await sharp(filePath).metadata();
    return {
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  }
}