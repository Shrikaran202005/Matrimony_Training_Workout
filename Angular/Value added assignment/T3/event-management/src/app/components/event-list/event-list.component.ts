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
  
  // FIX for Bug 1: Start as true to prevent empty state flicker
  loading = true; 
  error: string = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.categories = this.eventService.getCategories();
    this.loadEvents();
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
    this.applyFilters();
  }

  // FIX for Bug 2: Process all search and filter logic locally so they combine perfectly
  applyFilters(): void {
    this.filteredEvents = this.events.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCat = this.selectedCategory ? e.category === this.selectedCategory : true;
      const matchesPrice = e.basePrice >= this.minPrice && e.basePrice <= this.maxPrice;
      
      return matchesSearch && matchesCat && matchesPrice;
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
    // FIXED syntax error: added the minus sign
    return event.totalSeats - event.bookedSeats;
  }
}