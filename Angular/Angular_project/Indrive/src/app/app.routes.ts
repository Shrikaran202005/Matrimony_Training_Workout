import { Routes } from '@angular/router';
import { RideSelection } from './features/rides/components/ride-selection/ride-selection';
import { Home } from './features/home/pages/home/home';
import { NearbyDrivers } from './features/rides/components/nearby-drivers/nearby-drivers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


  {
    path: 'home',
    component: Home,
  },


  {
    path: 'rides',
    component: RideSelection,
  },


  {
    path: 'drivers',
    component: NearbyDrivers,
  },
];

