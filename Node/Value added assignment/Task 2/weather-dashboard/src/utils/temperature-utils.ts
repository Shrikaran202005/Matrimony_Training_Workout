import { config } from '../config/config';
import { WeatherData } from '../types';

export function isColdAlert(temperature: number): boolean {
  return temperature < config.coldAlertThreshold;
}

export function calculateTemperatureDifference(temp1: number, temp2: number): number {
  return Math.abs(temp1 - temp2);
}

export function findWarmerCity(city1: string, temp1: number, city2: string, temp2: number): string {
  if (temp1 === temp2) return 'Equal';
  return temp1 > temp2 ? city1 : city2;
}

export function getCitiesWithColdAlerts(weatherList: WeatherData[]): string[] {
  return weatherList.filter(w => isColdAlert(w.temperature)).map(w => w.city);
}