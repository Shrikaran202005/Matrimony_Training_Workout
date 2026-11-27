import { WeatherData, ForecastDay, Forecast, TemperatureComparison } from '../types';
import { WeatherApiService } from './weather-api.service';
import { formatWeatherDate, getNext7Days } from '../utils/date-formatter';
import {
  isColdAlert,
  calculateTemperatureDifference,
  findWarmerCity,
  getCitiesWithColdAlerts
} from '../utils/temperature-utils';
import { AppError } from '../middleware/error-handler';

export class WeatherService {
  private weatherApiService = new WeatherApiService();

  // FEATURE 1
  async getWeatherForMultipleCities(cities: string[]): Promise<WeatherData[]> {
    return Promise.all(
      cities.map(city => this.weatherApiService.getWeatherByCity(city))
    );
  }

  // FEATURE 2
  formatWeatherData(weather: WeatherData): WeatherData {
    return {
      ...weather,
      formattedDate: formatWeatherDate(weather.date)
    };
  }

  // FEATURE 
  async getForecast(city: string): Promise<Forecast> {
    const baseWeather = await this.weatherApiService.getWeatherByCity(city);
    const next7Days = getNext7Days();

    const days: ForecastDay[] = next7Days.map((date, index) => {
      const variation = index === 0 ? 0 : Math.floor(Math.random() * 11) - 5;
      const temp = baseWeather.temperature + variation;

      return {
        date,
        temperature: temp,
        condition: baseWeather.condition,
        coldAlert: isColdAlert(temp)
      };
    });

    return {
      city: baseWeather.city,
      days
    };
  }

  // FEATURE 4
  async compareTemperatures(cities: string[]): Promise<TemperatureComparison> {
    if (cities.length < 2) {
      throw new AppError(400, 'Please provide at least two cities separated by a comma');
    }

    const [weather1, weather2] = await Promise.all([
      this.weatherApiService.getWeatherByCity(cities[0]),
      this.weatherApiService.getWeatherByCity(cities[1])
    ]);

    return {
      city1: weather1.city,
      city2: weather2.city,
      temp1: weather1.temperature,
      temp2: weather2.temperature,
      warmerCity: findWarmerCity(
        weather1.city,
        weather1.temperature,
        weather2.city,
        weather2.temperature
      ),
      difference: calculateTemperatureDifference(weather1.temperature, weather2.temperature),
      coldAlerts: getCitiesWithColdAlerts([weather1, weather2])
    };
  }
}