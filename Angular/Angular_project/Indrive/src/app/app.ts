import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/pages/home/home';
import { RideBooking } from './features/rides/components/ride-booking/ride-booking';
import { RideSelection } from './features/rides/components/ride-selection/ride-selection';
import { NearbyDrivers } from './features/rides/components/nearby-drivers/nearby-drivers';

@Component({
  selector: 'app-root',
  imports: [Home, RideBooking,RideSelection,NearbyDrivers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Indrive');
}
