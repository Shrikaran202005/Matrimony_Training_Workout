import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { RideBooking } from './features/rides/components/ride-booking/ride-booking';

@Component({
  selector: 'app-root',
  imports: [Home, RideBooking],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Indrive');
}
