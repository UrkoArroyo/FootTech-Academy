import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { adminGuard } from './core/guards/admin.guard';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/register/register').then((m) => m.RegisterComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
      },
      {
        path: 'admin/register',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/register/register').then((m) => m.RegisterComponent),
      },
      {
        path: 'admin/users',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
      },
      {
        path: 'admin/users/:id/edit',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/user-detail').then((m) => m.UserDetailComponent),
      },
      {
        path: 'admin/users/:id',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/user-detail').then((m) => m.UserDetailComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.ProfileComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
