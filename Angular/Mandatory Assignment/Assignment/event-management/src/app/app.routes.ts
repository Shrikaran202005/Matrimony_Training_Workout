import { Routes } from '@angular/router';
import { EventList } from './features/events/components/event-list/event-list';
import { EventDetail } from './features/events/components/event-detail/event-detail';

export const routes: Routes = [
  { path: '', component: EventList },
  { path: 'event/:id', component: EventDetail }
];
