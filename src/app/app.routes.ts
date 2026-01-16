import { Routes } from '@angular/router';
import { LoginComponent } from './view/login/login';
import { AccountComponent } from './view/account/account';
import { Register } from './view/register/register';
import { TransactionComponent } from './view/transaction/transaction';
import { DetailTransaction } from './view/transaction/detaisl-transaction/detaisl-transaction';
import { CreateAccountComponent } from './view/account/create-account';
import { Home } from './view/home/home';

import { AuthGuard } from '../services/middlewares/authGuard';
import { GuestGuard } from '../services/middlewares/guestGuard';

export const routes: Routes = [
  { path: '', component: Home },


  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },

  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
  { path: 'transaction/:id', component: DetailTransaction, canActivate: [AuthGuard] },
  { path: 'detailstransaction', component: DetailTransaction, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'create-account', component: CreateAccountComponent, canActivate: [AuthGuard] }
];
