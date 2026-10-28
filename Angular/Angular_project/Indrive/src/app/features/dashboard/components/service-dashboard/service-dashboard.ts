import { Component } from '@angular/core';
import { SurgeHighlight } from '../../../shared/directives/surge-highlight';
import { RideAnalytics } from '../ride-analytics/ride-analytics';
@Component({
  selector: 'app-service-dashboard',
  imports: [SurgeHighlight, RideAnalytics],
  templateUrl: './service-dashboard.html',
  styleUrl: './service-dashboard.css',
})
export class ServiceDashboard {
   showAnalytics = false; //use only for template-level lazy loading

   services = [
    {
      title: 'Bike Ride',
      rides: 1200,
      earnings: 45000,
    },


    {
      title: 'Cab Ride',
      rides: 850,
      earnings: 92000,
    },


    {
      title: 'Rental Service',
      rides: 430,
      earnings: 67000,
    },
  ];

}
