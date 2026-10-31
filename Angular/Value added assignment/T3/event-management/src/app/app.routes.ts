import { Routes } from '@angular/router';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventRegisterComponent } from './components/event-register/event-register.component';

export const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'register/:eventId', component: EventRegisterComponent },
  { path: '**', redirectTo: '' }
];