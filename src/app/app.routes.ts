import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { HomePageComponent } from './visitors/home/home.page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Portfolio de Djoudj' },
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./admin/dashboard/dashboard.page.component').then((m) => m.DashboardPageComponent),
    canActivate: [authGuard]
  }
];
