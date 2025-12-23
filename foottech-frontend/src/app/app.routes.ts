import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './auth/login/login';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent}
];
