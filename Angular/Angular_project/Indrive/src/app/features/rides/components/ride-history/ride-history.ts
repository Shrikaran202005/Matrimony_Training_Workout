import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RideBasedService } from '../../services/ride-based-service';

@Component({
  selector: 'app-ride-history',
  imports: [RouterLink],
  templateUrl: './ride-history.html',
  styleUrl: './ride-history.css',
})
export class RideHistory {
  rides:any=[];
    constructor(private objService:RideBasedService){


    }
    ngOnInit(){
      this.rides =this.objService.getAllRides()
    }

}
