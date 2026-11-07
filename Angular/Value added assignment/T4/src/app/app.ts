import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FeedbackListComponent } from './components/feedback-list/feedback-list.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';

@Component({
  selector: 'app-root',
  imports: [AddFeedbackComponent, FeedbackListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-feedback');
}
