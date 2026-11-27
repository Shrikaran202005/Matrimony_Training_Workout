import { Router, Request, Response, NextFunction } from 'express';
import { WeatherService } from '../services/weather.service';
import { citiesQuerySchema, cityParamSchema } from '../middleware/validation';

const router = Router();
const weatherService = new WeatherService();

// GET /weather?cities=London,Paris - Feature 1 (Multiple cities)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = citiesQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const cities = (value.cities as string).split(',').map(c => c.trim());
    const weather = await weatherService.getWeatherForMultipleCities(cities);
    
    // Feature 2: Format dates
    const formattedWeather = weather.map(w => weatherService.formatWeatherData(w));
    
    res.json(formattedWeather);
  } catch (err) {
    next(err);
  }
});

// GET /forecast/:city - Feature 3 (7-day forecast)
router.get('/forecast/:city', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const forecast = await weatherService.getForecast(req.params.city);
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});

// GET /weather/compare?cities=London,Paris - Feature 4 (Compare + alerts)
router.get('/compare', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = citiesQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const cities = (value.cities as string).split(',').map(c => c.trim());
    const comparison = await weatherService.compareTemperatures(cities);
    res.json(comparison);
  } catch (err) {
    next(err);
  }
});

export default router;