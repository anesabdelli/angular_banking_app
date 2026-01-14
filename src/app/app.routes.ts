

import { Routes, RouterModule } from '@angular/router';
import { App } from './app';
import { Home } from './view/home/home';
import { Register } from '../register/register';
import { LoginComponent } from './view/login/login';
import { Transaction } from './view/transaction/transaction';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'transaction', component: Transaction },
  { path: 'register', component: Register },

];
