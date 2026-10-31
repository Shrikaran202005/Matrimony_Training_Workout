import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Post, Comment, AddCommentRequest } from '../models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private mockPosts: Post[] = [
    { id: 1, title: 'Getting Started with Angular', content: 'Angular is a powerful framework for building web applications...', author: 'John Doe', authorId: 1, date: '2024-01-15', category: 'Technology', commentCount: 5 },
    { id: 2, title: 'TypeScript Best Practices', content: 'TypeScript provides static typing and better IDE support...', author: 'Jane Smith', authorId: 2, date: '2024-01-14', category: 'Technology', commentCount: 3 },
    { id: 3, title: 'Web Design Trends 2024', content: 'Modern web design focuses on minimalism and accessibility...', author: 'Mike Johnson', authorId: 3, date: '2024-01-13', category: 'Design', commentCount: 7 },
    { id: 4, title: 'Traveling to Japan', content: 'Japan is a beautiful country with rich culture and history...', author: 'Sarah Wilson', authorId: 4, date: '2024-01-12', category: 'Travel', commentCount: 2 },
    { id: 5, title: 'Healthy Eating Habits', content: 'A balanced diet is essential for good health and wellness...', author: 'Tom Brown', authorId: 5, date: '2024-01-11', category: 'Lifestyle', commentCount: 4 }
  ];

 
  private mockComments: Map<number, Comment[]> = new Map([
    [1, [
      { id: 1, postId: 1, author: 'Alice', email: 'alice@example.com', content: 'Great tutorial! This helped me understand Angular better.', date: '2024-01-15' },
      { id: 2, postId: 1, author: 'Bob', email: 'bob@example.com', content: 'Thanks for sharing this knowledge with us.', date: '2024-01-15' },
      { id: 3, postId: 1, author: 'Charlie', email: 'charlie@example.com', content: 'Can you write more about advanced Angular topics?', date: '2024-01-14' },
      { id: 4, postId: 1, author: 'Diana', email: 'diana@example.com', content: 'Very informative post!', date: '2024-01-14' },
      { id: 5, postId: 1, author: 'Eve', email: 'eve@example.com', content: 'Looking forward to your next article.', date: '2024-01-13' }
    ]],
    [2, [
      { id: 6, postId: 2, author: 'Frank', email: 'frank@example.com', content: 'These practices are very helpful for our team.', date: '2024-01-14' },
      { id: 7, postId: 2, author: 'Grace', email: 'grace@example.com', content: 'Excellent points about code organization.', date: '2024-01-13' },
      { id: 8, postId: 2, author: 'Henry', email: 'henry@example.com', content: 'Do you have examples for more complex scenarios?', date: '2024-01-12' }
    ]],
    [3, [
      { id: 9, postId: 3, author: 'Ivy', email: 'ivy@example.com', content: 'I love the minimalist approach.', date: '2024-01-13' },
      { id: 10, postId: 3, author: 'Jack', email: 'jack@example.com', content: 'Accessibility should always be a priority.', date: '2024-01-12' },
      { id: 11, postId: 3, author: 'Kate', email: 'kate@example.com', content: 'Great design examples!', date: '2024-01-11' },
      { id: 12, postId: 3, author: 'Leo', email: 'leo@example.com', content: 'Any tools you recommend for responsive design?', date: '2024-01-10' },
      { id: 13, postId: 3, author: 'Mia', email: 'mia@example.com', content: 'This aligns with our design philosophy.', date: '2024-01-09' },
      { id: 14, postId: 3, author: 'Noah', email: 'noah@example.com', content: 'Beautiful and functional design.', date: '2024-01-08' },
      { id: 15, postId: 3, author: 'Olivia', email: 'olivia@example.com', content: 'Can you write about dark mode design?', date: '2024-01-07' }
    ]],
    [4, [
      { id: 16, postId: 4, author: 'Peter', email: 'peter@example.com', content: 'Japan is definitely on my bucket list now.', date: '2024-01-12' },
      { id: 17, postId: 4, author: 'Quinn', email: 'quinn@example.com', content: 'When did you go? Any tips for first-time travelers?', date: '2024-01-11' }
    ]],
    [5, [
      { id: 18, postId: 5, author: 'Rachel', email: 'rachel@example.com', content: 'Great advice! I started following these habits.', date: '2024-01-11' },
      { id: 19, postId: 5, author: 'Steven', email: 'steven@example.com', content: 'More tips on meal planning would be helpful.', date: '2024-01-10' },
      { id: 20, postId: 5, author: 'Tina', email: 'tina@example.com', content: 'This is exactly what I needed to hear.', date: '2024-01-09' },
      { id: 21, postId: 5, author: 'Uma', email: 'uma@example.com', content: 'Thanks for the motivation!', date: '2024-01-08' }
    ]]
  ]);

  getPosts(): Observable<Post[]> {
    return of(this.mockPosts).pipe(delay(500));
  }

  getPostById(id: number): Observable<Post | null> {
    const post = this.mockPosts.find(p => p.id === id);
    return of(post || null).pipe(delay(500));
  }

  getComments(postId: number): Observable<Comment[]> {
    const comments = this.mockComments.get(postId) || [];
    return of(comments).pipe(delay(300));
  }

  addComment(postId: number, request: AddCommentRequest): Observable<Comment> {
    const comments = this.mockComments.get(postId) || [];
    const newComment: Comment = {
      id: Math.max(...comments.map(c => c.id), 0) + 1,
      postId,
      author: request.author,
      email: request.email,
      content: request.content,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Create a new array reference to ensure Angular's change detection catches the update
    const updatedComments = [...comments, newComment];
    this.mockComments.set(postId, updatedComments);
    
    const post = this.mockPosts.find(p => p.id === postId);
    if (post) {
      post.commentCount++;
    }
    
    return of(newComment).pipe(delay(500));
  }

  deletePost(postId: number): Observable<boolean> {
    const index = this.mockPosts.findIndex(p => p.id === postId);
    if (index !== -1) {
      this.mockPosts.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return throwError(() => new Error('Post not found'));
  }
}