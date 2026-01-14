
import { LoginComponent } from './login/login';
import { Routes, RouterModule } from '@angular/router';
import { App } from './app';
import { Home } from './home/home';
import { Register } from '../register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },

];
