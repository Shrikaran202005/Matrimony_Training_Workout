import { Component } from '@angular/core';

@Component({
  selector: 'app-ride-analytics',
  imports: [],
  standalone: true,
  templateUrl: './ride-analytics.html',
  styleUrl: './ride-analytics.css',
})
export class RideAnalytics {
   ngOnInit() {
    console.log(' RideAnalytics chunk just loaded from network!');
  }
  //just a check for signals
  trackRender() {
    console.log('RideAnalytics Checked');


    return '';
  }

}
