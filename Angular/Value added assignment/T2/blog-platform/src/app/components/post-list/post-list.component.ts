import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Post } from '../../models/blog.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string>('');
  
  // FIX for Bug 6 (Memory Leak): Manage subscriptions properly to prevent app slowdowns
  private destroy$ = new Subject<void>();

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadPosts(): void {
    this.loading.set(true);
    this.error.set('');
    
    this.blogService.getPosts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.posts.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Failed to load posts. Please refresh the page.');
          this.loading.set(false);
          console.error('Error loading posts:', err);
        }
      });
  }
}