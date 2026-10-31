import { Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post/:postId', component: PostDetailComponent },
  { path: '**', redirectTo: '' }
];