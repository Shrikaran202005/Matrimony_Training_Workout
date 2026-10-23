export interface EventModel {
  id: number;
  title: string;
  date: string;
  category: 'tech' | 'hr' | 'fun' | 'training';
  description: string;
  location: string;
}

export type Event = EventModel;