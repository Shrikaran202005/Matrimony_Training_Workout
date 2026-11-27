import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import ordersRouter from './routes/orders.routes';
import { errorHandler } from './middleware/error-handler';

const app = express();

// Middleware
app.use(helmet());  // Security headers
app.use(cors());    // CORS handling
app.use(express.json());

// Routes
app.use('/orders', ordersRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Error handling
app.use(errorHandler);

export default app;