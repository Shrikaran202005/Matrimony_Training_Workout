import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page404 } from '../../../shared/components/page-404/page-404';
import { RideBasedService } from '../../services/ride-based-service';

@Component({
  selector: 'app-ride-history-details-page',
  imports: [Page404],
  templateUrl: './ride-history-details-page.html',
  styleUrl: './ride-history-details-page.css',
})
export class RideHistoryDetailsPage {
  selectedRide: any;


  rideId = '';

  constructor(private activatedRoute: ActivatedRoute ,private objService:RideBasedService) {}


  ngOnInit() {
    this.rideId = this.activatedRoute.snapshot.params['id'];


    this.selectedRide = this.objService.getRideById(this.rideId);
  }
}
