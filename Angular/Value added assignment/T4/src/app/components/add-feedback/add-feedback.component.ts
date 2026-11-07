import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <h2>Add Feedback</h2>
      <form [formGroup]="feedbackForm" (ngSubmit)="submit()">
        
        <div class="mb-3">
          <label>Course</label>
          <input class="form-control" formControlName="course">
          <!-- Added error message display -->
          <div *ngIf="feedbackForm.get('course')?.invalid && feedbackForm.get('course')?.touched" class="text-danger">
            Course is required.
          </div>
        </div>

        <div class="mb-3">
          <label>Rating (1-5)</label>
          <input type="number" class="form-control" formControlName="rating">
          <!-- Added error message display -->
          <div *ngIf="feedbackForm.get('rating')?.invalid && feedbackForm.get('rating')?.touched" class="text-danger">
            Valid rating between 1 and 5 is required.
          </div>
        </div>

        <div class="mb-3">
          <label>Comment</label>
          <textarea class="form-control" formControlName="comment"></textarea>
          <!-- Added error message display -->
          <div *ngIf="feedbackForm.get('comment')?.invalid && feedbackForm.get('comment')?.touched" class="text-danger">
            Comment is required.
          </div>
        </div>

        <!-- Added [disabled] attribute to prevent clicking if form is invalid -->
        <button type="submit" class="btn btn-primary" [disabled]="feedbackForm.invalid">Submit</button>
      </form>
    </div>
  `
})
export class AddFeedbackComponent {
  
  feedbackForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    // FIX BUG 9: Added Validators for required fields and rating constraints (1-5)
    this.feedbackForm = this.fb.group({
      course: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  submit(): void {
    // FIX BUG 10: Added validation check before submitting
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(this.feedbackForm.value);
      this.feedbackForm.reset();
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }
}