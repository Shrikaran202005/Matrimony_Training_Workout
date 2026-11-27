import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import filesRouter from './routes/files.routes';
import { errorHandler } from './middleware/error-handler';
import { ensureUploadDirectories } from './utils/file-utils';

const app = express();

// Initialize upload directories
ensureUploadDirectories().catch(err => console.error('Failed to create upload directories:', err));

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serve uploaded files as static
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/files', filesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

export default app;