import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { FileService } from '../services/file.service';

const router = Router();
const fileService = new FileService();

/**
 * POST /files/upload - Upload file
 * Accepts: JPEG, PNG, PDF
 * Max size: 5MB
 * For images: Creates 3 versions (thumbnail, medium, large)
 */
router.post('/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const result = await fileService.uploadFile(req.file);
    res.status(result.success ? 201 : 400).json(result);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /files - List all uploaded files
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = fileService.listFiles();
    res.json({ files });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /files/stats/overview - Get file statistics
 */
router.get('/stats/overview', (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = fileService.getStatistics();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /files/:id - Get file details by ID
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = fileService.getFile(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ file });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /files/:id - Delete file
 */
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const success = await fileService.deleteFile(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;