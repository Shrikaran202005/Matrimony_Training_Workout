import { format } from 'date-fns';

export function formatWeatherDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy \'at\' h:mm a');
}

export function getNext7Days(): string[] {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(format(date, 'yyyy-MM-dd'));
  }
  
  return dates;
}