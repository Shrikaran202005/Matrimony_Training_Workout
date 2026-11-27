import axios from 'axios';
import { config } from '../config/config';
import { WeatherData } from '../types';

export class WeatherApiService {
  /**
   * Get weather for a city from your Mock API
   * Calls: GET {MOCK_API_URL}?search=London
   */
  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      // Call your Mock API with city name filter
      const response = await axios.get<WeatherData[]>(
        `${config.mockApiUrl}?search=${encodeURIComponent(city)}`
      );

      if (response.data.length === 0) {
        throw new Error(`City '${city}' not found in Mock API`);
      }

      return response.data[0];
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
      throw error;
    }
  }

  /**
   * Get all cities from Mock API
   * Calls: GET {MOCK_API_URL}
   */
  async getAllCities(): Promise<WeatherData[]> {
    try {
      const response = await axios.get<WeatherData[]>(config.mockApiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching all cities:', error);
      throw error;
    }
  }
}