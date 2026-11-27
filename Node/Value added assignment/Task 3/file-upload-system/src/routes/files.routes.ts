import { Router, Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { FileService } from '../services/file.service';

const router = Router();
const fileService = new FileService();

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

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = fileService.listFiles();
    res.json({ files });
  } catch (err) {
    next(err);
  }
});

router.get('/stats/overview', (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = fileService.getStatistics();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

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