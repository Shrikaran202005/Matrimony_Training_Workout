import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventModel } from '../../../../core/models/event.models';
import { EventService } from '../../../../core/services/event.service';
import { EventCard } from '../event-card/event-card';
import { EventFilter } from '../event-filter/event-filter';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, EventCard, EventFilter],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css'
})
export class EventList implements OnInit {
  events: EventModel[] = [];
  filteredEvents: EventModel[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.filteredEvents = data;
    });
  }

  onFilterChange(filter: { search: string; category: string }): void {
    const searchTerm = filter.search.toLowerCase();
    const selectedCategory = filter.category;

    this.filteredEvents = this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm);
      const matchesCategory = selectedCategory === '' || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  onEventClick(id: number): void {
    this.router.navigate(['/event', id]);
  }
}