import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventModel } from '../../../../core/models/event.models';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css'
})
export class EventCard {
  @Input() event!: EventModel;
  @Output() eventClick = new EventEmitter<number>();

  onClick(): void {
    if (this.event) {
      this.eventClick.emit(this.event.id);
    }
  }
}