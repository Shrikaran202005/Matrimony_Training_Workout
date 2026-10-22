import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { RideBooking } from './features/rides/components/ride-booking/ride-booking';
import { RideSelection } from './features/rides/components/ride-selection/ride-selection';

@Component({
  selector: 'app-root',
  imports: [Home, RideBooking,RideSelection],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Indrive');
}
