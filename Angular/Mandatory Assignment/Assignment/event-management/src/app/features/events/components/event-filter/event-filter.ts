import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-filter.html',
  styleUrl: './event-filter.css'
})
export class EventFilter {
  search: string = '';
  category: string = '';

  @Output() filterChange = new EventEmitter<{ search: string; category: string }>();

  onModelChange(): void {
    this.filterChange.emit({ search: this.search, category: this.category });
  }

  onClearFilters(): void {
    this.search = '';
    this.category = '';
    this.filterChange.emit({ search: this.search, category: this.category });
  }
}