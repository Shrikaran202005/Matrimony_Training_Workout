import Joi from 'joi';
import { FileValidationRequest } from '../types';
import { config } from '../config/config';

/**
 * Joi schema for file validation
 * Validates: MIME type, file size
 */
export const fileValidationSchema = Joi.object<FileValidationRequest>({
  filename: Joi.string().required(),
  mimetype: Joi.string()
    .valid(...config.allowedMimeTypes)
    .required()
    .messages({
      'any.only': `Only these files allowed: ${config.allowedMimeTypes.join(', ')}`
    }),
  size: Joi.number()
    .max(config.maxFileSize)
    .required()
    .messages({
      'number.max': `File size must not exceed ${Math.round(config.maxFileSize / 1024 / 1024)}MB`
    })
});

/**
 * Validate file using Joi schema
 */
export function validateFile(file: Express.Multer.File): { error?: string } {
  const { error } = fileValidationSchema.validate({
    filename: file.filename || file.originalname,
    mimetype: file.mimetype,
    size: file.size
  });

  return error ? { error: error.message } : {};
}