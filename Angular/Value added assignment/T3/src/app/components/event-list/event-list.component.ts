import { Component, OnInit, signal } from '@angular/core';
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
  filteredEvents = signal<Event[]>([]);
  categories: string[] = [];
  
  searchQuery: string = '';
  selectedCategory: string = '';
  minPrice: number = 0;
  maxPrice: number = 200;
  
  loading = signal(true); 
  error = signal('');

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.categories = this.eventService.getCategories();
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading.set(true);
    this.error.set('');
    
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.applyFilters();
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load events');
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const filtered = this.events.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCat = this.selectedCategory ? e.category === this.selectedCategory : true;
      const matchesPrice = e.basePrice >= this.minPrice && e.basePrice <= this.maxPrice;
      
      return matchesSearch && matchesCat && matchesPrice;
    });
    this.filteredEvents.set(filtered);
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
