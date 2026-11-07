import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  
  private feedbackList: Feedback[] = [
    { id: 1, course: 'Angular', rating: 5, comment: 'Great course!', date: '2024-01-15' },
    { id: 2, course: 'TypeScript', rating: 4, comment: 'Good but hard', date: '2024-01-14' },
    { id: 3, course: 'Angular', rating: 3, comment: 'Average content', date: '2024-01-13' },
    { id: 4, course: 'React', rating: 2, comment: 'Needs improvement', date: '2024-01-12' },
    { id: 5, course: 'TypeScript', rating: 5, comment: 'Excellent!', date: '2024-01-11' }
  ];

  private feedbackSubject = new BehaviorSubject<Feedback[]>(this.feedbackList);

  // FIX for BUG 1: Renamed from getFeedbacks() to getAll()
  getAll(): Observable<Feedback[]> {
    return this.feedbackSubject.asObservable();
  }

  // FIX for BUG 2: Changed <= to >= to show selected rating or higher
  filterByRating(rating: number): Observable<Feedback[]> {
    const filtered = this.feedbackList.filter(f => f.rating >= rating);
    return new BehaviorSubject(filtered).asObservable();
  }

  // FIX for BUG 3: Changed return type to Observable<Feedback[]> to match service architecture
  filterByCourse(course: string): Observable<Feedback[]> {
    const filtered = this.feedbackList.filter(f => f.course === course);
    return new BehaviorSubject(filtered).asObservable();
  }

  // FIX for BUG 4: Added validation to ensure rating is between 1 and 5
  addFeedback(feedback: any): void {
    if (feedback.rating < 1 || feedback.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
    const newFeedback: Feedback = {
      id: this.feedbackList.length + 1,
      course: feedback.course,
      rating: feedback.rating,
      comment: feedback.comment,
      date: new Date().toISOString().split('T')[0]
    };
    this.feedbackList.push(newFeedback);
    this.feedbackSubject.next(this.feedbackList);
  }

  // FIX for BUG 5: Calculates actual average rating from data instead of returning hardcoded 4.5
  getAverageRating(course: string): number {
    const relevantFeedback = course 
      ? this.feedbackList.filter(f => f.course === course)
      : this.feedbackList;
      
    if (relevantFeedback.length === 0) return 0;
    
    const sum = relevantFeedback.reduce((acc, curr) => acc + curr.rating, 0);
    return parseFloat((sum / relevantFeedback.length).toFixed(1));
  }
}