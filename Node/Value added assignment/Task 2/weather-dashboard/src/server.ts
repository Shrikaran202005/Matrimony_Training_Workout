import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`Cold Alert Threshold: ${config.coldAlertThreshold}°C`);
});