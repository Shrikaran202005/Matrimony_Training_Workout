export interface WeatherData {
  id?: number;
  city: string;
  temperature: number;
  humidity: number;
  condition: string;
  date: string;
  formattedDate?: string;
}

export interface ForecastDay {
  date: string;
  temperature: number;
  condition: string;
  coldAlert: boolean;
}

export interface Forecast {
  city: string;
  days: ForecastDay[];
}

export interface TemperatureComparison {
  city1: string;
  city2: string;
  temp1: number;
  temp2: number;
  warmerCity: string;
  difference: number;
  coldAlerts: string[];
}