import app from './app';
import { config } from './config/config';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`File upload API running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Max file size: ${Math.round(config.maxFileSize / 1024 / 1024)}MB`);
  console.log(`Upload directory: ${config.uploadDir}`);
});