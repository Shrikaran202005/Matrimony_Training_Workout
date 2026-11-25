import { ChangeDetectorRef, Component } from '@angular/core';
import { DriverApi } from '../../services/driver-api';

@Component({
  selector: 'app-driver-api-demo',
  imports: [],
  templateUrl: './driver-api-demo.html',
  styleUrl: './driver-api-demo.css',
})
export class DriverApiDemo {
   drivers: any[] = [];


  isDataLoaded = false;


  errorMessage = '';


  constructor(
    private driverApiService: DriverApi, //DI of service
    private cdr: ChangeDetectorRef,
  ) {}


  ngOnInit() {
    this.loadDrivers();
  }


  loadDrivers() {
   // this.isDataLoaded = false;


    this.errorMessage = '';


    this.driverApiService.getDrivers().subscribe({
      next: (response: any) => {
        // console.log('inside driver api');


        this.drivers = response;
        this.isDataLoaded = true;
        this.cdr.detectChanges(); //detect the new changes and reload the ui
        console.log(this.drivers);
        console.log(this.isDataLoaded);
      },


      error: () => {
        this.errorMessage = 'Failed to load driver data';


        this.isDataLoaded = false;
        this.cdr.detectChanges();
      },
    });
  }

}
