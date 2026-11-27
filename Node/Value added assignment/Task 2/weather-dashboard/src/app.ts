import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import weatherRouter from './routes/weather.routes';
import { errorHandler } from './middleware/error-handler';
import { WeatherService } from './services/weather.service';

const app = express();
const weatherService = new WeatherService();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/weather', weatherRouter);

// Direct /forecast/:city route to match the assignment checklist
app.get('/forecast/:city', async (req, res, next) => {
  try {
    const forecast = await weatherService.getForecast(String(req.params.city));
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

export default app;