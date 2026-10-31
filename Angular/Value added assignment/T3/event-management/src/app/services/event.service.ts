import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Event, Coupon } from '../models/event.model';

@Injectable({ providedIn: 'root' })
export class EventService {

  private mockEvents: Event[] = [
    { id: 1, name: 'JavaScript Conference 2024', description: 'Advanced JS techniques', date: '2024-03-15', time: '09:00 AM', category: 'Conference', location: 'New York', basePrice: 99, totalSeats: 100, bookedSeats: 45, image: 'js-conf.jpg' },
    { id: 2, name: 'Angular Advanced Workshop', description: 'Deep dive into Angular', date: '2024-03-20', time: '10:00 AM', category: 'Workshop', location: 'San Francisco', basePrice: 149, totalSeats: 50, bookedSeats: 30, image: 'angular-workshop.jpg' },
    { id: 3, name: 'Web Development Meetup', description: 'Meet local developers', date: '2024-03-22', time: '06:00 PM', category: 'Meetup', location: 'Los Angeles', basePrice: 29, totalSeats: 150, bookedSeats: 80, image: 'meetup.jpg' },
    { id: 4, name: 'React & TypeScript Summit', description: 'Modern web development', date: '2024-04-01', time: '08:30 AM', category: 'Conference', location: 'Chicago', basePrice: 129, totalSeats: 100, bookedSeats: 65, image: 'react-summit.jpg' },
    { id: 5, name: 'Accessibility & UI Design Workshop', description: 'Building accessible apps', date: '2024-04-05', time: '09:00 AM', category: 'Workshop', location: 'Boston', basePrice: 99, totalSeats: 40, bookedSeats: 20, image: 'a11y-workshop.jpg' },
    { id: 6, name: 'Frontend Developers Meetup', description: 'Network with frontend devs', date: '2024-04-10', time: '05:30 PM', category: 'Meetup', location: 'Seattle', basePrice: 0, totalSeats: 200, bookedSeats: 90, image: 'frontend-meetup.jpg' },
    { id: 7, name: 'Node.js Mastery Course', description: 'Backend with Node.js', date: '2024-04-15', time: '10:00 AM', category: 'Workshop', location: 'Austin', basePrice: 179, totalSeats: 30, bookedSeats: 15, image: 'nodejs-course.jpg' },
    { id: 8, name: 'Web Performance Conference', description: 'Optimize your web apps', date: '2024-04-20', time: '09:00 AM', category: 'Conference', location: 'Denver', basePrice: 119, totalSeats: 100, bookedSeats: 50, image: 'performance-conf.jpg' }
  ];

  private coupons: Coupon[] = [
    { code: 'SAVE10', discountPercent: 10 },
    { code: 'SAVE20', discountPercent: 20 },
    { code: 'STUDENT', discountPercent: 15 }
  ];

  private registrations: any[] = [];

  getEvents(): Observable<Event[]> {
    return of(this.mockEvents).pipe(delay(500));
  }

  getEventById(id: number): Observable<Event | null> {
    const event = this.mockEvents.find(e => e.id === id);
    return of(event || null).pipe(delay(300));
  }

  searchEvents(query: string): Observable<Event[]> {
    const filtered = this.mockEvents.filter(e =>
      e.name.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }

  filterEvents(category?: string, minPrice?: number, maxPrice?: number): Observable<Event[]> {
    let filtered = this.mockEvents;
    if (category) {
      filtered = filtered.filter(e => e.category === category);
    }
    if (minPrice !== undefined) {
      filtered = filtered.filter(e => e.basePrice >= minPrice);
    }
    if (maxPrice !== undefined) {
      filtered = filtered.filter(e => e.basePrice <= maxPrice);
    }
    return of(filtered).pipe(delay(300));
  }

  getAvailableSeats(eventId: number): number {
    const event = this.mockEvents.find(e => e.id === eventId);
    return event ? event.totalSeats - event.bookedSeats : 0;
  }

  validateCoupon(code: string): Observable<{ valid: boolean; discountPercent: number }> {
    const coupon = this.coupons.find(c => c.code === code);
    return of({ valid: !!coupon, discountPercent: coupon?.discountPercent || 0 }).pipe(delay(200));
  }

  registerEvent(registration: any): Observable<any> {
    const event = this.mockEvents.find(e => e.id === registration.eventId);
    if (event && event.bookedSeats + registration.attendees.length <= event.totalSeats) {
      event.bookedSeats += registration.attendees.length;
      this.registrations.push(registration);
      return of({ success: true, id: Date.now() }).pipe(delay(500));
    }
    return throwError(() => new Error('Cannot register. Insufficient seats available.'));
  }

  getRegistrations(): Observable<any[]> {
    return of(this.registrations).pipe(delay(300));
  }

  getCategories(): string[] {
    return [...new Set(this.mockEvents.map(e => e.category))];
  }
}
