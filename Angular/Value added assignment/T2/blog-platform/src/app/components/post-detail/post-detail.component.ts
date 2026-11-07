import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { Post, Comment } from '../../models/blog.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  
  post = signal<Post | null>(null);
  // FIX for Bug 4: Convert comments to a signal so the computed commentCount updates reactively
  comments = signal<Comment[]>([]);
  commentForm!: FormGroup;
  
  loadingPost = signal(false);
  loadingComments = signal(false);
  commentsLoaded = signal(false);
  error = signal('');
  
  // Now correctly tracks the length of the signal
  commentCount = computed(() => this.comments().length);
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // FIX for Bug 1 & 2: Parse the URL parameter to a Number so strict ID matching works
    const postId = Number(this.route.snapshot.params['postId']);
    
    if (postId) {
      this.loadPost(postId);
      this.loadComments(postId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPost(postId: number): void {
    this.loadingPost.set(true);
    this.error.set('');
    
    this.blogService.getPostById(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (post) => {
          this.post.set(post);
          this.loadingPost.set(false);
          if (!post) {
            this.error.set('Post not found');
          }
        },
        error: (err) => {
          this.error.set('Failed to load post. Please try again.');
          this.loadingPost.set(false);
          console.error('Error loading post:', err);
        }
      });
  }

  private loadComments(postId: number): void {
    this.loadingComments.set(true);
    
    this.blogService.getComments(postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (fetchedComments) => {
          this.comments.set(fetchedComments);
          this.loadingComments.set(false);
          this.commentsLoaded.set(true);
        },
        error: (err) => {
          this.error.set('Failed to load comments.');
          this.loadingComments.set(false);
          console.error('Error loading comments:', err);
        }
      });
  }

  private createForm(): void {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitComment(): void {
    if (this.commentForm.invalid) {
      Object.keys(this.commentForm.controls).forEach(key => {
        this.commentForm.get(key)?.markAsTouched();
      });
      return;
    }

    const currentPost = this.post();
    if (!currentPost) return;

    this.blogService.addComment(currentPost.id, this.commentForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (comment) => {
          this.comments.update(curr => [...curr, comment]);
          this.post.update(p => p ? { ...p, commentCount: p.commentCount + 1 } : null);
          this.commentForm.reset();
        },
        error: (err) => {
          this.error.set('Failed to add comment. Please try again.');
          console.error('Error adding comment:', err);
        }
      });
  }

  canEdit(): boolean {
    // FIX for Bug 5: Now relies on strictly typed auth checks from auth.service.ts
    const currentPost = this.post();
    return currentPost ? this.authService.isAuthor(currentPost.authorId) : false;
  }

  deletePost(): void {
    const currentPost = this.post();
    if (!currentPost || !confirm('Delete this post?')) return;

    this.blogService.deletePost(currentPost.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error.set('Failed to delete post. You may not have permission.');
          console.error('Error deleting post:', err);
        }
      });
  }

  editPost(): void {
    alert('Edit functionality is just a mock for this assignment!');
  }
  getFieldError(fieldName: string): string {
    const field = this.commentForm.get(fieldName);
    if (field?.hasError('required')) return `${fieldName} is required`;
    if (field?.hasError('minlength')) return `${fieldName} must be at least ${field.getError('minlength')?.requiredLength} characters`;
    if (field?.hasError('email')) return 'Invalid email address';
    return '';
  }
}
