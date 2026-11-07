import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  
  feedbacks: Feedback[] = [];
  selectedRating: number = 0;
  selectedCourse: string = '';
  courses: string[] = ['Angular', 'React', 'TypeScript', 'Node.js'];

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    // FIX for BUG 6: Ensure this matches the renamed getAll() method in the service
    this.loadAllFeedback();
  }

  loadAllFeedback(): void {
    this.feedbackService.getAll().subscribe(data => {
      this.feedbacks = data;
    });
  }

  onFilterChange(): void {
    // FIX for BUG 7: Combined filtering logic so both course and rating apply together
    this.feedbackService.getAll().subscribe(data => {
      this.feedbacks = data.filter(f => {
        const matchesRating = this.selectedRating == 0 || f.rating >= this.selectedRating;
        const matchesCourse = this.selectedCourse === '' || f.course === this.selectedCourse;
        return matchesRating && matchesCourse;
      });
    });
  }

  // FIX for BUG 8: Added the missing method that the HTML template calls
  getAverageRating(course: string): number {
    return this.feedbackService.getAverageRating(course);
  }
}