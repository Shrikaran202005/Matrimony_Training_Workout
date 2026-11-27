import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size must not exceed 5MB' });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error' });
};