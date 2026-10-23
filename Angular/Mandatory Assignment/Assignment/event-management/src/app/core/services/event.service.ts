import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EventModel } from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private mockEvents: EventModel[] = [
    {
      id: 1,
      title: 'Angular Workshop',
      date: '2026-11-10',
      category: 'tech',
      description: 'Learn modern Angular framework components, routing, and services.',
      location: 'Lab 3, Tech Park'
    },
    {
      id: 2,
      title: 'HR Networking Meetup',
      date: '2026-11-15',
      category: 'hr',
      description: 'Connect with industry HR professionals and learn interview tips.',
      location: 'Main Auditorium'
    },
    {
      id: 3,
      title: 'Annual Tech Quiz',
      date: '2026-11-20',
      category: 'fun',
      description: 'Exciting trivia contest covering general technology and pop culture.',
      location: 'Seminar Hall 1'
    },
    {
      id: 4,
      title: 'Leadership Training Session',
      date: '2026-11-25',
      category: 'training',
      description: 'Intensive workshop focused on team leadership and project management.',
      location: 'Conference Room B'
    }
  ];

  constructor() {}

  getEvents(): Observable<EventModel[]> {
    return of(this.mockEvents);
  }

  getEventById(id: number): Observable<EventModel | undefined> {
    const event = this.mockEvents.find(e => e.id === id);
    return of(event);
  }
}
