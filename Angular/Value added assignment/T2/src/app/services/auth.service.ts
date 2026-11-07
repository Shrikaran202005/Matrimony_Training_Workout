import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  
  private currentUserSignal = signal<{ id: number; name: string } | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.checkAuth();
  }

  private checkAuth(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSignal.set(JSON.parse(user));
    } 
  }

  login(userId: number, userName: string): void {
    const user = { id: userId, name: userName };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSignal.set(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
  }

  isAuthor(postAuthorId: number): boolean {
    // FIX for Bug 5: Ensure strict type checking and safely handle null states
    const user = this.currentUserSignal();
    if (!user) return false; 
    
    return Number(user.id) === Number(postAuthorId);
  }
}