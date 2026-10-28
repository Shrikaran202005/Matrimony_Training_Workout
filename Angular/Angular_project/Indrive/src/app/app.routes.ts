import { Routes } from '@angular/router';
import { RideSelection } from './features/rides/components/ride-selection/ride-selection';
import { Home } from './features/home/pages/home/home';
// import { NearbyDrivers } from './features/rides/components/nearby-drivers/nearby-drivers';
// import { ServiceDashboard } from './features/dashboard/components/service-dashboard/service-dashboard';

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
    loadComponent: () => import('./features/rides/components/nearby-drivers/nearby-drivers').then(m => m.NearbyDrivers),
  },

  {
    path:'service-dashboard',
    loadComponent: () => import('./features/dashboard/components/service-dashboard/service-dashboard').then(m => m.ServiceDashboard)
  }
];

