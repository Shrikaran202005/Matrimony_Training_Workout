import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  
  events: Event[] = [];
  filteredEvents: Event[] = [];
  categories: string[] = [];
  
  searchQuery: string = '';
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 200;
  loading = false;
  error: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
    this.categories = this.eventService.getCategories();
  }

  loadEvents(): void {
    this.loading = true;
    this.error = '';
    
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.eventService.searchEvents(this.searchQuery).subscribe({
        next: (data) => {
          this.filteredEvents = data;
        },
        error: () => {
          this.error = 'Search failed';
        }
      });
    } else {
      this.applyFilters();
    }
  }

  applyFilters(): void {
    this.eventService.filterEvents(this.selectedCategory || undefined, this.minPrice, this.maxPrice).subscribe({
      next: (data) => {
        this.filteredEvents = data;
      },
      error: () => {
        this.error = 'Filter failed';
      }
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.minPrice = 0;
    this.maxPrice = 200;
    this.applyFilters();
  }

  getAvailableSeats(event: Event): number {
    return event.totalSeats - event.bookedSeats;
  }
}