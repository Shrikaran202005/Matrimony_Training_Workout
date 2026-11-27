import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mockApiUrl: process.env.MOCK_API_URL || 'https://mockapi.io/api/v1/cities',
  coldAlertThreshold: parseInt(process.env.COLD_ALERT_THRESHOLD || '5', 10)
};