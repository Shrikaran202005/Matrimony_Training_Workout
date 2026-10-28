import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ride-history-details-page',
  imports: [],
  templateUrl: './ride-history-details-page.html',
  styleUrl: './ride-history-details-page.css',
})
export class RideHistoryDetailsPage {
  selectedRide: any;


  rideId = '';


  rides = [
    {
      id: '101',
      pickup: 'T Nagar',
      destination: 'OMR',
      fare: 240,
      driver: 'Arun',
      vehicle: 'Bike',
    },


    {
      id: '102',
      pickup: 'Velachery',
      destination: 'Airport',
      fare: 320,
      driver: 'Sathish',
      vehicle: 'Auto',
    },


    {
      id: '103',
      pickup: 'Anna Nagar',
      destination: 'Marina Beach',
      fare: 280,
      driver: 'Divya',
      vehicle: 'Cab',
    },
  ];


  constructor(private activatedRoute: ActivatedRoute) {}


  ngOnInit() {
    this.rideId = this.activatedRoute.snapshot.params['id'];


    this.selectedRide = this.rides.find((ride) => ride.id === this.rideId);
  }
}
